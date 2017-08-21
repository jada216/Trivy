class Player {
  constructor(name) {
    this.name = name;
    this.score = 0;
    this.categoriesNeeded = [['Sports', 0], ['Geography', 0], ['TV', 0], ['Science', 0], ['History', 0], ['Celebs', 0]]
  }

  getName() {
    return this.name;
  }

}
