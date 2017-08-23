var Game = (function() {
  return {
    player: '',
    baseURL: 'https://opentdb.com/api.php?amount=1',
    correct: '',
    incorrect: [],
    startGame: function() {
      $('#start').hide();
      $('#wheel').show();
      $('h1').css('marginTop', '10vh');
    },
    setup: function() {
      $('#question').hide();
      $('#wheel').hide();
      $('#choose-category').hide();
    },
    spin: function(num) {
      var r;
      if (num !== undefined) {
        r = num;
      } else {
        var r = Math.floor(Math.random() * 6);
      }

      switch (r) {
        case 0:
          return '&category=21';
          break;
        case 1:
          var random = Math.floor(Math.random() * 3);
          if (random === 0) {
            return '&category=17';
          } else if (random === 1) {
            return '&category=18';
          } else {
            return '&category=19';
          }
          break;

        case 2:
          var random = Math.floor(Math.random() * 2);
          if (random === 0) {
            return '&category=14';
          } else {
            return '&category=15';
          }
          break;
        case 3:
          return '&category=22';
          break;
        case 4:
          var random = Math.floor(Math.random() * 2);
          if (random === 0) {
            return '&category=23';
          } else {
            return '&category=24';
          }
          break;
        case 5:
          return '&category=26';
          break;
        default:
          return '';
      }
    },
    callAPI: function(url) {
      return $.ajax({
        type: 'GET',
        url: url,
        dataType: 'json'
      });
    }
  }
})();
