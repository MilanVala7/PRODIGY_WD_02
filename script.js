let startTime, updatedTime, difference, tInterval;
let running = false;
const display = document.getElementById('display');
const startStopButton = document.getElementById('startStop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const laps = document.getElementById('laps');

startStopButton.addEventListener('click', startStop);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', recordLap);

function startStop() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(updateTime, 1);
        startStopButton.innerText = 'Pause';
        running = true;
    } else {
        clearInterval(tInterval);
        startStopButton.innerText = 'Resume';
        running = false;
    }
}

function reset() {
    clearInterval(tInterval);
    running = false;
    difference = 0;
    display.innerText = '00:00:00.000';
    startStopButton.innerText = 'Start';
    laps.innerHTML = '';
}

function recordLap() {
    if (running) {
        const lapTime = display.innerText;
        const li = document.createElement('li');
        li.innerText = lapTime;
        laps.appendChild(li);
    }
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    const milliseconds = difference % 1000;
    
    display.innerText = 
        (hours < 10 ? '0' + hours : hours) + ':' +
        (minutes < 10 ? '0' + minutes : minutes) + ':' +
        (seconds < 10 ? '0' + seconds : seconds) + '.' +
        (milliseconds < 100 ? (milliseconds < 10 ? '00' + milliseconds : '0' + milliseconds) : milliseconds);
}
