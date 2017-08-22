var Player = (function() {
  return {
    name: '',
    score: 0,
    consecutiveAnswers: 0,
    categoriesNeeded: ['Sports', 'Geography', 'TV', 'Science', 'History', 'Celebs'],
    getName: function() {
      return this.name
    },
    getScore: function() {
      return this.score;
    },
    consecutiveAnswers: function() {
      return this.consecutiveAnswers
    },
    getCategoriesNeeded: function() {
      return this.categoriesNeeded;
    },
    completeCategory: function(category) {
      var index = this.categoriesNeeded.indexOf(category);
      this.categoriesNeeded.splice(index, 1);
      this.score++;
    }
  }
})();
