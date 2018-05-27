const timer = document.getElementById('timeLeft');
const start = document.getElementById('sButton');
const reset = document.getElementById('reset');
const breakText = document.getElementById('breakText');
const nextTime = document.getElementById('nextTime');
const workSet = document.getElementById('workSet');
const breakSet = document.getElementById('breakSet');
const brand = document.getElementById('reload');
const pause = document.getElementById('pButton');

let shortBreakTime = 180;
let longBreakTime = 900;
let workPeriodTime = 1500;
let cancelled = false;
let timeRemaining = workPeriodTime;
let workInterval = 1
let onBreak = false;

start.addEventListener('click', startTimer);
reset.addEventListener('click', resetTimer);
workSet.addEventListener('click', changeWorkTime);
breakSet.addEventListener('click', changeBreakTime);
pause.addEventListener('click', pauseTimer);

function displayTime(timeRemaining) {
  let minutes = Math.floor(timeRemaining / 60);
  let seconds = timeRemaining % 60;

  if (minutes < 10) {
    minutes = 0 + String(minutes);
  }
  if (seconds < 10) {
    seconds = 0 + String(seconds);
  }

  return `${minutes}:${seconds}`;
}

function startTimer() {
  cancelled = false;
  start.style.opacity = 0;
  pause.style.opacity = 1;
  start.style.gridRow = 2;
  pause.style.gridRow = 1;
  start.removeEventListener('click', startTimer);
  decreaseTimer();
}

function decreaseTimer() {
  const decreaser = setInterval(function() {
    if (cancelled === false) {
      timeRemaining -= 1;
      timer.textContent = displayTime(timeRemaining);

      if (timeRemaining === 0 && workInterval < 4) {
        clearInterval(decreaser);
        alert('Stop working! Take a break!');
        workInterval++;
        shortBreak();
      } else if (timeRemaining === 0 && workInterval === 4) {
        clearInterval(decreaser);
        alert('Stop working! Take a break!');
        workInterval = 1;
        longBreak();
      }

    } else {
      clearInterval(decreaser);
      return;
    }
  }, 1000);
}

function pauseTimer() {
  cancelled = true;
  start.style.opacity = 1;
  pause.style.opacity = 0;
  start.style.gridRow = 1;
  pause.style.gridRow = 2;
  start.addEventListener('click', startTimer);
}

function resetTimer() {
  if (onBreak === false) {
    cancelled = true;
    timeRemaining = workPeriodTime;
    timer.textContent = displayTime(timeRemaining);
  }
}

function shortBreak() {
  onBreak = true;
  pause.style.opacity = 0;
  breakText.textContent = 'next work session ->';
  nextTime.textContent = displayTime(workPeriodTime);
  timeRemaining = shortBreakTime;

  const breakDecreaser = setInterval(function() {
    timeRemaining -= 1;
    timer.textContent = displayTime(timeRemaining);
    if (timeRemaining === 0) {
      clearInterval(breakDecreaser);
      breakText.textContent = 'next break ->';
      if (workInterval < 4) {
        nextTime.textContent = displayTime(shortBreakTime);
      } else {
        nextTime.textContent = displayTime(longBreakTime);
      }
      timeRemaining = workPeriodTime;
      startTimer();
    }
  }, 1000);
}

function longBreak() {
  onBreak = true;
  breakText.textContent = 'next work session ->';
  nextTime.textContent = displayTime(workPeriodTime);
  timeRemaining = longBreakTime;

  const longBreakDecreaser = setInterval(function() {
    timeRemaining -= 1;
    timer.textContent = displayTime(timeRemaining);
    if (timeRemaining === 0) {
      clearInterval(longBreakDecreaser);
      breakText.textContent = 'next break ->';
      nextTime.textContent = displayTime(shortBreakTime);
      timeRemaining = workPeriodTime;
      startTimer();
    }
  }, 1000);
}

function changeWorkTime() {
  let newWorkTime = parseInt(prompt(`Your current working time is ` +
                             `${displayTime(workPeriodTime)}. ` +
                             'Please enter a new number of minutes ' +
                             'for your work periods.'));
  if (newWorkTime < 2) {
    alert('That work period is too short.');
  } else if (newWorkTime > 45) {
    alert('That work period is too long.');
  } else if (isNaN(newWorkTime)) {
    alert('You need to chose an integer for the number of minutes.');
  }

  if (newWorkTime >= 2 && newWorkTime <= 45) {
    workPeriodTime = newWorkTime * 60;
    timeRemaining = workPeriodTime;
    timer.textContent = displayTime(timeRemaining);
  }
}

function changeBreakTime() {
  let newBreakTime = parseInt(prompt(`Your current short break time is ` +
                             `${displayTime(shortBreakTime)}. ` +
                             'Please enter a new number of minutes ' +
                             'for your short breaks.'));
  if (newBreakTime < 1) {
    alert('That break length is too short.');
  } else if (newBreakTime > 15) {
    alert('That break length is too long.');
  } else if (isNaN(newBreakTime)) {
    alert('You need to chose an integer for the number of minutes.');
  }

  if (newBreakTime >= 1 && newBreakTime <= 15) {
    shortBreakTime = newBreakTime * 60;
    nextTime.textContent = displayTime(shortBreakTime);
  }

  let newLongBreakTime = parseInt(prompt(`Your current long break time is ` +
                             `${displayTime(longBreakTime)}. ` +
                             'Please enter a new number of minutes ' +
                             'for your long breaks.'));
  if (newLongBreakTime < 3) {
    alert('That break length is too short.');
  } else if (newLongBreakTime > 30) {
    alert('That break length is too long.');
  } else if (isNaN(newLongBreakTime)) {
    alert('You need to chose an integer for the number of minutes.');
  }

  if (newLongBreakTime >= 3 && newLongBreakTime <= 30) {
    longBreakTime = newBreakTime * 60;
  }
}
