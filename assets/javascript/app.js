$(document).ready(function(){

    //*********** DEFINING VARIABLES AND FUNCTIONS ********************** */

    // prevents the clock from being sped up unnecessarily
    var clockRunning = false;

    //  Variable that will hold our setInterval that runs the stopwatch
    var intervalId;

    //For each quiz assign time as 60 seconds
    var $timeRemaining = 30;
    $("#timeRemaining").text($timeRemaining);


    var questionsObj = [
        {
            image: "assets/images/TajMahal.jpg",
            options: ["Pyramid of Giza" , "Christ the Redeemer" , "Taj Mahal"],
            correctAns: "3"
        }, { 
            image: "assets/images/GreatWallOfChina.jpg",
            options: [ "Petra of Peru" , "Great Wall of China" , "Colosseum" ],
            correctAns: "2"
        }, {
            image: "assets/images/PetraOfPeru.jpg",
            options: ["Pyramid of Giza" , "Colosseum" , "Petra of Peru"],
            correctAns: "3"
        }, {
            image: "assets/images/ChichenItza.jpg",
            options: ["Colosseum" , "Chichen Itza" , "Taj Mahal"],
            correctAns: "2"
        }, {
            image: "assets/images/ChristTheRedeemer.jpg",
            options: ["Petra of Peru" , "Christ the Redeemer" , "Colosseum"],
            correctAns: "2"
        }, {
            image: "assets/images/Colosseum.jpg",
            options: ["Colosseum" , "Chichen Itza" , "Taj Mahal"],
            correctAns: "1"
        }, {
            image: "assets/images/PyramidOfGiza.jpg",
            options: ["Petra of Peru" , "Colosseum" , "Pyramid of Giza"],
            correctAns: "3"
    }];

    function generateQuestions() {

        for(var i=0 ; i<questionsObj.length ; i++) {

            var $ques = $("<div class='m-5'>");

            //Adding question
            $ques.append("<h5>Q" + (i+1) + ". Can you name this wonder?</h5>");

            //Adding question - image
            $ques.append("<img src="+ questionsObj[i].image +" width=250 >");

            //Adding all the answer options
            for(var j=0 ; j<questionsObj[i].options.length ; j++) {

                $ques.append("<input type='radio' class='ml-5 pl-3' name='myRadio"+i+"' value="+(j+1)+" >");
                $ques.append("<label class='pl-3' class='mylabel"+i+"'> "+questionsObj[i].options[j]+"</label>");

            }


            //Appending all elements of the question to the respective div
            $("#question").append($ques);

            $("#question").css('border-bottom', 'solid 3px grey');

        }

        //Create "Submit" button
        $("#submit").append("<button type='button' class='btn btn-info btn-lg'><h3>Submit</h3></button>");

    }//End of generateQuestions()



    //*********** DEFINING ONCLICK FUNCTIONS ********************** */

    $("#start").on("click", start);
    $("#submit").on("click", onSubmit);
    $("#strtNewQuiz").on("click", startNewQuiz);


    function start() {

        //Reset timer to 30 seconds each time new quiz starts
        $timeRemaining = 30;
        $("#timeRemaining").text($timeRemaining);

        //Use setInterval to start the count here and set the clock to running.
        if (!clockRunning) {

            clockRunning = true;

            //Call function to generate questions
            generateQuestions();

            //Remove "startUp" div from the page
            $("#startUp").empty();

            intervalId = setInterval(calculateTimeRemaining, 1000);
        }
    }

    function calculateTimeRemaining() {

        //If time is up then do what submit button does
        if($timeRemaining === 0) {
            onSubmit();

            //Use clearInterval to stop the timeRemaining here and set the clock to not be running.
            clockRunning = false;
            clearInterval(intervalId);
            return;
        }
        //Decrement time remaining by 1 after every second and populate it on the page
        $timeRemaining--;
        $("#timeRemaining").text($timeRemaining);
        
    }



    //The quiz will start again when this button is pressed after 1st load
    function startNewQuiz() { 

        console.log("New quiz started...");

        $("#result").empty();
        $("#strtNewQuiz").empty();

        //Use clearInterval to stop the timeRemaining here and set the clock to not be running.
        clockRunning = false;
        clearInterval(intervalId);

        start();
    };


    // $("#submit").on("click", function(){
    function onSubmit() {
        console.log("Quiz Submitted...");

        //Use clearInterval to stop the timeRemaining here and set the clock to not be running.
        clockRunning = false;
        clearInterval(intervalId);

        var choice = [];

        var correctAnsCount = 0;

        for(var i=0 ; i<questionsObj.length ; i++) {

            choice[i] = $("input[name='myRadio"+i+"']:checked").val();

            if(choice[i] === questionsObj[i].correctAns) 
                correctAnsCount++;
            
        }

        console.log("correctAnsCount ->" + correctAnsCount);

        //Remove questions from the page
        $("#question").empty();

        //Remove submit button from the page
        $("#submit").empty();

        //Show Correct & Answers
        $("#result").append("<h5 class='m-5'>Correct Answers: " + correctAnsCount + "</h5>");
        $("#result").append("<h5 class='m-5'>Incorrect Answers: " + (questionsObj.length - correctAnsCount) + "</h5>");
        

        //Create "Start new quiz" button
        $("#strtNewQuiz").append("<button type='button' class='btn btn-info btn-lg mb-5'><h3>Start new Quiz</h3></button>");

    };



}); //End of $(document).ready(function(){