$(function() {
  var Player = App.Player();
  var Game = App.Game();
  Player.setup();
  Game.setup();
  Game.player = Player;

  $('#get-question').click(function() {
    var r1 = Math.floor(Math.random() * Game.categories.length);

    Game.getQuestion(Game.categories[r1][0]).done(function(data) {
      Game.setupQuestion(data);
      Game.normalAnswer();
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
