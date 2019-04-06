$(document).ready(function(){

    //*********** DEFINING VARIABLES AND FUNCTIONS ********************** */

    // prevents the clock from being sped up unnecessarily
    var clockRunning = false;

    //  Variable that will hold our setInterval that runs the stopwatch
    var intervalId;

    //For each quiz assign time as 60 seconds
    var $timeRemaining = 30;

    $("#timeRemaining").text("Try taking the quiz...");


    var questionsObj = [
        {
            image: "assets/images/TajMahal.jpg",
            options: ["Pyramid of Giza" , "Christ the Redeemer" , "Taj Mahal"],
            correctAns: "Taj Mahal"
        }, { 
            image: "assets/images/GreatWallOfChina.jpg",
            options: [ "Petra of Peru" , "Great Wall of China" , "Colosseum" ],
            correctAns: "Great Wall of China"
        }, {
            image: "assets/images/PetraOfPeru.jpg",
            options: ["Pyramid of Giza" , "Colosseum" , "Petra of Peru"],
            correctAns: "Petra of Peru"
        }, {
            image: "assets/images/ChichenItza.jpg",
            options: ["Colosseum" , "Chichen Itza" , "Taj Mahal"],
            correctAns: "Chichen Itza"
        }, {
            image: "assets/images/ChristTheRedeemer.jpg",
            options: ["Petra of Peru" , "Christ the Redeemer" , "Colosseum"],
            correctAns: "Christ the Redeemer"
        }, {
            image: "assets/images/Colosseum.jpg",
            options: ["Colosseum" , "Chichen Itza" , "Taj Mahal"],
            correctAns: "Colosseum"
        }, {
            image: "assets/images/PyramidOfGiza.jpg",
            options: ["Petra of Peru" , "Colosseum" , "Pyramid of Giza"],
            correctAns: "Pyramid of Giza"
    }];

    function generateQuestions() {

        for(var questionNo=0 ; questionNo<questionsObj.length ; questionNo++) {
            
            // Create div to hold question
            var $question = $("<div>").addClass("form-group m-5");

            //Adding question to div
            $("<h4>")
                .append(`<h5>Q ${(questionNo+1)}. Can you name this wonder?</h5>`)
                .appendTo($question); 

            //Adding question - image
            $("<img>")
                .addClass('m-3')
                .attr("src", questionsObj[questionNo].image)
                .attr("width", 250)
                .appendTo($question);


            // Shuffle options
            questionsObj[questionNo].options = questionsObj[questionNo].options.sort(function() {
                return .5 - Math.random();
            });
            console.log("Shuffle options: " + questionsObj[questionNo].options);


            // Create a loop to iterate through question's options and create radio buttons for each one
            for(var j=0 ; j<questionsObj[questionNo].options.length ; j++) {

                // Create a div for options and add bootstrap classes
                var $choice = $('<div>');
                $choice.addClass('form-check form-check-inline ml-3');

                // Create an input tag for the radio button
                var $radioInput = $('<input>');

                // Add attributes to provide the answer choice
                $radioInput
                    .attr({
                        type: "radio",
                        class: "form-check-input ml-5 pl-3",
                        value: questionsObj[questionNo].options[j],
                        name: questionNo
                    })
                    .appendTo($choice);


                // Create label to actually print the choice to the page
                var $choiceLabel = $('<label>');

                $choiceLabel
                    .text(questionsObj[questionNo].options[j])
                    .addClass('form-check-label pl-3')
                    .appendTo($choice);

                // Add radio button choice to question
                $choice.appendTo($question);
            }


            //Appending all elements of the question to the respective div
            $("#question").append($question);

             //Create a border at the end of all questions and  before 'Submit button'
            $("#question").css('border-bottom', 'solid 3px grey');

        }

        //Create "Submit" button
        $("<button>")
            .attr("type", "button")
            .addClass("btn btn-primary btn-lg")
            .append(`<h3>Submit</h3>`)
            .appendTo($("#submit"));

    }//End of generateQuestions()



    //*********** DEFINING ONCLICK EVENTS ********************** */

    $("#start").on("click", start);
    $("#submit").on("click", onSubmit);
    $("#strtNewQuiz").on("click", startNewQuiz);

    //*********** DEFINING ONCLICK FUNCTIONS ********************** */

    function start() {

        //Reset timer to 30 seconds each time new quiz starts
        $("#timeRemaining").empty();
        $timeRemaining = 30;
        $("#timeRemaining").text(`Time Remaining: ${$timeRemaining} seconds`);


        // Shuffle questions at the start of each quiz
        questionsObj = questionsObj.sort(function() {
            return .5 - Math.random();
        });
        console.log("Shuffle questions: " + questionsObj);


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
        $("#timeRemaining").text(`Time Remaining: ${$timeRemaining} seconds`);
        
    }



    //The quiz will start again when this button is pressed after 1st load
    function startNewQuiz() { 

        console.log("New quiz started...");

        $("#result").empty();
        $("#strtNewQuiz").empty();
        $("#timeRemaining").empty();

        //Use clearInterval to stop the timeRemaining here and set the clock to not be running.
        clockRunning = false;
        clearInterval(intervalId);

        start();
    };


    //Function executed when user clickes on 'Submit' button to submit the answer for a question
    function onSubmit() {
        console.log("Quiz Submitted...");

        //Use clearInterval to stop the timeRemaining here and set the clock to not be running.
        clockRunning = false;
        clearInterval(intervalId);

        var choice = 0;

        var correctAnsCount = 0;

        $("#question").css('border-bottom', '0px');

        //If user has not yet selected any option and timer runs out then display Time Up! with correct ans
        if($timeRemaining === 0) {

            $("<h1>")
                .addClass('mt-3')
                .append(`<strong>Time Up!!</strong>`)
                .css("color", "blue")
                .appendTo($("#result")); 
        }


        for(var questionNo=0 ; questionNo<questionsObj.length ; questionNo++) {


            // Get value out of radio button you selected
            var userAnswer = $(`input[name=${questionNo}]:checked`).val();
            console.log("Correct answer: " + questionsObj[questionNo].correctAns + " :: User answer: " + userAnswer);


            //If user selected correct answer then increment the correctAnsCount by 1 each time
            if(questionsObj[questionNo].correctAns === userAnswer) {
                console.log("they match" + correctAnsCount);
                correctAnsCount++;
            }

        }

        console.log("correctAnsCount:" + correctAnsCount);

        //Remove questions from the page
        $("#question").empty();

        //Remove submit button from the page
        $("#submit").empty();

        //Show Correct & Answers
        $("<h5>")
            .addClass('mt-3')
            .append(`<strong>Correct Answers: ${correctAnsCount}</strong>`)
            .appendTo($("#result")); 

        $("<h5>")
            .addClass('mt-3')
            .append(`<strong>Incorrect Answers: ${(questionsObj.length - correctAnsCount)}</strong>`)
            .appendTo($("#result")); 


        //Create "Start new quiz" button
        $("<button>")
            .attr("type", "button")
            .addClass("btn btn-primary mb-5")
            .append(`<h3>Start Quiz Again</h3>`)
            .appendTo($("#strtNewQuiz"));

    };



}); //End of $(document).ready(function()