$(function() {
  var Player = App.Player();
  var Game = App.Game();

  Player.score = 0;
  Player.consecutiveAnswers = 0;
  Game.player = Player;

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

  $('#get-question').click(function(){
    var random = Math.floor(Math.random() * Game.categories.length);
    Game.getQuestion(Game.categories[random][0]).done(function(data) {
      $('.modal-footer button').attr('disabled', 'disabled');
      $('#answers-list').empty();
      console.log(data);
      $('.modal-title').text(data.results[0].category);
      $('#modal-question').text(data.results[0].question);
      Game.correct = data.results[0].correct_answer;
      Game.incorrect = data.results[0].incorrect_answers;

      var answers = Game.incorrect;
      var random = Math.floor(Math.random() * (Game.incorrect.length + 1));
      answers.splice(random, 0, Game.correct);

      answers.forEach(function(item, i) {
        var $answer = $('<div>').addClass('answers btn btn-secondary');
        $answer.text(item);
        $answer.on('click', function() {
          if ($(this).hasClass('correct')) {
            Player.consecutiveAnswers++;
            var barValue = (Player.consecutiveAnswers / 3) * 100;
            $('.progress-bar').css('width', `${Math.ceil(barValue)}%`).attr('aria-valuenow', Math.ceil(barValue));

            $('#player-score').text(`Score: ${Player.score}`);
            setTimeout(function() {
              $('#modal-question').text('Close this Pop Up to continue');
              $('#answers-list').empty();
              $('.modal-footer button').removeAttr('disabled');
            }, 800);
          } else {
            $(this).addClass('bg-danger');
            setTimeout(function() {
              $('#modal-question').text('Close this Pop Up to continue');
              $('#answers-list').empty();
              $('.modal-footer button').removeAttr('disabled');
            }, 800);
          }

          if ($('.progress-bar').attr('aria-valuenow') === '100') {
            $('.pieces').removeAttr('disabled');
            $('#get-question').hide();
            $('#board').show();
            var $h3 = $('<h3>').text('Choose A Piece to Complete');
            $('#header-info').append($h3);
          }

          console.log(Player.consecutiveAnswers);
          $('.correct').addClass('bg-success');
        });
        $('#answers-list').append($answer);
        if (item.toLowerCase() === Game.correct.toLowerCase()) {
          $answer.addClass('correct');
        }
      });
    });
  });

  $('.pieces').on('click', function() {
    $('.modal-header').text($(this).text());
    var $currentPiece = $(this);
    $currentPiece.css('backgroundColor', '#5C9EAD').css('color', '#fff');
    Game.getQuestion($(this).text()).done(function(data) {
      $('.modal-footer button').attr('disabled', 'disabled');
      $('#answers-list').empty();
      console.log(data);
      $('#modal-question').text(data.results[0].question);
      Game.correct = data.results[0].correct_answer;
      Game.incorrect = data.results[0].incorrect_answers;

      var answers = Game.incorrect;
      var random = Math.floor(Math.random() * (Game.incorrect.length + 1));
      answers.splice(random, 0, Game.correct);

      answers.forEach(function(item, i) {
        var $answer = $('<div>').addClass('answers btn btn-secondary');
        $answer.text(item);
        $answer.on('click', function() {
          if ($(this).hasClass('correct')) {
            Player.score++;
            setTimeout(function() {
              $('#modal-question').text('Close this Pop Up to continue');
              $('#answers-list').empty();
              $('#get-question').show();
              Player.consecutiveAnswers = 0;
              $('.progress-bar').css('width','0%');
              $currentPiece.addClass('done').removeClass('pieces');
              $('.pieces').attr('disabled', 'disabled');
              $('.modal-footer button').removeAttr('disabled');
              $currentPiece.attr('disabled', 'disabled');
            }, 800);
          } else {
            Player.consecutiveAnswers = 0;
            $(this).addClass('bg-danger');
            setTimeout(function() {
              $('.progress-bar').css('width','0%');
              $('#modal-question').text('Close this Pop Up to continue');
              $('#answers-list').empty();
              $('.pieces').attr('disabled', 'disabled');
              $('.modal-footer button').removeAttr('disabled');
            }, 800);
          }

          $('#board').hide();
          if(Player.score == 6) {
            console.log('You Win!');
          }
          $('#header-info h3').remove();


          console.log(Player.consecutiveAnswers);
          $('.correct').addClass('bg-success');
        });
        $('#answers-list').append($answer);
        if (item.toLowerCase() === Game.correct.toLowerCase()) {
          $answer.addClass('correct');
        }
      });
    });
  });

  $('.modal-footer button').click(function() {
    $('.pieces').css('backgroundColor', '#fff').css('color', '#000');

  });

});
