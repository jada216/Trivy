# TRIVY - A Simple Fun Trivia Game

## Trello Board - https://trello.com/b/klhYi8TN/trivy

### What Is Trivy?
Originally TRIVY was supposed to be a web game based on the mobile app Trivia Crack. The game has two players who try to collect 6 category pieces. In order to collect those pieces they must answer 3 correct random trivia questions and then the category question to collect the piece. Whichever player has all 6 pieces first wins the game.

My game is similar in that you must get all six pieces on the board to turn blue and in order to do that you must get 2 random questions correct and then a question from the category of the piece you chose. Once you have all 6 pieces blue, then you win.

I also added a Speed Round mode where you can see if you can answer 20 questions in 30 seconds. These questions right now are hardcoded but ideally I'd want these questions to be pulled from an API as well.

### Technologies Used
In order to get Trivia questions, I used the Open Trivia Database API. This API has multiple Trivia questions spanning many categories. I also tried to used a separate API for the speed round in case the Open Trivia API went down.

I also used Bootsrap and Jquery for my front-end design. I learned how to used Bootstrap modals which display the questions in my game.

### Approach
I began by trying to replicate Trivia Crack by making a 2 player game board and have a roulette wheel spin to tell you which category you land on.

### Future Features
I want to finish fleshing out the speed round. Right now no matter if your answer matches the correct answer, it says you are wrong. I would also like to add multiplayer functionality to the Classic version of the game.

### Bugs
A bug right now is the speed round makes every answer incorrect. As of now, I am still now sure why it isn't working.

### Biggest Wins and Challenges
I had many challenges with this project. I wanted the game to be more entertaining with power ups, the roulette wheel and multiple player functionality but ran into too many problems the first 2 days trying to focus on that part of the game. Since I wasted a lot of time trying to mimic Trivia Crack, my game was not working. By Wednesday, I had to scrap my original idea and just make the simple trivia game I have now.

I was really disappointed that I could not get the roulette wheel to work since that was originally the central part of my game.

Another challenge was the API I was using went down yesterday so it was hard for me to test bugs. I managed to hardcode some trivia questions for the speed round in case this happens during presenting but again, the speed round is not working correctly.

Some wins I got was completing the full game without any errors (that I've noticed) and have all the components hide and show at the correct time. The DOM Manipulation was a big part of this project so getting that to work was a huge relief.
