// Be sure to name any p5.js functions we use in the global so Glitch can recognize them.
// Add to this list as you consult the p5.js documentation for other functions.
/* global createCanvas, colorMode, HSB, width, height, random, background, fill, color, random,
          rect, ellipse, stroke, image, loadImage, collideCircleCircle, collideRectCircle, text, 
          mouseX, mouseY, strokeWeight, line, mouseIsPressed, windowWidth, windowHeight, noStroke, 
          keyCode, push, pop, drawSprites, httpGet, keyIsDown, max, min, textFont, textAlign, CENTER, UP_ARROW, 
          sqrt, noFill, collideRectRect, LEFT_ARROW, frameRate, RIGHT_ARROW, DOWN_ARROW, textSize, round, mouseClicked, 
          keyPressed */

var workTime;
var timeSpent;
var secondsLeft;
var breakTime;
var minutesLeft;
var timeLeft;
var isRunning;
var buttonStart;
var buttonStop;
var buttonPause;
var isPaused; 
var timeText = "";
var timerInterval;
var startButtonRunning;

function setup(){
    createCanvas(550, 550);

    workTime = 1500;
    breakTime = 300;
    secondsLeft = "";
    timespent = 0;
    minutesLeft = "";
    timeLeft = "";
    isRunning = false;
    isPaused = false;
}

function draw(){
    displayBackground();

    secondsToMin();
    remainingSeconds();
    displayTime();
}

// calculate # of minutes left 
function secondsToMin() {
    minutesLeft = workTime/60;
    minutesLeft = Math.floor(minutesLeft);
    if (minutesLeft < 10){
        minutesLeft = "0"+ minutesLeft;
    }
    minutesLeft = minutesLeft + "";
    console.log(minutesLeft);
}

// calculate # of seconds left with %
function remainingSeconds(){
    secondsLeft = workTime % 60;
    Math.floor(secondsLeft);
    if (secondsLeft < 10){
        secondsLeft = "0" + secondsLeft;
    }
    secondsLeft = secondsLeft + "";
}

function start() {
    if(!startButtonRunning)
    {
        timerInterval = setInterval(() => workTime--, 1000);
    }
    startButtonRunning = true;
}

function reset() {
    workTime = 1500;
    pause();
}

function pause(){
    clearInterval(timerInterval);
    startButtonRunning = false;
}

// display needs to include filler zero for the single digits
function displayTime(){
    timeLeft = minutesLeft + " : " + secondsLeft;
    fill(360, 0, 0);
    textSize(20);
    timeText = text(`${timeLeft}`, width/2, height/2);
}

function displayBackground() {
    background(95);

    buttonStart = createButton('Start');
    buttonStart.position(20,20);
    buttonStart.mousePressed(start)
    
    buttonStop = createButton('Reset');
    buttonStop.position(20,60);
    buttonStop.mousePressed(reset)

    buttonPause = createButton('Pause');
    buttonPause.position(20,100);
    buttonPause.mousePressed(pause)
}
