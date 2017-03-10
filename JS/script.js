 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCZE9ccOI1GhVNwvNgBc6oV2URds46VjzY",
    authDomain: "trains-50f85.firebaseapp.com",
    databaseURL: "https://trains-50f85.firebaseio.com",
    storageBucket: "trains-50f85.appspot.com",
    messagingSenderId: "51075880839"
  };

firebase.initializeApp(config);

function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    $(".clock").html(h + ":" + m + ":" + s);

    var t = setTimeout(startTime, 500);
}

function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}


startTime();

 var database = firebase.database();

 var diffTime = "";

 database.ref().on("child_added", function(snapshot) {


     $(".table tbody").append("<tr>");

     $(".table tbody").append( "X" + "<td>" + snapshot.val().Train + "</td>");

     $(".table tbody").append("<td>" + snapshot.val().Destination + "</td>");

     $(".table tbody").append("<td>" + snapshot.val().Frequency + "</td>");

     $(".table tbody").append("<td>" + snapshot.val().Display + "</td>");

     $(".table tbody").append("<td>" + snapshot.val().Minutes + "</td>");

     $(".table tbody").append("</tr>");


 });
    

$(".button").on("click", function(event) {

     event.preventDefault();

     var name = $(".name").val().trim();

     var destination = $(".destination").val().trim();

     var firstTrainTime = $(".first").val().trim();

     var frequencyVariable = $(".frequency").val().trim();

     frequencyVariable = parseInt(frequencyVariable)

     var splitted = firstTrainTime.split("")

     var hours = parseInt(splitted[0] + splitted[1]) * 60;

     var minutes = parseInt(splitted[3] + splitted[4]);

     var totalTimeElapsed = hours + minutes

     $(".name").val("");

     $(".destination").val("");

     $(".first").val("");

     $(".frequency").val("");

     diffTime = moment().diff(moment(totalTimeElapsed), "minutes");

     tRemainder = diffTime % frequencyVariable;

     nextTrainTime = frequencyVariable - tRemainder;

     console.log(diffTime);

     console.log(totalTimeElapsed);

     console.log(tRemainder);

     console.log(nextTrainTime);

     var preDisplayedTime = moment().add(nextTrainTime, "minutes");

     console.log(preDisplayedTime);

     var displayedTime = moment(preDisplayedTime).format("hh:mm a");

     console.log(displayedTime);


     database.ref().push({

         Train: name,

         Destination: destination,

         Frequency: frequencyVariable,

         Display: displayedTime,

         Minutes: nextTrainTime,

     });


 });
