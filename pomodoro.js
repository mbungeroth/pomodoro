const timer = document.getElementById('timeLeft');
const start = document.getElementById('sButton');
const reset = document.getElementById('reset');
const breakText = document.getElementById('breakText');
const nextBreak = document.getElementById('nextBreak');
const longBreakText = document.getElementById('longBreakText');
const nextLongBreak = document.getElementById('nextLongBreak');
const brand = document.getElementById('reload');
const pause = document.getElementById('pButton');
const shortBreaks = [document.getElementById('min3'),
                     document.getElementById('min4'),
                     document.getElementById('min5')];
const longBreaks = [document.getElementById('min15'),
                    document.getElementById('min20'),
                    document.getElementById('min25'),
                    document.getElementById('min30')];
const audio = new Audio('sounds/ding.wav');


let shortBreakTime = 180;
let longBreakTime = 900;
let workPeriodTime = 1500;
let cancelled = false;
let timeRemaining = workPeriodTime;
let workInterval = 1
let onBreak = false;

start.addEventListener('click', startTimer);
reset.addEventListener('click', resetTimer);
pause.addEventListener('click', pauseTimer);
shortBreaks.forEach(elem => elem.addEventListener('click', changeShortBreak));
longBreaks.forEach(elem => elem.addEventListener('click', changeLongBreak));

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
        audio.play();
        workInterval++;
        takeBreak('short');
      } else if (timeRemaining === 0 && workInterval === 4) {
        clearInterval(decreaser);
        audio.play();
        workInterval = 1;
        takeBreak('long');
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
    start.style.opacity = 1;
    pause.style.opacity = 0;
    start.style.gridRow = 1;
    pause.style.gridRow = 2;
    start.addEventListener('click', startTimer);
    timeRemaining = workPeriodTime;
    timer.textContent = displayTime(timeRemaining);
  }
}


function takeBreak(type) {
  timeRemaining = type === 'short'? shortBreakTime : longBreakTime;
  onBreak = true;
  pause.style.opacity = 0;
  pause.removeEventListener('click', pauseTimer);
  breakText.textContent = "you're on break...";
  nextBreak.textContent = "relax...";
  longBreakText.style.opacity = 0;
  nextLongBreak.style.opacity = 0;

  const breakDecreaser = setInterval(function() {
    timeRemaining -= 1;
    timer.textContent = displayTime(timeRemaining);
    if (timeRemaining === 0) {
      clearInterval(breakDecreaser);
      audio.play();
      breakText.textContent = 'short break length ->';
      nextBreak.textContent = displayTime(shortBreakTime);
      longBreakText.style.opacity = 1;
      nextLongBreak.style.opacity = 1;
      timeRemaining = workPeriodTime;
      pause.addEventListener('click', pauseTimer);
      startTimer();
    }
  }, 1000);
}


function changeShortBreak() {
  shortBreakTime = Number(event.target.value) * 60;
  if (!onBreak) {
    nextBreak.textContent = displayTime(shortBreakTime);
  }
}


function changeLongBreak() {
  longBreakTime = Number(event.target.value) * 60;
  if (!onBreak) {
    nextLongBreak.textContent = displayTime(longBreakTime);
  }
}
