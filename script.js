let timerId = null;
let remainingTime = 5;
let cycleCount = 0;

function startTimer() {
    if (timerId) return; // Prevents multiple timers from running simultaneously
    timerId = setInterval(tick, 1000);
}

function pauseTimer() {
    clearInterval(timerId);
    timerId = null;
}

function resumeTimer() {
    if (!timerId) {
        timerId = setInterval(tick, 1000);
    }
}

function stopTimer() {
    clearInterval(timerId);
    timerId = null;
    remainingTime = 5;
    cycleCount = 0;
    updateDisplay(remainingTime); // Reset display to initial time
    updateImage(1); // Reset to the first image
    alert("Timer stopped and reset.");
}

function tick() {
    updateDisplay(--remainingTime);

    if (remainingTime <= 3 && remainingTime > 0) {
        playBeep();
    }

    if (remainingTime <= 0) {
        cycleCount++;
        updateImage(cycleCount + 1); // Update the image for the new cycle
        addHistoryEntry(cycleCount, new Date().toLocaleTimeString()); // Add history entry

        if (cycleCount >= 10) {
            clearInterval(timerId);
            timerId = null;
            alert("Completed 10 cycles of 5 seconds each!");
            return;
        }
        remainingTime = 5;
        updateDisplay(remainingTime);
    }
}

function updateDisplay(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    document.getElementById('time').textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function playBeep() {
    const beepSound = document.getElementById('beep-sound');
    beepSound.currentTime = 0;
    beepSound.play();
}

function updateImage(cycleNumber) {
    const imgElement = document.getElementById('cycle-image');
    imgElement.src = `images/image${cycleNumber}.jpg`; // Assuming image names follow this pattern
}
function addHistoryEntry(cycleNumber, time) {
    const tableBody = document.getElementById('history-table').getElementsByTagName('tbody')[0];
    const newRow = tableBody.insertRow();
    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);
    cell1.textContent = cycleNumber;
    cell2.textContent = time;
}
