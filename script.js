const gameContainer = document.getElementById("game");
const restart = document.getElementById("restart");
const info = document.getElementById("info");
const scoreBoard = document.getElementById('score');
const hiScoreBoard = document.getElementById('highscore');

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}
// const allCards = document.querySelectorAll
restart.addEventListener("click", function(){
  scoreBoard.innerText = `Your Score: 0`;
  score = 0;
  softScore = 0;
  clickCount = 0;
  for (let cards of gameContainer.children){
    // console.log(cards);
    cards.style.backgroundColor = ''; //i'm not sure why this works, but it does to reset color to white when restart is clicked.
  }
  if(info.children["win"]){
    info.removeChild(win);
  }
  while (gameContainer.firstChild){
    gameContainer.removeChild(gameContainer.firstChild) //found basically this loop on javascripttutorials.net for removing all children of an element
  }
  shuffle(COLORS);  
  createDivsForColors(COLORS);    //resets the color grid on restart
  console.log("resetting");
})

let clickCount = 0;
let firstCardColor = '';
let firstCard = {};
let score = 0;
let softScore = 0;

let highScore = localStorage.highScore;
if (highScore){
  hiScoreBoard.innerText = `High Score: ${highScore}`;
}
// TODO: Implement this function!
function handleCardClick(event) {
  if(event.target.style.backgroundColor !== ""){
    console.log('already showing!');
  } else if(clickCount<1){
    // you can use event.target to see which element was clicked
    const cardColor = event.target.className;
    firstCard = event.target;   //saves selection to compare
    firstCardColor = cardColor; //saves selection to compare
    event.target.style.backgroundColor = cardColor;
    clickCount++;
    // event.target.classList.toggle('clicked');
    console.log("you just clicked", cardColor, clickCount);
  } else if(clickCount < 2){
    const cardColor = event.target.className;
    event.target.style.backgroundColor = cardColor;
    clickCount++;
    if(event.target == firstCard){
      clickCount--; //doesn't count click if you select the same card twice
    }else if(cardColor == firstCardColor){
      clickCount = 0; //resets clickCount when you find a match, but leaves cards "facing up"
      softScore += 2;
      if (softScore == COLORS.length){
        const winMsg = document.createElement("h2");
        winMsg.id = 'win';
        winMsg.innerText = 'You Won!';
        info.append(winMsg);
        if(!highScore){
          highScore = score;
          hiScoreBoard.innerText = `High Score: ${highScore}`;
          localStorage.setItem("highScore", highScore);
        }else if(score < highScore){
          highScore = score;
          hiScoreBoard.innerText = `High Score: ${highScore}`;
          localStorage.setItem("highScore", highScore);
        }
        softScore = 0;
      }
    }
    else{
      score++; //increments score on wrong guess
      scoreBoard.innerText = `Your Score: ${score}`;
      setTimeout(function(){
        event.target.style.backgroundColor = ''; //reverts current card to blank
        firstCard.style.backgroundColor = ''; //reverts first card to blank
        clickCount = 0; //resets clickCount so you can go again but not til after the timeout
      }, 1000) //waits 1 second
    }
    // event.target.classList.toggle('clicked');
    console.log("you just clicked", cardColor, `first card was ${firstCardColor}`, clickCount);
  }
}

  


// when the DOM loads
createDivsForColors(shuffledColors);
