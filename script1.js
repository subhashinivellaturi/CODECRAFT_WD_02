document.addEventListener("DOMContentLoaded", function () {
    // Variables
    let minutes = 0, seconds = 0, milliseconds = 0;
    let timer;
    let isRunning = false;

    // Elements
    const startPauseBtn = document.getElementById("startPause");
    const resetBtn = document.getElementById("reset");
    const lapBtn = document.getElementById("lap");
    const lapList = document.getElementById("laps");

    const minutesDisplay = document.getElementById("minutes");
    const secondsDisplay = document.getElementById("seconds");
    const millisecondsDisplay = document.getElementById("milliseconds");

    // Start/Pause Function
    function startPause() {
        if (isRunning) {
            clearInterval(timer);
            startPauseBtn.textContent = "Start";
        } else {
            timer = setInterval(updateTime, 10);
            startPauseBtn.textContent = "Pause";
        }
        isRunning = !isRunning;
    }

    // Reset Function
    function reset() {
        clearInterval(timer);
        minutes = seconds = milliseconds = 0;
        isRunning = false;
        updateDisplay();
        startPauseBtn.textContent = "Start";
        lapList.innerHTML = ""; // Clear laps
    }

    // Lap Function
    function recordLap() {
        if (isRunning) {
            const lapTime = `${formatTime(minutes)}:${formatTime(seconds)}:${formatTime(milliseconds)}`;
            const li = document.createElement("li");
            li.textContent = `Lap: ${lapTime}`;
            lapList.appendChild(li);
        }
    }

    // Update Time Function
    function updateTime() {
        milliseconds++;
        if (milliseconds >= 100) {
            milliseconds = 0;
            seconds++;
        }
        if (seconds >= 60) {
            seconds = 0;
            minutes++;
        }
        updateDisplay();
    }

    // Update Stopwatch Display
    function updateDisplay() {
        minutesDisplay.textContent = formatTime(minutes);
        secondsDisplay.textContent = formatTime(seconds);
        millisecondsDisplay.textContent = formatTime(milliseconds);
    }

    // Format Time Function
    function formatTime(time) {
        return time < 10 ? `0${time}` : time;
    }

    // Event Listeners
    startPauseBtn.addEventListener("click", startPause);
    resetBtn.addEventListener("click", reset);
    lapBtn.addEventListener("click", recordLap);
});
