$(function() {
  var Player = App.Player();
  var Game = App.Game();
  var SpeedGame = App.SpeedGame();

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

  $('.modal-footer button').click(function() {
    $('.pieces').css('backgroundColor', '#fff').css('color', '#000');
  });

});
