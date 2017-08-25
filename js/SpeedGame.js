var SpeedGame = (function() {
  return {
    player: '',
    page: 1,
    baseURL: `https://qriusity.com/v1/questions?page=${this.page}&limit=20`,
    correct: '',
    incorrect: [],
    answers: [],
    data: [],
    timer: 30,
    currentQuestion: 0,

    setup: function() {
      var randomPage = Math.ceil(Math.random() * 10);
      this.page = randomPage;
      this.baseURL = `https://qriusity.com/v1/questions?page=${this.page}&limit=20`;
      console.log('Random Page', randomPage);

      $('#go').hide();
      $('#board').hide();
      $('#speedBoard').hide();
      $('#get-question').hide();
      $('#speed-round').on('click', function() {
        console.log('hello');
        $('#player-input').hide();
        $('h1').css('marginTop', '5vh');
        $('#player-score').append(`Score: 0`);
        $('#instructions').hide();
        $('#header-info').append(`<h4 id='player-score'>Score: 0</h4>`);
        $('#speedBoard').show();
        $('.progress').hide();
        $('#go').show();
      });
    },

    getQuestions: function() {
      return $.ajax({
        type: 'GET',
        url: this.baseURL,
        dataType: 'json'
      });
    },

    startRound: function() {
      this.currentQuestion = 0;
      // $('.card-title').text(this.data[this.currentQuestion].category.name);
      // $('.card-text').text(this.data[this.currentQuestion].question);
      // $('#speed-answers').append(`<div class='answers'>this.data[this.currentQuestion].option1</div>`);
      // $('#speed-answers').append(`<div class='answers'>this.data[this.currentQuestion].option2</div>`);
      // $('#speed-answers').append(`<div class='answers'>this.data[this.currentQuestion].option3</div>`);
      // $('#speed-answers').append(`<div class='answers'>this.data[this.currentQuestion].option4</div>`);

      //var correct = $('#speed-answers .answers').get(this.data[this.currentQuestion].answers);
      //$(correct).addClass('correct');

      setTimeout(function(){
        this.timer--;
        //$('#timer').text(this.timer);
      }, 1000);
    }
  }
})();
