var Player = (function() {
  return {
    name: '',
    score: 0,
    consecutiveAnswers: 0,

    setup: function() {
      this.score = 0;
      this.consecutiveAnswers = 0;
    },

    canSolveCategory: function(category) {
      if(this.consecutiveAnswers >= 3) {
        return true;
      }
      return false;
    },

    solvedCategory: function(category) {
      if(this.consecutiveAnswers >= 4) {
        this.consecutiveAnswers = 0;
        return true;
      }
      this.consecutiveAnswers = 0;
      return false;
    }
  }
})();
