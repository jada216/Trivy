$(function(){
  $('#board').hide();
  $('#play').click(function(){
    $('#player-input').hide();
    $('#header-info').append('<h3>Choose A Topic</h3>');
    $('h1').css('marginTop', '5vh');
    $('#board').show();
  });

});
