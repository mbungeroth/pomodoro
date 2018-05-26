const timer = document.getElementById('timeLeft');
const start = document.getElementById('sButton');
const reset = document.getElementById('reset');
const breakText = document.getElementById('breakText');
const nextTime = document.getElementById('nextTime');

let shortBreakTime = 180; //180
let longBreakTime = 900; //900
let workPeriodTime = 1500; //1500
let cancelled = false;
let timeRemaining = workPeriodTime;
let workInterval = 1
let onBreak = false;

start.addEventListener('click', startTimer);
reset.addEventListener('click', resetTimer);

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
  decreaseTimer();
}

function decreaseTimer() {
  const decreaser = setInterval(function() {
    if (cancelled === false) {
      timeRemaining -= 1;
      timer.textContent = displayTime(timeRemaining);

      if (timeRemaining === 0 && workInterval < 4) {
        clearInterval(decreaser);
        workInterval++;
        shortBreak();
      } else if (timeRemaining === 0 && workInterval === 4) {
        clearInterval(decreaser);
        workInterval = 1;
        longBreak();
      }

    } else {
      clearInterval(decreaser);
      return;
    }
  }, 1000);
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
