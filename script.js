/* global createCanvas, colorMode, HSB, background, height, width, loadImage, 
noStroke, fill, random, ellipse, rect, image, collideLineRect, collideCircleCircle, text, LEFT, 
textAlign, delay, textSize, CENTER, noFill, createSlider, createButton, mouseX, mouseY, collidePointCircle, 
loadSound, stroke, strokeWeight, soundFormats, loadSound*/

let people, person, emojiNum, diseases, covid, infectedPerson, infected, time, gameIsOver, 
    diseaseNum, backgroundImage, sidebarSize, slider, sliderValue, playBtn, playGame, isWinner, p5, bubble;
let backgroundMusic, soundTwo;
let loopStart    = 0.5;
let loopDuration = 0.2;

function setup() {
  var w = window.innerWidth;
  var h = window.innerHeight;
  createCanvas(w, h);
  colorMode(HSB, 360, 100, 100);
  //time = 1000;
  // // load sound
  soundFormats('mp3', 'ogg');
  backgroundMusic = loadSound("https://cdn.glitch.com/cf8a996f-fabb-4006-95db-c9b9071d4ed5%2Fkids-cheering-sound-effect.mp3?v=1595963076631");
  soundTwo = loadSound("https://cdn.glitch.com/cf8a996f-fabb-4006-95db-c9b9071d4ed5%2FMinecraft-death-sound.mp3?v=1595962984607");
  
  gameIsOver = false;
  
  sidebarSize = 207;
  
  playGame = false;
  
  isWinner = false;
  
  person = loadImage("https://cdn.glitch.com/cf8a996f-fabb-4006-95db-c9b9071d4ed5%2Fface-with-medical-mask_1f637.png?v=1595870398324");
  
  covid = loadImage("https://cdn.glitch.com/cf8a996f-fabb-4006-95db-c9b9071d4ed5%2Fvirus_OnqwVOP.png?v=1595870370991");
  
  infected = loadImage("https://cdn.glitch.com/cf8a996f-fabb-4006-95db-c9b9071d4ed5%2Fvirus.png?v=1595870351094");
  
  backgroundImage = loadImage("https://cdn.glitch.com/cf8a996f-fabb-4006-95db-c9b9071d4ed5%2Fback.jpg?v=1595966101438");
  
  bubble = loadImage("https://cdn.glitch.com/cf8a996f-fabb-4006-95db-c9b9071d4ed5%2F299829030047211%20(2).webp?v=1595870303154");
  
  //difficulty value
  slider = createSlider(5, 25, 10);
  slider.position(30, 140);
  
  
  playBtn = createButton('Play');
  playBtn.position(35, 160);
  playBtn.mousePressed(play2);
  
  time = 1000;
   
}


function play2() {
  playGame = true;
  time = 1000;
  isWinner = false;
  sliderValue = slider.value();
  console.log(sliderValue);
  playGame = true;
  emojiNum = sliderValue;
  diseaseNum = sliderValue;
  people = [];
 
  for (let i = 0; i < emojiNum; i++) {
    people.push(new GeneratePeople());
  }
  
  diseases = [];
  for (let i = 0; i < diseaseNum; i++){
    diseases.push(new GeneratePeople());
  }
  
  console.log(sliderValue);
  
  infectedPerson = new GeneratePeople();
}

function displayInstructions(){
  fill(60,50,80);
  textSize(20);
  strokeWeight(5);
  stroke(0);
  text("Story", 75, 225);
  text("How To Play", 30, 525);
  
  noStroke();
  textSize(15);
  fill(0);
  text("There is a worldwide pandemic happening and one person is not wearing their mask properly. They are secretly spredding the virus to everyone and people are dying. You are the detective, keep your eyes peeled and try to find the the culprit before it's too late. Watch out for the virus thats floating around, you don't want to catch it yourself.", 5, 245, sidebarSize, height);
  
  text("Before the time runs out find the one culprit by clicking any of the people wearing masks, choose the right one you win if not just try again. You can adjust the difficulty of the game by using the slider, it varies from 5 to 25 but the time stays the same. Once time runs out refresh the page to play again and see if you can save this town from the virus", 5, 555, sidebarSize, height);
  
}
  
