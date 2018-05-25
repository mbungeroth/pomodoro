const timer = document.getElementById('timeLeft');
const start = document.getElementById('sButton');
const reset = document.getElementById('reset');

let cancelled = false;
let timeRemaining = 1500;

start.addEventListener('click', startTimer);
reset.addEventListener('click', resetTime);

function startTimer() {
  cancelled = false;
  decreaseTimer();
}

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

function decreaseTimer() {
  let decreaser = setInterval(function() {
    if (cancelled === false) {
      timeRemaining -= 1;
      timer.textContent = displayTime(timeRemaining);
    } else {
      clearInterval(decreaser);
      return;
    }
  }, 1000);
}


function resetTime() {
  cancelled = true;
  timeRemaining = 1500;
  timer.textContent = displayTime(timeRemaining);
}
