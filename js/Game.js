// ['History', '&category=23'], ['Sports', '&category=21'], ['Celebs', '&category=26']]
var Game = (function() {
  return {
    player: '',
    baseURL: 'https://opentdb.com/api.php?amount=1',
    correct: '',
    incorrect: [],
    answers: [],
    categories:[['Film', '&category=11'], ['Music', '&category=12'], ['TV', '&category=14'], ['Science', '&category=17'], ['Math', '&category=19'], ['Geography', '&category=22']],

    startGame: function() {
      $('#start').hide();
      $('#wheel').show();
      $('h1').css('marginTop', '10vh');
    },

    setup: function() {
      $('.pieces').mouseenter(function() {
        $(this).css("backgroundColor", "#000").css("color", "#fff");
      }).mouseleave(function() {
        $(this).css('backgroundColor', '#fff').css('color', '#000');;
      });

      $('.pieces').attr('disabled', 'disabled');

      $('#board').hide();
      $('#get-question').hide();
      $('#play').click(function() {
        $('#get-question').show();
        $('#player-input').hide();
        $('h1').css('marginTop', '5vh');
        $('#player-score').append(`Score: 0`);
        $('#instructions').hide();
      });
    },

    getQuestion: function(category) {
      var url = this.baseURL;
      this.categories.forEach(function(item) {
        if(item[0] === category) {
          url += item[1];
        }
      });
      return $.ajax({
        type: 'GET',
        url: url,
        dataType: 'json'
      });
    },

    setupQuestion(data) {
      $('#answers-list').empty();
      $('#modal-question').text(data.results[0].question);
      $('.modal-title').text(data.results[0].category);
      $('.modal-footer button').attr('disabled', 'disabled');

      this.correct = data.results[0].correct_answer;
      this.incorrect = data.results[0].incorrect_answers;

      this.answers = this.incorrect;
      var r2 = Math.floor(Math.random() * (this.incorrect.length + 1));
      this.answers.splice(r2, 0, this.correct);
    }
  }
})();
