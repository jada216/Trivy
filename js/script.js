$(function (){
  var player = '';
  $('#question').hide();
  $('#spin').hide();
  $('#player-form').submit(function(e){
    e.preventDefault();
    player = new Player($('#playerName').val());
    console.log(player.getName());

    startGame();
  });

  $('#spin').click(function(){
    $(this).hide();
    $('#question').show();
  });

  $('.progressbar').addClass('bg-secondary');







});

function startGame() {
  $('#start').hide();
  $('#spin').show();
  $('h1').css('marginTop', '10vh');
}
