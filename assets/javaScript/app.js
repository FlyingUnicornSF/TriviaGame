window.onload = function() {

 

  var catIam = {

    idx: undefined,
    timer: 10,
    timerRunning: undefined,
    questionList: [
      {
        "question": "on average how many whiskers does a cat have?",
        "answer1": "36",
        "answer2": "24",
        "answer3": "18",
        "answer4": "8"
      },
      {
        "question": "A term for a group of cats is:",
        "answer1": "clutch",
        "answer2": "caggle",
        "answer3": "clowder",
        "answer4": "covey"
      },
      {
        "question": "A term for a group of kitten is:",
        "answer1": "kaggle",
        "answer2": "kindle",
        "answer3": "kitdle",
        "answer4": "nook"
      },
      {
        "question": "are calico cats always female?",
        "answer1": "usually",
        "answer2": "harly",
        "answer3": "half and half",
        "answer4": "¯&bsol;_(ツ)_/¯"
      },
      {
        "question": "why calico cats are usually female?",
        "answer1": "¯&bsol;_(ツ)_/¯ no one knows",
        "answer2": "they were bread that way",
        "answer3": "they have two X chromosomes",
        "answer4": "it's a mutation that male cats can't survive"
      },  
      {
        "question": "which one of the following famous cat doest NOT have photo book published?",
        "answer1": "Lil Bub",
        "answer2": "Maru",
        "answer3": "Snoopy",
        "answer4": "Shironeko"
      },

    ],

    initiate: function (argument) {
      idx = 0;
      this.loadDiv(this.questionList);
    },
    count: function(){

      $('#timer').text(this.timer);
      this.timer --;
      console.log("I'm in counter")
      return something
      
    },

    runTimer: function (argument) {
      intervalId = setInterval(catIam.count, 1000);
    }, //closing runTimer

    loadDiv: function(list) {
//       jQuery.each( obj, function( i, val ) {
//   $( "#" + i ).append( document.createTextNode( " - " + val ) );
// });
      console.log(list[4]);
      $.each(list[4], function(key, value) {
      console.log("i'm in loadQuestion");
      console.log(value);
      var listDiv = $('<div class="text-center list '+idx+'">'+value+'</div>');
      listDiv.hide();
      $("#main").append(listDiv);
      listDiv.fadeIn('slow');
      });//closing this characters forEach function
    }, //closing loadQuestion


  }; //closing cat I am 
  
  catIam.initiate();


}; // Closing onload 