// ['History', '&category=23'], ['Sports', '&category=21'], ['Celebs', '&category=26']]
var Game = (function() {
  return {
    player: '',
    baseURL: 'https://opentdb.com/api.php?amount=1',
    correct: '',
    incorrect: [],
    answers: [],
    categories:[['Film', '&category=11'], ['Music', '&category=12'], ['TV', '&category=14'], ['Science', '&category=17'], ['Math', '&category=19'], ['Geography', '&category=22']],

    setup: function() {
      $('.pieces').mouseenter(function() {
        $(this).css("backgroundColor", "#000").css("color", "#fff");
      }).mouseleave(function() {
        $(this).css('backgroundColor', '#fff').css('color', '#000');;
      });

      $('.pieces').attr('disabled', 'disabled');

      $('#board').hide();
      $('#go').hide();
      $('#get-question').hide();
      $('#play').click(function() {
        $('#board').show();
        $('#get-question').show();
        $('#player-input').hide();
        $('h1').css('marginTop', '5vh');
        $('#player-score').append(`Score: 0`);
        $('#instructions').hide();
        $('#header-info').append(`<h4 id='player-score'>Score: 0</h4>`)
      });
    },

    testGame: function() {
      return $.ajax({
        type: 'GET',
        url: this.baseURL,
        dataType: 'json'
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
        dataType: 'json',
        timeout: 3000
      });
    },

    setupQuestion(data) {
      var questionTxt = $('<textarea>').html(data.results[0].question).val();
      var categoryText = $('<textarea>').html(data.results[0].category).val();

      $('#answers-list').empty();
      $('#modal-question').text(questionTxt);
      $('.modal-title').text(categoryText);
      $('.modal-footer button').attr('disabled', 'disabled');

      this.correct = data.results[0].correct_answer;
      this.incorrect = data.results[0].incorrect_answers;

      this.answers = this.incorrect;
      var r2 = Math.floor(Math.random() * (this.incorrect.length + 1));
      this.answers.splice(r2, 0, this.correct);
      this.answers = this.decodeAnswers(this.answers);
    },

    normalAnswer() {
      var game = this;
      game.answers.forEach(function(item, i) {
        var $answer = $('<div>').addClass('answers btn btn-secondary');
        $answer.text(item);
        $answer.on('click', function() {
          if ($(this).hasClass('correct')) {
            document.getElementById('point').play();
            game.player.consecutiveAnswers++;
            var barValue = (game.player.consecutiveAnswers / 2) * 100;
            $('.progress-bar').css('width', `${Math.ceil(barValue)}%`).attr('aria-valuenow', Math.ceil(barValue));

            $('#player-score').text(`Score: ${game.player.score}`);
            setTimeout(function() {
              $('#modal-question').text('Close this Pop Up to continue');
              $('#answers-list').empty();
              $('.modal-footer button').removeAttr('disabled');
            }, 800);
          } else {
            document.getElementById('no-point').play();
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

          console.log('Answers Correct', game.player.consecutiveAnswers);
          $('.correct').addClass('bg-success');
        });

        $('#answers-list').append($answer);
        if (item.toLowerCase() === game.correct.toLowerCase()) {
          $answer.addClass('correct');
        }
      });
    },

    pieceAnswer($piece) {
      var game = this;
      game.answers.forEach(function(item, i) {
        var $answer = $('<div>').addClass('answers btn btn-secondary');
        $answer.text(item);
        $answer.on('click', function() {
          if ($(this).hasClass('correct')) {
            document.getElementById('point').play();
            game.player.score++;
            setTimeout(function() {
              $('#modal-question').text('Close this Pop Up to continue');
              $('#answers-list').empty();
              $('#get-question').show();
              game.player.consecutiveAnswers = 0;
              $('.progress-bar').css('width', '0%');
              $piece.addClass('done').removeClass('pieces');
              $('.pieces').attr('disabled', 'disabled');
              $('.modal-footer button').removeAttr('disabled');
              $piece.attr('disabled', 'disabled');
              $('#player-score').text(`Score: ${game.player.score}`);
            }, 800);
          } else {
            document.getElementById('no-point').play();
            game.player.consecutiveAnswers = 0;
            $(this).addClass('bg-danger');
            setTimeout(function() {
              $('.progress-bar').css('width', '0%');
              $('#modal-question').text('Close this Pop Up to continue');
              $('#answers-list').empty();
              $('.pieces').attr('disabled', 'disabled');
              $('.modal-footer button').removeAttr('disabled');
              $('#get-question').show();
            }, 800);
          }


          if (game.player.score === 6) {
              document.getElementById('win-game').play();
              document.getElementById('background-music').pause();
            $('#get-question').remove();
            $('#player-score').remove();
            $('#header-info').append(`<h4>YOU WIN!</h4>`);
             console.log('You Are A Winner');
          }

          $('#header-info h3').remove();
          $('.progress-bar').attr('aria-valuenow', '0');


          console.log('Player Score', game.player.score);
          $('.correct').addClass('bg-success');
        });
        $('#answers-list').append($answer);
        if (item.toLowerCase() === game.correct.toLowerCase()) {
          $answer.addClass('correct');
        }
      });
    },

    decodeAnswers: function(answers) {
      var decoded = [];
      answers.forEach(function(item) {
        var decodedTxt = $('<textarea>').html(item).val();
        decoded.push(decodedTxt);
      });
      return decoded;
    }


  }
})();
