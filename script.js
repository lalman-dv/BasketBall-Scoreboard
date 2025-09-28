let homeScore = 0;
let guestScore = 0;

const homeScoreNum = document.getElementById("home-score");
const guestScoreNum = document.getElementById("guest-score");

function addOne() {
  homeScore += 1;
  homeScoreNum.innerHTML = homeScore;
}

function addTwo() {
  homeScore += 2;
  homeScoreNum.innerHTML = homeScore;
}

function addThree() {
  homeScore += 3;
  homeScoreNum.innerHTML = homeScore;
}

function reduce() {
  homeScore -= 1;
  homeScoreNum.innerHTML = homeScore;
}

//guest scores
function gAddOne() {
  guestScore += 1;
  guestScoreNum.innerHTML = guestScore;
}

function gAddTwo() {
  guestScore += 2;
  guestScoreNum.innerHTML = guestScore;
}

function gAddThree() {
  guestScore += 3;
  guestScoreNum.innerHTML = guestScore;
}

function gReduce() {
  guestScore -= 1;
  guestScoreNum.innerHTML = guestScore;
}

let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;

function startTimer() {
  // Only start if not already running
  if (!timerInterval) {
    // Record the current time minus any previously elapsed time
    startTime = Date.now() - elapsedTime;

    // Start a repeating task every 100 milliseconds
    timerInterval = setInterval(() => {
      // Calculate how much time has passed
      elapsedTime = Date.now() - startTime;

      // Update the display
      updateDisplay();
    }, 100);
  }
}
function updateDisplay() {
  const totalSeconds = Math.floor(elapsedTime / 1000);
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(
    2,
    "0"
  );
  const seconds = String(totalSeconds % 60).padStart(2, "0");

  document.getElementById("timer").innerText = `${hours}:${minutes}:${seconds}`;
}
