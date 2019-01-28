
var config = {
  apiKey: "AIzaSyCqSVZnqCQiokv-IIsxpqswagNgUHTrn_s",
  authDomain: "train-schedule-5cd4a.firebaseapp.com",
  databaseURL: "https://train-schedule-5cd4a.firebaseio.com",
  projectId: "train-schedule-5cd4a",
  storageBucket: "train-schedule-5cd4a.appspot.com",
  messagingSenderId: "746152774297"
};
firebase.initializeApp(config);

var database = firebase.database();

$("#add-train-btn").on("click", function(event) {
    event.preventDefault();

    var name = $("#name-input").val().trim();
    var destination = $("#dest-input").val().trim();
    var firstTrain = $("#time-input").val().trim();
    var freq = $("#freq-input").val().trim();

    database.ref().push({
      name: name,
      destination: destination,
      firstTrain: firstTrain,
      freq: freq,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
    });

});

database.ref().on("child_added", function(snapshot) {
    
    var snap = snapshot.val();
    console.log(snap.name);
    console.log(snap.destination);
    console.log(snap.firstTrain);
    console.log(snap.freq);

    var firstTrainConverted = moment(snap.firstTrain, "HH:mm").subtract(1, "years");
    console.log(firstTrainConverted);

    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

    var difference = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + difference);

    var remainder = difference % snap.freq;
    console.log(remainder);

    var minRemaining = snap.freq - remainder;
    console.log("MINUTES TILL TRAIN: " + minRemaing);

    var nextTrain = moment().add(minRemaining, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));

    var newRow = $("<tr>");
    var newName = $("<td>" + snap.name + "</td>");
    newRow.append(newName);
    var newDest = $("<td>" + snap.destination + "</td>");
    newRow.append(newDest);
    var newFreq = $("<td>" + snap.freq + "</td>");
    newRow.append(newFreq);
    var newNextTrain = $("<td>" + nextTrain + "</td>");
    newRow.append(newNextTrain);
    var newMinRemaining =$("<td>" + minRemaining + "</td>");
    newRow.append(newMinRemaining);
    $("#train-table").append(newRow);

  
  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });