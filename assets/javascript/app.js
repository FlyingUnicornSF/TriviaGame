// Nice job putting everything in a function to keep things from
// leaking onto the global scope 👌
window.onload = function() {



    var catIam = {

        idx: undefined,
        prevIdx: undefined,
        timeRemaining: undefined,
        timerRunning: undefined,
        picked: undefined,
        pickAnswerTimer: 30,
        showAnswerTimer: 15,
        correctCounter: undefined,
        wrongCounter: undefined,
        outOfTimeCounter: undefined,

        questionList: [{
                "question": "Q: on average how many whiskers does a cat have?",
                "answer1": "36",
                "answer2": "24",
                "answer3": "18",
                "answer4": "8",
                "answer": "answer2",
                "vidID": "Aso9Txdl68I"
            },
            {
                "question": "Q: A term for a group of cats is:",
                "answer1": "clowder",
                "answer2": "caggle",
                "answer3": "clutch",
                "answer4": "covey",
                "answer": "answer1",
                "vidID": "beWfe2LRXVA"
            },
            {
                "question": "Q: A term for a group of kitten is:",
                "answer1": "kaggle",
                "answer2": "kitter",
                "answer3": "kindle",
                "answer4": "nook",
                "answer": "answer3",
                "vidID": "gnegDHLMtEQ"
            },
            {
                "question": "Q: are calico cats always female?",
                "answer1": "usually",
                "answer2": "hardly",
                "answer3": "half and half",
                "answer4": "¯&bsol;_(ツ)_/¯",
                "answer": "answer1",
                "vidID": "kyndakiGbaw"
            },
            {
                "question": "Q: why calico cats are usually female?",
                "answer1": "¯&bsol;_(ツ)_/¯ no one knows",
                "answer2": "they were bread that way",
                "answer3": "they have two X chromosomes",
                "answer4": "it's a mutation that male cats can't survive",
                "answer": "answer3",
                "vidID": "zJiHSxmzrmI"
            },
            {
                "question": "Q: which one of the following famous cat doest NOT have photo book published?",
                "answer1": "Lil Bub",
                "answer2": "Maru",
                "answer3": "Shironeko",
                "answer4": "Snoopy",
                "answer": "answer4",
                "vidID": "7um-T-Xt0X0"
            },

        ],

        initiate: function(argument) {
            $(".container").empty();
            this.idx = 0;

            // not sure why you are ending each of these statements with commas..
            this.prevIdx = 0
            this.timeRemaining = this.pickAnswerTimer
            this.timerRunning = undefined
            this.correctCounter = 0
            this.wrongCounter = 0
            this.outOfTimeCounter = 0
            
            $('.container').append('<div id="main"><button class="btn start" type="submit">Start the Game</button></div');
            $('.btn').on('click', function() {
                catIam.loadDiv(catIam.questionList, catIam.idx);
            });

        },

        count: function() {
            $('#timer').text(catIam.timeRemaining);
            catIam.timeRemaining--;

            // console.log is great for development, but try to keep them out of your production code.
            // console.log("I'm in counter");

            // stop the timer when timer runs out
            if (catIam.timeRemaining < 0) {
                catIam.stopTimer();
                index = catIam.idx;
                prevIndex = catIam.prevIdx;

                // instead of hardcoding this value in, it would be nice to set it to be whatever the 
                // length of the questions array is. That way you won't have to update this value if you
                // were to add more questions.
                if (index === 6) {
                    catIam.loadScore();
                    // console.log("loadScore")
                } else if (prevIndex !== index) {
                    // console.log('loadDiv')
                    catIam.loadDiv(catIam.questionList, index);
                } else if (prevIndex === index) {
                    // console.log('loadAnswer')
                    // console.log(catIam.questionList)
                    var question = catIam.questionList[index];  
                    var answerNum = question.answer;
                    var answerText = question[answerNum];
                    var videoID = question.vidID;
                    var result = 2;
                    catIam.loadAnswer(result, videoID, answerText);
                }
            } // closing if 
        }, // closing count function 

        runTimer: function() {

            // console.log(catIam.timeRemaining + " timeRemaining")

            // since you aren't declaring intervalId anywhere, this variable ends up being placed on the global scope 😮
            intervalId = setInterval(catIam.count, 1000);
            this.timerRunning = true;
        }, //closing runTimer

        stopTimer: function() {

            // console.log("I'm in stopTimer")
            clearInterval(intervalId);
            this.timerRunning = false;
            this.timeRemaining = undefined;
            // console.log(this.prevIdx + " prevIdx")
            // console.log(this.idx + " idx")
        }, // stop timer

        loadDiv: function(list, idx) {
            $("#main").empty();
            $("#main").append('<div class="catTalk text-center">Pick an answer... or I will push a puppy off the universe</div><div class="text-center">in <span id="timer">(x)</span> seconds...</div>');

            this.timeRemaining = this.pickAnswerTimer;
            $.each(list[idx], function(key, value) {
                // console.log("i'm in loadQuestion");
                var listDiv = $('<div id="' + key + '" class="text-center list">' + value + '</div>');
                listDiv.hide();
                $("#main").append(listDiv);
                listDiv.fadeIn('slow');
                return (key !== "answer4"); //holy poop that worked!
            }); //closing this characters forEach function
            this.prevIdx = this.idx;

            //player pick an answer
            $('.list').on('click', function() {
                // console.log("I'm in on click")
                catIam.picked = $(this).attr("id");
                catIam.stopTimer();
                catIam.compare(catIam.picked, catIam.idx);
            });
            this.runTimer();
        }, //closing loadQuestion

        loadAnswer: function(result, ID, text) {

            $("#main").empty();
            this.timeRemaining = this.showAnswerTimer;
            $("#main").append('<div class="catTalk text-center"></div><div class="text-center">in <span id="timer">(x)</span> seconds...</div>');

            if (catIam.idx === 5) {
                $(".catTalk").text("Show your score in");
            } else {
                $(".catTalk").text("next question will load in");
            }
            //load result div and vid div
            // The only thing different about each of these result divs is the text inside. So, to save some tedious markup writing,
            // I'd suggest just making the div once and then setting the text based on the following conditional statements.
            if (result == 1) {
                resultDiv = $('<div id="result" class="text-center">Correct!</div>');
            } else if (result == 0) {
                resultDiv = $('<div id="result" class="text-center">Wrong, the correct answer is: ' + text + '</div>');
            } else {
                this.outOfTimeCounter++;
                resultDiv = $('<div id="result" class="text-center">Out of time ¯&bsol;_(ツ)_/¯ the correct answer is: ' + text + '</div>');
            }

            vidDiv = $('<div id="player"></div>');

            $("#main").append(resultDiv);
            $("#main").append('<div id="vidContainer"></div>');            
            // $("#main").append('<div id="vidContainer" style="display:flex; width:350px; margin:auto; margin-top: 20px;"></div>');            
            $("#vidContainer").append(vidDiv);
            var vidID = ID;
            this.playVid(vidID);
            this.increment(catIam.idx);
            this.runTimer();
        }, // closing load answer 

        playVid: function(id) {
            // console.log("i'm in playVid function")
            var player = new YT.Player('player', {
                height: '290',
                width: '340',
                videoId: id,
                events: {
                    'onReady': function(event) {
                        event.target.playVideo();
                    },
                }
            });
        }, // closing play vid

        loadScore: function() {
            $(".container").empty();
            panelDiv = $('<div class="panel score"></div>');
            panelHeadingDiv = $('<div class="panel-heading">You Score is:</div>');
            ulDiv = $('<ul class="list-group"></ul>');
            liDivCorrect = $('<li class="list-group-item">Correct Answers: '+this.correctCounter+'</li>');
            liDivWrong = $('<li class="list-group-item">Wrong Answers: ' +this.wrongCounter+'</li>');
            liDivOutOfTime = $('<li class="list-group-item">Unanswered: '+this.outOfTimeCounter+'</li>')

            // So semi-colons are almost always unnecessary in JavaScript, so you can choose to use them or not.
            // The main thing I'd suggest is to stay consistent one way or the other.
            $(".container").append('<div id="main"></div>')
            $("#main").append(panelDiv);
            $(".panel").append(panelHeadingDiv);
            $(".panel").append(ulDiv);
            $(".list-group").append(liDivCorrect);
            $(".list-group").append(liDivWrong);
            $(".list-group").append(liDivOutOfTime);
            $('.container').append('<button class="btn btn-default" type="submit">Restart?</button>');

            $('.btn').on('click', function() {
                catIam.initiate();
            });
            
        }, // closing loadScore

        compare: function(pick, index) {
            var question = this.questionList[index];  
            var answerNum = question.answer;
            var answerText = question[answerNum];
          
            // var answerText = 
            // console.log(answerText)
            if (question.answer == pick) {
                // Unfortunately the var keyword in JS doesn't respect block scopes - it only cares about functional scopes.
                // So declaring var here has a counter-intuitive result as it is actually being declared in the outer functional
                // scope. Which also means that the other two `var result` declarations are just redefining the same variable.
                // To make your code read a bit closer to what is actually happening at run time I'd suggest just declaring 
                // result once at the top of this function and then assigning the value based on the below conditionals.
                var result = 1;
                // console.log("yay")
                this.correctCounter++;
            } else {
                var result = 0;
                // console.log("boo")
                this.wrongCounter++;
            }
            var videoID = question.vidID;
            // load answer according to result then clear result for the next round
            this.loadAnswer(result, videoID, answerText);
            // This is unnecessary as long as you keep result scoped within this function.
            var result = undefined;
        }, //closing compare

        increment: function(i) {
            // console.log("I'm in increment")
            this.prevIdx = i;
            i++;
            this.idx = i;
        },

    }; //closing cat I am 

    catIam.initiate();


}; // Closing onload