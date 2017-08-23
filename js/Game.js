var Game = (function() {
  return {
    player: '',
    baseURL: 'https://opentdb.com/api.php?amount=1',
    correct: '',
    incorrect: [],
    categories:[['Film', '&category=11'], ['Music', '&category=12'], ['TV', '&category=14'], ['Science', '&category=17'], ['Math', '&category=19'], ['Geography', '&category=22'], ['History', '&category=23'], ['Sports', '&category=21'], ['Celebs', '&category=26']],
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
    getQuestion: function(category) {
      var url = this.baseURL;
      this.categories.forEach(function(item) {
        if(item[0] === category) {
          url += item[1];
        }
      });
      return $.ajax({
        type: 'GET',
        url: url,
        dataType: 'json'
      });
    }
  }
})();
