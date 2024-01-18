const timeDisplay = document.getElementById("time");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const resetButton = document.getElementById("reset");
const lapList = document.getElementById("lap-list");

let stopwatch = {
  time: 0,
  lap: 0,
  started: false,
  timer: null,
  interval: 1000,
  formatTime: function() {
    let hrs = Math.floor(this.time / 3600000);
    let mins = Math.floor((this.time % 3600000) / 60000);
    let secs = Math.floor((this.time % 60000) / 1000);
    let ms = this.time % 1000;
    return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}.${ms.toString().padStart(3, "0")}`;
  },
  start: function() {
    if (!this.started) {
      this.started = true;
      this.timer = setInterval(() => {
        this.time += this.interval;
        timeDisplay.textContent = this.formatTime();
      }, this.interval);
    }
  },
  stop: function() {
    if (this.started) {
      this.started = false;
      clearInterval(this.timer);
    }
  },
  reset: function() {
    this.time = 0;
    this.lap = 0;
    this.started = false;
    timeDisplay.textContent = this.formatTime();
    lapList.innerHTML = "";
  },
  lap: function() {
    if (this.started) {
      let lapTime = this.formatTime();
      let li = document.createElement("li");
      li.textContent = `${this.lap}. ${lapTime}`;
      lapList.appendChild(li);
      this.lap++;
    }
  }
};

startButton.addEventListener("click", () => stopwatch.start());
stopButton.addEventListener("click", () => stopwatch.stop());
resetButton.addEventListener("click", () => stopwatch.reset());

document.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    event.preventDefault();
    if (stopwatch.started) {
      stopwatch.stop();
    } else {
      stopwatch.start();
    }
  } else if (event.code === "Enter") {
    event.preventDefault();
    stopwatch.reset();
  }
});