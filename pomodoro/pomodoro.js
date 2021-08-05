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
var breakTimerIndex;
var img;

function preload() {
    img = loadImage('clock.jpg');
}
function setup(){
    createCanvas(300, 300);
    colorMode(HSB, 360, 100, 100);

    workTime = 10;
    breakTime = 5;
    secondsLeft = "";
    timespent = 0;
    minutesLeft = "";
    timeLeft = "";
    isRunning = false;
    isPaused = false;
    breakTimerIndex = false;
    workTimerIndex = true;
    firstTimer = true;

    time = workTime;
}

function draw(){
    displayBackground();

    if(firstTimer) {
        time = workTime;
        firstTimer = false;
        breakTimerNext = true;
    }
    else if(timeLeft == "00 : 00" && breakTimerNext == true) {
        console.log("switched to break timer");
        breakTimer();
        breakTimerNext = false;
    }
    else if(timeLeft == "00 : 00" && workTimerNext == true) {
        console.log("switched to work timer")
        workTimer();
        workTimerNext = false;
    }

    secondsToMin();
    remainingSeconds();
    displayTime();
}

// calculate # of minutes left 
function secondsToMin() {
    minutesLeft = time/60;
    minutesLeft = Math.floor(minutesLeft);
    if (minutesLeft < 10){
        minutesLeft = "0"+ minutesLeft;
    }
    minutesLeft = minutesLeft + "";
}

// calculate # of seconds left with %
function remainingSeconds(){
    secondsLeft = time % 60;
    Math.floor(secondsLeft);
    if (secondsLeft < 10){
        secondsLeft = "0" + secondsLeft;
    }
    secondsLeft = secondsLeft + "";
}

function start() {
    if(!startButtonRunning)
    {
        timerInterval = setInterval(() => time--, 1000);
    }
    startButtonRunning = true;
}

function pause(){
    clearInterval(timerInterval);
    startButtonRunning = false;
}

// display needs to include filler zero for the single digits
function displayTime(){
    if(breakTimerNext == false) {
        push();
        fill(210, 100, 100);
        textSize(30);
        textFont("Helvetica");
        text("Break Time!", width/2-70, height/5);
        pop();
    }
    else {
        push();
        fill(210, 100, 100);
        textSize(30);
        textFont("Helvetica");
        text("Work Time!", width/2-70, height/5);
        pop();
    }
    timeLeft = minutesLeft + " : " + secondsLeft;
    fill(360, 0, 0);
    textSize(30);
    timeText = text(`${timeLeft}`, width/2-40, height/3);
}

function displayBackground() {
    background(360);

    image(img, width/2-40, height/2-20, 80, 80);

    buttonStart = createButton('Start');
    buttonStart.position(width/3-20, height/10*8);
    buttonStart.size(60, 30);
    buttonStart.mousePressed(start)

    buttonPause = createButton('Pause');
    buttonPause.position(width/3*2-20, height/10*8);
    buttonPause.size(60, 30);
    buttonPause.mousePressed(pause)
}

function workTimer() {
    time = workTime;
    breakTimerNext = true;
}

function breakTimer() {
    time = breakTime;
    workTimerNext = true;
}