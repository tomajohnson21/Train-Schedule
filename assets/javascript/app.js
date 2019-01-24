

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

    var remainder = moment().diff(moment.unix(snap.firstTrain), "minutes") % snap.freq;
    var minRemaining = trainFrequency - remainder;

    var nextTrain = moment().add(minRemaining, "m").format("hh:mm A");

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