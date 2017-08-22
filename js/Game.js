var Game = (function() {
  return {
    player: '',
    baseURL: 'https://opentdb.com/api.php?amount=1',
    correct: '',
    incorrect: [],
    startGame: function() {
      $('#start').hide();
      $('#spin').show();
      $('h1').css('marginTop', '10vh');
    },
    setup: function() {
      $('#question').hide();
      $('#spin').hide();
    },
    spin: function() {
      var r = Math.floor(Math.random() * 6);
      switch (r) {
        case 0:
          return '&category=21';
          break;
        case 1:
          return '&category=22';
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
          var random = Math.floor(Math.random() * 3);
          if (random === 0) {
            return '&category=17';
          } else if (random === 1) {
            return '&category=18';
          } else {
            return '&category=17';
          }
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


// success: function(response) {
//   $('.card-header').text(response.results[0].category);
//   $('.card-text').text(response.results[0].question);
//
//   this.currentCorrect = response.results[0].correct_answer;
//   this.currentIncorrect = response.results[0].incorrect_answers;
//
//
//   this.answers = this.currentIncorrect;
//
//   var random = Math.floor(Math.random() * (this.currentIncorrect.length + 1));
//   this.answers.splice(random, 0, this.currentCorrect);
//   this.answers.forEach(function(item, i) {
//     var current = $('.answers').get(i);
//     $(current).text(item);
//   });
// }


var r = 0;


$('#question').show();