function displaySetUP(){
  fill(60,50,80);
  textSize(30);
  strokeWeight(5);
  stroke(0);
  text("CONTAGION 3", 0, 30);
  
  fill(0);
  noStroke();
  textSize(15);
  text("Find the contagious person that started the disease", 0, 40, sidebarSize, height);
  
  text("Difficulty Level, 5 - 25 people", 0, 100);
  
  text(`Time remaining: ${time}`, 0, 175);
  
  displayInstructions();
  
}

function handleTime() {
   if (!gameIsOver && time>0 && !isWinner){
    time--;
   }
  if (time===0){
    gameIsOver = true;
    playGame = false;
    }
  
}

function displayGameIsOver() {
  console.log("gameOver");
  textSize(20);
  
  fill(60,50,80);
  strokeWeight(5);
  stroke(0);
  text("GAME OVER", width / 2, height / 2);
  text("Refresh To Play Again", width/2, height/2 + 30);
  
  strokeWeight(0);
}

function draw() {
  
  background(backgroundImage);
  
  if(isWinner){
    displayWinner();
  }
  
  if (gameIsOver){
    displayGameIsOver();
  }
  
  fill(100, 50, 80);
  rect(0, 0, sidebarSize, height);
  
  displaySetUP();
  
  if (playGame) {
    
    handleTime();
    
    for (let i = emojiNum - 1; i >= 0; i--) {
      people[i].float();
      people[i].displayEmoji();
      people[i].checkEndGame();
      if (
        collideCircleCircle(
          people[i].x,
          people[i].y,
          people[i].d,
          infectedPerson.x,
          infectedPerson.y,
          infectedPerson.d
        )
      ) {
        people.splice(i, 1);
        emojiNum--;
        console.log(people.length);
        soundTwo.play();

      }
    }

    for (let i = diseaseNum - 1; i >= 0; i--) {
      diseases[i].float();
      diseases[i].displayVirus();
      diseases[i].checkEndGame();
      
    }

    infectedPerson.float();
    infectedPerson.displayInfected();
    infectedPerson.checkEndGame();
  }
  
}



class GeneratePeople {
  constructor() {
    // Randomly generate position
    this.x = random(sidebarSize,width);
    this.y = random(height);
    // Randomly generate radius
    this.d = 40;
    

    this.masterXvelocity = random(2,4);
    this.masterYvelocity = random(2,4);
 
    this.xVelocity = this.masterXvelocity;
    this.yVelocity = this.masterYvelocity;
  }

  float() {
    this.x += this.xVelocity;
    this.y += this.yVelocity;
    
    if (this.x + this.d > width) {
      this.xVelocity = -1 * this.masterXvelocity;
    }
    if (this.x - this.d < sidebarSize) {
      this.xVelocity = this.masterXvelocity;
    }
    if (this.y + this.d > height) {
      this.yVelocity = -1 * this.masterYvelocity;
    }
    if (this.y - this.d < 0) {
      this.yVelocity = this.masterYvelocity;
    }
  }

  displayEmoji() {
    
    noStroke();
    image( person, this.x, this.y, this.d, this.d);
  }
  
  displayVirus(){
    noStroke();
    image(covid, this.x, this.y, this.d + 20, this.d + 20);
  }
  
  displayInfected(){
    noStroke();
    fill(200,50,20);
    image(person, this.x, this.y, this.d, this.d);
  }
  
  checkEndGame(){
    if (gameIsOver){
      this.xVelocity = 0;
      this.yVelocity = 0;
      this.masterXVelocity = 0;
      this.masterYVelocity = 0;
    }
  }
  
}

function displayWinner(){
  
  console.log("Winner");
  textSize(40);
  fill(60,50,80);
  strokeWeight(5);
  stroke(0);
  text("You Win, Try To Up The Difficulty :)", 300, 300);
  strokeWeight(0);
}

function mousePressed(){
  //songTwo.play();
  if (collideCircleCircle(mouseX, mouseY, infectedPerson.d, infectedPerson.x, infectedPerson.y, infectedPerson.d)){
    isWinner = true;
    playGame = false;
    backgroundMusic.play();

    
  }
}

