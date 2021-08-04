// Be sure to name any p5.js functions we use in the global so Glitch can recognize them.
// Add to this list as you consult the p5.js documentation for other functions.
/* global createCanvas, colorMode, HSB, width, height, random, background, fill, color, random,
          rect, ellipse, stroke, image, loadImage, collideCircleCircle, collideRectCircle, text, 
          mouseX, mouseY, strokeWeight, line, mouseIsPressed, windowWidth, windowHeight, noStroke, 
          keyCode, push, pop, drawSprites, httpGet, keyIsDown, max, min, textFont, textAlign, CENTER, UP_ARROW, 
          sqrt, noFill, collideRectRect, LEFT_ARROW, frameRate, RIGHT_ARROW, DOWN_ARROW, textSize, round, mouseClicked, 
          keyPressed */

var updatedWorkSessionDuration;
var updatedBreakSessionDuration;

var workDurationInput = document.querySelector('#input-work-duration');
var breakDurationInput = document.querySelector('#input-break-duration');

workDurationInput.value = '25';
breakDurationInput.value = '5';
var isClockRunning = false;
var isClockStopped = true;
var type = 'Work'

//In seconds
var workSessionTimer = 1500;
var currentTimeLeftInSession = 1500;
var breakSessionDuration = 300;
var timeSpentInCurrentSession = 0;

const pomodoroTimer = document.querySelector('#pomodoro-timer');

const startButton = document.querySelector('#pomodoro-start');
const stopButton = document.querySelector('#pomdoro-stop');

var currentTaskLabel = document.querySelector('#pomodoro-clock-task')

startButton.addEventListener('click', () => {
    toggleClock();
})

stopButton.addEventListener('click', () => {
    toggleClock(true);
})

workDurationInput.addEventListener('input', () => {
    updatedWorkSessionDuration = minuteToSeconds(workDurationInput.value);
})

breakDurationInput.addEventListener('input', () => {
    updatedBreakWorkSessionDuration = minuteTOSeconds(breakDurationInput.value);
})
const toggleClock = (reset) => {
    console.log("hello start");
    togglePlayPauseIcon(reset);

    if(reset) {
        //Stop timer
        stopClock()
    }
    else {
        if(isClockStopped) {
            setUpdatedTimers();
            isClockStopped = false;
        }

        if(clockIsRunning == true) {
            //Stops the clock from decreasing time when paused
            clearInterval(clockTimer);

            //Pause timer
            isClockRunning = false;
        }
        else {
            //Start timer
            isClockRunning = true;

            //Decrease time left
            clockTimer = setInterval(() => {
                stepDown();
                displayCurrentTimeLeftInSession();
                progressBar.set(calculateSessionProgress())
            }, 1000)
        }
        showStopIcon();
    }
}

const displayCurrentTimeLeftInSession = () => {
    const secondsLeft = currentTimeLeftInSession;
    var result = '';
    const seconds = secondsLeft % 60;
    const minutes = parseInt(secondsLeft / 60) % 60;
    var hours = parseInt(secondsLeft / 3600);

    function addLeadingZeroes(time) {
        return time < 10 ? `0${time}` : time;
    }
    if(hours > 0) {
        result += `${hours}:`;
    }
    result += `${addLeadingZeroes(minutes)}:${addLeadingZeroes(seconds)}`;
    progressBar.text.innerText = result.toString();
}

const stopClock = () => {
    setUpdatedTimers();
    displaySessionLog(type);
    clearInterval(clockTimer);
    isClockRunning = false;
    isClockStopped = true;
    timeSpentInCurrentSession = 0;
    currentTimeLeftInSession = workSessionDuration;
    displayCurrentTimeLeftInSession();
    type = 'Work';
}

const stepDown = () => {
    if(currentTimeLeftInSession > 0) {
        currentTimeLeftInSession--;
        timeSpentInCurrentSession++;
    }
    else if (currentTimeLeftInSession == 0) {
        timeSpentInCurrentSession = 0;
        if(type == 'Work') {
            currentTimeLeftInSession = breakSessionDuration;
            displaySessionLog('Work');
            type = 'Break';

            currentTaskLabel.value = 'Break';
            currentTaskLabel.disabled = true;
        }
        else {
            currentTimeLeftInSession = workSessionDuration;
            type = 'Work';

            if(CurrentLabel.value == 'Break') {
                currentTaskLabel.value = workSessionLabel;
            }
            currentTaskLabel.disabled = false;
            displaySessionLog('Break');
        }
    }
    displayCurrentTimeLeftInSession();
}

const displaySessionLog = (type) => {
    const sesionsList = document.querySelector('#pomodoro-sessions');
    const li = document.createElement('li');
    if(type == 'Work') {
        sessionLabel = currentTaskLabel.value ? currentTaskLabel.value : 'Work';
        workSessionLabel = sessionLabel;
    }
    else {
        sessionLabel = 'Break';
    }
    var elapsedTime = parseInt(timeSpentInCurrentSession / 60);
    elapsedTime = elapsedTime > 0 ? elapsedTime : '< 1';

    const text = document.createTextMode(`${sessionLabel} : ${elapsedTime} min`)
    li.appendChild(text);
    sessionsList.appendChild(li);
}

const minuteToSeconds = (mihns) => {
    return mins * 60;
}

const setUpdatedTimers = () => {
    if(type == 'Work') {
        currentTimeLeftInSession = updatedWorkSessionDuration ? updatedWorkSessionDuration : workSessionDuration;
        workSessionDuration = currentTimeLeftInSession;
    }
    else {
        currentTimeLeftInSession = updatedBreakSessionDuration ? updatedBreakSessionDuration : breakSessionDuration;
        breakSessionDuration = currentTimeLeftInSession;
    }
}

const togglePlayPauseIcon = (reset) => {
    const playIcon = document.querySelector('#play-icon');
    const pauseIcon = document.querySelector('pause-icon');

    if(reset) {
        if(playIcon.classList.contains('hidden')) {
            playIcon.classList.remove('hidden');
        }
        if(!pauseIcon.classList.contains('hidden')) {
            pauseIcon.classList.add('hidden');
        }
        else {
            playIcon.classList.toggle('hidden');
            pauseIcon.classList.toggle('hidden');
        }
    }
}

const showStopIcon = () => {
    const stopButton = document.querySelector('#pomodoro-stop');
    stopButton.classList.remove('hidden');
}

const progressBar = new ProgressBar.Circle('#pomodoro-timer', {
    strokeWidth: 2,
    text: {
        value: '25:00',
    },
    trailColor: '#f4f4f4',
})

const calculateSessionProgress = () => {
    const sessionDuration = type == 'Work' ? workSessionDuration : breakSessionDuration;
    return (timeSpentInCurrentSession / sessionDuration) * 10;
}