$(function() {
  var Player = App.Player();
  var Game = App.Game();

  Game.setup();

  $('#player-form').submit(function(e) {
    e.preventDefault();
    Player.name = $('#playerName').val();
    Game.player = Player;
    Game.startGame();
  });

  $('#spinButton').click(function() {
    $(this).hide();
    var category = Game.spin();
    Game.callAPI(Game.baseURL + category).done(function(data) {
      $('.card-header').text(data.results[0].category);
      $('.card-text').text(data.results[0].question);

      Game.correct = data.results[0].correct_answer;
      Game.incorrect = data.results[0].incorrect_answers;

      var answers = Game.incorrect;
      var random = Math.floor(Math.random() * (Game.incorrect.length + 1));
      answers.splice(random, 0, Game.correct);

      answers.forEach(function(item, i) {
        var $answer = $('<div>').addClass('answers btn btn-secondary');
        $answer.text(item);
        $answer.on('click', function(){
          if ($(this).hasClass('correct')) {
            Player.consecutiveAnswers++;
          } else {
            $(this).addClass('bg-danger');
          }

          if(Player.canSolveCategory()) {
            $('#answers-list').empty();
          } else {
            setTimeout(function(){
              $('#question').hide();
              $('#spinButton').show();
              $('#answers-list').empty();
            }, 1500);
          }

          console.log(Player.consecutiveAnswers);
          $('.correct').addClass('bg-success');
        });
        $('#answers-list').append($answer);
        if(item.toLowerCase() === Game.correct.toLowerCase()) {
          $answer.addClass('correct');
        }
      });

      $('#question').show();
    });
  });

  $('.progressbar').addClass('bg-secondary');

});
