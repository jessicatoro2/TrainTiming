$( document ).ready(function(){

 // Initialize Firebase
    var config = {
      apiKey: "AIzaSyA0LwR8ct6VoCWI0gfVcQ2rYzzAU1jVG8I",
      authDomain: "train-schedule-78baa.firebaseapp.com",
      databaseURL: "https://train-schedule-78baa.firebaseio.com",
      projectId: "train-schedule-78baa",
      storageBucket: "train-schedule-78baa.appspot.com",
      messagingSenderId: "586260867183"
    };
    firebase.initializeApp(config);
  
   
    var database = firebase.database();
    var data = {};



// This .on("click") function will trigger the AJAX Call
      $(".search").on("click", function(event) {
        var train = $('#trainname-input').val();
        var place = $('#destination-input').val();
        var time = $('#trainTime-input').val();
        var frequency= $('#numberOfMinsNext-input').val();

        database.ref().push({
          train : train,
          place : place,
          time : time,
          frequency: frequency
        }); 

      $("#nameText").text(train);
      $("#placeText").text(place);
      console.log("what is this", place);
      $("#frequencyText").text(frequency);

     });

    database.ref().on("child_added", function(snapshot){

          // // Log everything that's coming out of snapshot
          // // console.log(snapshot.val());
          // // console.log(snapshot.val().train);
          // // console.log(snapshot.val().place);
          // // console.log(snapshot.val().time);
          // console.log("this is the time entered", trainEntersAt);
          // console.log(snapshot.val().frequency);

  
          
          var timefromDB = snapshot.val().time;
          var trainEntersAt = moment(timefromDB, 'HH:mm').add(-1, "days");
          console.log("train enters at: ", trainEntersAt.format());
          var newTrainIn = snapshot.val().frequency;
          // console.log(moment(timefromDB, 'HH:mm').format('hh:mm a'));

       
          var timeNow = moment();
          console.log("The time now is: ", timeNow.format());


          var timeLapse = moment(timeNow).diff(trainEntersAt, "minutes");
          console.log("Time since last train: ", timeLapse, "mins");

          var minutesSinceOldTrain = timeLapse % newTrainIn;
          console.log("Last Train was ", minutesSinceOldTrain, "mins ago");

          var minutesTillNewTrain = newTrainIn - minutesSinceOldTrain;
          console.log("Next train is in ", minutesTillNewTrain, "mins");

          var nextTrain = timeNow.add(minutesTillNewTrain, "HH:mm");
          console.log("next train comes at:", nextTrain.format());

          $("#nextText").text(nextTrain.format("HH:mm"));
          $("#minuesaway").text(minutesTillNewTrain);

          // $("#myTable > tbody").append("<tr><td>" + train + "</td><td>" + place + "</td><td>" +
          // frequency + "</td><td>" + nextTrain + "</td><td>" + minutesTillNewTrain + "</td></tr>");
    });

   
 });     