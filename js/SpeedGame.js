var SpeedGame = (function() {
  return {
    player: '',
    page: 1,
    baseURL: `https://qriusity.com/v1/questions?page=${this.page}&limit=20`,
    correct: '',
    incorrect: [],
    answers: [],

    setup: function() {
      var randomPage = Math.ceil(Math.random() * 10);
      this.page = randomPage;

      $('#board').hide();
      $('#speedBoard').hide();
      $('#get-question').hide();
      $('.card').hide();
      $('#speed-round').click(function() {
        $('#player-input').hide();
        $('.card').show();
        $('h1').css('marginTop', '5vh');
        $('#player-score').append(`Score: 0`);
        $('#instructions').hide();
        $('#header-info').append(`<h4 id='player-score'>Score: 0</h4>`);
      });
    },

    getQuestions: function() {
      return $.ajax({
        type: 'GET',
        url: this.baseURL,
        dataType: 'json'
      });
    },
  }
})();
