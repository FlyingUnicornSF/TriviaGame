window.onload = function() {

 

  var catIam = {


    timer: 30,

    count: function(this){
      console.log("I'm ing cunt function");
      $('#timer').text(catIam.timer);
      this.timer--;
      
    },

  }; //closing cat I am 

 intervalId = setInterval(catIam.count, 1000);

}; // Closing onload 