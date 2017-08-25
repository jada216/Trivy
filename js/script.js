$(function() {
  var Player = App.Player();
  var Game = App.Game();
  var SpeedGame = App.SpeedGame();
  var backupQuestions = Questions;

  console.log('SpeedGame', SpeedGame);
  console.log('Game', Game);

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
    var current = Math.floor(Math.random() * backupQuestions.length);
    var realAnswer = nextQuestion(current);
    $(this).hide();


    console.log(backupQuestions);
      $('#speed-form').submit(function(e){
        e.preventDefault();
        console.log('Answer ', realAnswer);
        console.log('My Answer', $('#speed-input').val());
        if($('#speed-input').toString().toLowerCase() === realAnswer.toLowerCase()) {
          console.log('Correct');
        } else {
          console.log('Wrong');
        }
        current = Math.floor(Math.random() * backupQuestions.length);
        realAnswer = nextQuestion(current);
        $('#speed-input').val('');
      });


    SpeedGame.getQuestions().done(function(data){
      console.log(data);
      SpeedGame.data = data;
      localStorage.speedData = data;
      console.log('Speed Game Data ', data);
      SpeedGame.startRound();


    });
  });

  $('.modal-footer button').click(function() {
    $('.pieces').css('backgroundColor', '#fff').css('color', '#000');
  });

  function nextQuestion(current) {
    var q = backupQuestions[current];
    $('.card-title').text(q.category);
    $('.card-text').text(q.question);
    backupQuestions.pop(q);
    return q.correct_answer;
  }

});
