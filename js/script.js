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

  $('#spin').click(function() {
    $(this).hide();
    var category = Game.spin();
    Game.callAPI(Game.baseURL + category).done(function(data){
      console.log(data);
    })
  });

  $('.answers').click(function() {
    if(game.isCorrect($(this).text())) {
      $(this).removeClass('btn-secondary').addClass('btn-success');
      game.addCorrectAnswer();
    } else {
      $(this).removeClass('btn-secondary').addClass('btn-warning');
    }
  });

  $('.progressbar').addClass('bg-secondary');

});
