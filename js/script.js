$(function(){
  // var Player = App.Player();
  // var Game = App.Game();
  // var categories = ['Sports', 'Science/Tech/Math', 'TV/Video Games', 'Geography', 'History', 'Celebs'];

  //
  //   Game.setup();

  $('#myModal').on('shown.bs.modal', function () {
  $('#myInput').focus()
})

  $('#board').hide();
  $('#play').click(function(){
    $('#player-input').hide();
    $('#header-info').append('<h3>Choose A Topic</h3>');
    $('h1').css('marginTop', '5vh');
    $('#board').show();
  });

  $('.pieces').on('click', function(){
    $('.modal-header').text($(this).text());
  });

});
