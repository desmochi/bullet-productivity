// Be sure to name any p5.js functions we use in the global so Glitch can recognize them.
// Add to this list as you consult the p5.js documentation for other functions.
/* global createCanvas, colorMode, HSB, width, height, random, background, fill, color, random,
          rect, ellipse, stroke, image, loadImage, collideCircleCircle, collideRectCircle, text, 
          mouseX, mouseY, strokeWeight, line, mouseIsPressed, windowWidth, windowHeight, noStroke, 
          keyCode, push, pop, drawSprites, httpGet, keyIsDown, max, min, textFont, textAlign, CENTER, UP_ARROW, 
          sqrt, noFill, collideRectRect, LEFT_ARROW, frameRate, RIGHT_ARROW, DOWN_ARROW, textSize, round, mouseClicked, 
          keyPressed */

var worktime;
var timespent;
var secondsleft;
var breaktime;
var minutesleft;
var timeleft;
var isRunning;
var buttonStart;
var buttonStop;
var buttonPause;
var isPaused; 
//minutesleft + ":" + secondsleft

function setup(){
    createCanvas(550, 550);
    background(95);
    worktime = 1500;
    breaktime = 300;
    secondsleft = "";
    timespent = 0;
    minutesleft = "";
    timeleft = "";
    isRunning = false;
    isPaused = false;

    buttonStart = createButton('Start');
    buttonStart.position(20,20);
    //buttonStart.mousePressed(buttonStartPressed)
    
    buttonStop = createButton('Stop');
    buttonStop.position(20,60);
    //buttonStop.mousePressed(buttonStopPressed)

    buttonPause = createButton('Pause');
    buttonPause.position(20,100);
    //buttonPause.mousePressed(buttonPausePressed)
    
}

function draw(){
    if (isRunning){
        secondsToMin();
        remainingSeconds();
        buttonStart.mousePressed(buttonStartPressed)
        buttonStop.mousePressed(buttonStopPressed)
        buttonPause.mousePressed(buttonPausePressed)
        displayTime();
    } else if (isPaused) {
        displayTime();
    } else if (!isPaused && !isRunning){
        secondsToMin();
        remainingSeconds();
        displayTime();
    }

}

// calculate # of minutes left 
function secondsToMin() {
    minutesleft = worktime/60;
    minutesleft = Math.floor(minutesleft);
    if (minutesleft < 10){
        minutesleft = "0"+ minutesleft;
    }
    minutesleft = minutesleft + "";
    console.log(minutesleft);
}

// calculate # of seconds left with %
function remainingSeconds(){
    secondsleft = worktime % 60;
    Math.floor(secondsleft);
    if (secondsleft < 10){
        secondsleft = "0"+ secondsleft;
    }
    secondsleft = secondsleft + "";
}

function buttonStartPressed(){
    console.log("starting");
    isRunning = true;
    worktime--;
}

function buttonStopPressed(){
    console.log("stopping");
    isRunning = false;
    isPaused = false;
    worktime = 1500;
}

function buttonPausePressed(){
    console.log("pausing");
    isPaused = true;
    isRunning = false;
}

// display needs to include filler zero for the single digits
function displayTime(){
    timeleft = minutesleft + " : " + secondsleft;
    fill(360, 0, 0);
    textSize(20);
    text(`${timeleft}`, width/2, height/2);
}


