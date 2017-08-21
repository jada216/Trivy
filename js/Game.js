class Game {
  constructor(player) {
    this.player = player;
    this.baseURL = 'https://opentdb.com/api.php?amount=1';
  }

  getRandomQuestion() {

  }

  getQuestionByCategory(category) {
    $.ajax({
      type: 'GET',
      url: `${this.baseURL}&category=26`,
      dataType: 'json'
    }).done(function(response) {
      console.log(response);
    });

  }
}
