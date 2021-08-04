/* global createCanvas, colorMode, HSB, background, height, width, loadImage, 
noStroke, fill, random, ellipse, rect, image, collideLineRect, collideCircleCircle, text, LEFT, 
textAlign, delay, textSize, CENTER, noFill, createSlider, createButton, mouseX, mouseY, collidePointCircle, loadSound, soundFormats*/

var song, songTwo;


let mySound;
function preload() {
  soundFormats('mp3');
  
  mySound = loadSound('assets/doorbell');
}
function setup() 
{ 
window.console.log("at sketch.js setup()")
song = loadSound("Minecraft-death-sound.mp3")
songTwo = loadSound ("kids-cheering-sound-effect.mp3");

window.console.log("song", song)
window.console.log("songTwo", songTwo)

song.play();
  //sound 2 is yay
}


function mousePressed() {
  if (song.isPlaying() ) { // .isPlaying() returns a boolean
    song.stop();
    background(255,0,0);
  } else {
    song.play();
    background(0,255,0);
  }
}
