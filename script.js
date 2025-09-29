let homeScore = 0;
let guestScore = 0;
let homeFouls = 0;
let guestFouls = 0;
const foulLimit = 5;

let countdownTime = 0;
let remainingTime = 0;
let timerInterval = null;
let isPaused = false;

const homeScoreNum = document.getElementById("home-score");
const guestScoreNum = document.getElementById("guest-score");
const timerDisplay = document.getElementById("timer");

const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const resetBtn = document.getElementById("reset");

// Score update function
function updateScore(team, amount) {
  if (team === "home") {
    homeScore = Math.max(0, homeScore + amount);
    homeScoreNum.textContent = homeScore;
  } else if (team === "guest") {
    guestScore = Math.max(0, guestScore + amount);
    guestScoreNum.textContent = guestScore;
  }
}

// Foul tracking
function addFoul(team) {
  if (team === "home" && homeFouls < foulLimit) {
    homeFouls++;
    updateScore("home", -1);
    if (homeFouls >= foulLimit) disableFoul("home");
  } else if (team === "guest" && guestFouls < foulLimit) {
    guestFouls++;
    updateScore("guest", -1);
    if (guestFouls >= foulLimit) disableFoul("guest");
  }
}

function disableFoul(team) {
  const btn =
    team === "home"
      ? document.getElementById("homeReduce")
      : document.getElementById("guestReduce");
  btn.disabled = true;
  btn.textContent = "Foul Limit";
  btn.style.boxShadow = "0 0 15px red";
}

// Timer display formatter
function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(
    2,
    "0"
  );
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
}

// Start timer with user input
function startTimer() {
  if (timerInterval) return;

  const minutes = prompt("⏱️ Enter set duration in minutes:");
  if (!minutes || isNaN(minutes) || minutes <= 0) return;

  countdownTime = minutes * 60 * 1000;
  remainingTime = countdownTime;
  updateDisplay();

  timerInterval = setInterval(() => {
    if (!isPaused) {
      remainingTime -= 1000;
      updateDisplay();

      if (remainingTime <= 0) {
        clearInterval(timerInterval);
        timerInterval = null;
        timerDisplay.textContent = "00:00:00";
        alert("⏰ Time's up!");
      }
    }
  }, 1000);
}

// Pause/Resume toggle
function togglePause() {
  if (!timerInterval) return;
  isPaused = !isPaused;
  pauseBtn.textContent = isPaused ? "Resume" : "Pause";
}

// Reset everything
function resetGame() {
  homeScore = 0;
  guestScore = 0;
  homeFouls = 0;
  guestFouls = 0;
  remainingTime = 0;
  clearInterval(timerInterval);
  timerInterval = null;
  isPaused = false;

  homeScoreNum.textContent = "0";
  guestScoreNum.textContent = "0";
  timerDisplay.textContent = "00:00:00";

  const homeFoulBtn = document.getElementById("homeReduce");
  const guestFoulBtn = document.getElementById("guestReduce");

  homeFoulBtn.disabled = false;
  guestFoulBtn.disabled = false;
  homeFoulBtn.textContent = "Foul (-1)";
  guestFoulBtn.textContent = "Foul (-1)";
  homeFoulBtn.style.boxShadow = "0 0 15px #f88533";
  guestFoulBtn.style.boxShadow = "0 0 15px #f88533";

  pauseBtn.textContent = "Pause";
}

// Update timer display
function updateDisplay() {
  timerDisplay.textContent = formatTime(remainingTime);
}

// Event listeners
document
  .getElementById("homeOne")
  .addEventListener("click", () => updateScore("home", 1));
document
  .getElementById("homeTwo")
  .addEventListener("click", () => updateScore("home", 2));
document
  .getElementById("homeThree")
  .addEventListener("click", () => updateScore("home", 3));
document
  .getElementById("homeReduce")
  .addEventListener("click", () => addFoul("home"));

document
  .getElementById("guestOne")
  .addEventListener("click", () => updateScore("guest", 1));
document
  .getElementById("guestTwo")
  .addEventListener("click", () => updateScore("guest", 2));
document
  .getElementById("guestThree")
  .addEventListener("click", () => updateScore("guest", 3));
document
  .getElementById("guestReduce")
  .addEventListener("click", () => addFoul("guest"));

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", togglePause);
resetBtn.addEventListener("click", resetGame);
