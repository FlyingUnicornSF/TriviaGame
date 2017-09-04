window.onload = function() {

 

  var catIam = {

    idx: undefined,
    timeRemaining: undefined,
    timerRunning: undefined,
    picked: undefined,
    questionList: [
      {
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

    initiate: function (argument) {
      this.idx = 0;
      this.loadDiv(this.questionList, this.idx);
      this.runTimer(1000, 10);
    },

    count: function(){
      $('#timer').text(catIam.timeRemaining);
      catIam.timeRemaining --;
      console.log("I'm in counter")
      if(catIam.timeRemaining < 0) {
        catIam.stopTimer();
      }
    },

    runTimer: function (milSec, duration) {
      console.log(duration)
      catIam.timeRemaining = duration; 
      console.log(catIam.timeRemaining)
      intervalId = setInterval(catIam.count, milSec);
      this.timerRunning = true;
    }, //closing runTimer

    stopTimer: function(){
      clearInterval(intervalId);
      this.timerRunning = false;
    },

    loadDiv: function(list, idx) {
      console.log(list[idx]);
      $.each(list[idx], function(key, value) {
        console.log("i'm in loadQuestion");
        console.log(value);
        var listDiv = $('<div id="'+key+'" class="text-center list">'+value+'</div>');
        listDiv.hide();
        $("#main").append(listDiv);
        listDiv.fadeIn('slow');
        return (key !== "answer4"); //holy poop that worked!
      });//closing this characters forEach function
    }, //closing loadQuestion

    loadAnswer: function(result, ID, text){
      $("#main").empty();
      //load result div and vid div
      if(result){
        resultDiv = $('<div id="result" class="text-center">Correct!</div>');
      } else {
        resultDiv = $('<div id="result" class="text-center">Wrong, the correct answer is:'+text+'</div>')
      }
      vidDiv = $('<div id="player" class="text-center"></div>');
      $("#main").append(resultDiv);
      $("#main").append(vidDiv);
      var vidID = ID;
      this.playVid(vidID);
      this.runTimer(1000, 15);

    },

    playVid: function(id) {
      console.log("i'm in playVid function")
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
    },

    compare: function(answer, index){
      var question =  this.questionList[index];
      var answerTest = question.answer2;
      console.log(index +" in compare")
      var result = undefined;
      if (question.answer == answer){
        result = true;
        console.log("yay")

      } else {
        result = false;
        console.log("boo")
      }
      //play video
      var videoID = question.vidID;
      this.loadAnswer(result, videoID, answerTest);
    },

    increment: function(i){
      i++;
      this.idx = i;
      //only up to i = 5
    },
  
    

  }; //closing cat I am 
  
  catIam.initiate();
  //player pick an answer
  $('.list').on('click', function(cat){
    catIam.picked = $(this).attr("id");
    catIam.compare(catIam.picked, catIam.idx);
    catIam.increment(catIam.idx);
    catIam.stopTimer();
  });


}; // Closing onload 