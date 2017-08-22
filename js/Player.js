class Player {
  constructor(name) {
    this.name = name;
    this.score = 0;
    this.categoriesNeeded = ['Sports','Geography','TV', 'Science','History', 'Celebs'];
    this.consecutiveAnswers = 0;
  }

  getName() {
    return this.name;
  }

  getConsecutiveAnswers() {
    return this.consecutiveAnswers;
  }

  getCategoriesNeeded() {
    return this.categoriesNeeded;
  }

  getScore() {
    return this.score();
  }

  completeCategory(category) {
    var index = categoriesNeeded.indexOf(category);
    categoriesNeeded.splice(index, 1);
    score++;
  }



}
