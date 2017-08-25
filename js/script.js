$(function() {
  var Player = App.Player();
  var Game = App.Game();
  var SpeedGame = App.SpeedGame();
  var backupQuestions = Questions;
  var timer = 40;

  Player.setup();
  Game.setup();
  SpeedGame.setup();
  Game.player = Player;
  SpeedGame.player = Player;


  $('#get-question').click(function() {
    var r1 = Math.floor(Math.random() * Game.categories.length);

    Game.getQuestion(Game.categories[r1][0]).done(function(data) {
      console.log(data);
      Game.setupQuestion(data);
      Game.normalAnswer();
    }).fail(function(){
      $('#player-score').text('Unfortunately Trivy is unable to grab questions. Try coming back later.');
      $('.modal-title').text('Error');
      $('#modal-question').text('Please close this pop up');
      $('#get-question').hide();
    });
  });

  $('.pieces').on('click', function() {
    var $currentPiece = $(this);
    $currentPiece.css('backgroundColor', '#5C9EAD').css('color', '#fff');
    Game.getQuestion($(this).text()).done(function(data) {
      Game.setupQuestion(data);
      Game.pieceAnswer($currentPiece);
    });
  });

  $('#go').on('click', function(){
    var score = 0;
    $('#speed-input').removeAttr('disabled', 'disabled');
    $('#header-info').append(`<h4 id='time'>Time Remaining: ${timer}`);

    setInterval(function(){
      timer--;
      if(timer === 0) {
        document.getElementById('stop').play();
      } else if(timer <= 0) {
        $('#time').text(`Time Remaining: 0`);
        $('#speed-input').attr('disabled', 'disabled');
      } else {
        $('#time').text(`Time Remaining: ${timer}`);
      }
    }, 1000);
    var current = Math.floor(Math.random() * backupQuestions.length);
    var realAnswer = nextQuestion(current);
    $(this).hide();


    console.log(backupQuestions);
      $('#speed-form').submit(function(e){
        e.preventDefault();
        console.log(backupQuestions);

        if(realAnswer.toString().toLowerCase() === $('#speed-input').val().toString().toLowerCase()) {
          console.log('Correct');
          score++;
          $('#player-score').text(`Score: ${score}`);
          document.getElementById('point').play();
        } else {
          document.getElementById('no-point').play();
          console.log('Wrong');
        }
        current = Math.floor(Math.random() * backupQuestions.length);
        realAnswer = nextQuestion(current);
        $('#speed-input').val('');
      });

    //
    // SpeedGame.getQuestions().done(function(data){
    //   console.log(data);
    //   SpeedGame.data = data;
    //   localStorage.speedData = data;
    //   console.log('Speed Game Data ', data);
    //   SpeedGame.startRound();
    //
    //
    // });
  });

  $('.modal-footer button').click(function() {
    $('.pieces').css('backgroundColor', '#fff').css('color', '#000');
  });

  function nextQuestion(current) {
    console.log('Current index', current);
    var q = backupQuestions[current];
    console.log('Current Question', q);
    $('.card-title').text(q.category);
    $('.card-text').text(q.question);
    backupQuestions.splice(current, 1);
    return q.correct_answer;
  }

});
