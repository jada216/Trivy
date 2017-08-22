class Game {
  constructor(player) {
    this.player = player;
    this.baseURL = 'https://opentdb.com/api.php?amount=1';
    this.currentCorrect = null;
    this.currentIncorrect = null;
    this.answers = null;
  }

  getRandomQuestion() {
    this.callAPI(this.baseURL);
  }

  getQuestionByCategory(category) {
    var str = '';
    switch (category.toLowerCase()) {
      case 'sports':
        str = '&category=21';
        break;

      case 'geography':
        str = '&category=22';
        break;

      case 'tv':
        var random = Math.floor(Math.random() * 2);
        if (random === 0) {
          str = '&category=14';
        } else {
          str = '&category=15';
        }
        break;

      case 'science':
        var random = Math.floor(Math.random() * 3);
        if (random === 0) {
          str = '&category=17';
        } else if (random === 1) {
          str = '&category=18';
        } else {
          str = '&category=17';
        }
        break;

      case 'history':
        var random = Math.floor(Math.random() * 2);
        if (random === 0) {
          str = '&category=23';
        } else {
          str = '&category=24';
        }
        break;
      case 'celebs':
        str = '&category=26';
        break;
      default:
        console.log('Error');
    }

    this.callAPI(this.baseURL + str);
  }

  callAPI(url) {
    $.ajax({
      type: 'GET',
      url: url,
      dataType: 'json'
    }).done(function(response) {
      console.log(response);
      $('.card-header').text(response.results[0].category);
      $('.card-text').text(response.results[0].question);

      this.currentCorrect = response.results[0].correct_answer;
      this.currentIncorrect = response.results[0].incorrect_answers;

      console.log('Current Correct', this.currentCorrect);
      console.log('Current Incorrect', this.currentIncorrect);

      this.answers = this.currentIncorrect;
      console.log('All answers', this.answers);

      var random = Math.floor(Math.random() * (this.currentIncorrect.length + 1));
      console.log('Random', random);
      console.log(this.answers.splice(random, 0, this.currentCorrect));
      console.log(this.answers);
      this.answers.forEach(function(item, i) {
        var current = $('.answers').get(i);
        $(current).text(item);
      });


    });
  }
}
