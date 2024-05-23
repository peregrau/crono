let timerId = null;
let TempsSerie = 30;
// let remainingTime = 30;
let remainingTime = TempsSerie;
let cycleCount = 0;
let totalTimeElapsed = 0; // Total elapsed time in seconds

const music = document.getElementById('background-music');		
const beepSound = document.getElementById('beep-sound');


function startTimer() {
    if (timerId) return; // Prevents multiple timers from running simultaneously
	
//	const music = document.getElementById('background-music');
    music.play().catch(error => {console.error("Failed to start the background music:", error);});
	
    timerId = setInterval(tick, 1000);
}

function pauseTimer() {
    clearInterval(timerId);
    timerId = null;
//	const music = document.getElementById('background-music');
    music.pause();
}

function resumeTimer() {
    if (!timerId) {
        timerId = setInterval(tick, 1000);
    }
	music.play();
}

function stopTimer() {
    clearInterval(timerId);
    timerId = null;
    // remainingTime = 30;
    remainingTime = TempsSerie;	
    cycleCount = 0;
    totalTimeElapsed = 0; // Reset total time
    updateDisplay(remainingTime); // Reset display to initial time
    updateImage(1); // Reset to the first image
    alert("Timer stopped and reset.");
    updateTable('-', '-', formatTime(0)); // Reset the table
	
	
//	const music = document.getElementById('background-music');
        music.pause();
        music.currentTime = 0; // Reset the music to the start
}

function tick() {
    updateDisplay(--remainingTime);

    if (remainingTime <= 3 && remainingTime > 0) 
	{
        playBeep();
	
    }

    if (remainingTime <= 0) {
        cycleCount++;
        // totalTimeElapsed += 30; // Assuming each cycle lasts exactly 30 seconds
        totalTimeElapsed += TempsSerie; // Assuming each cycle lasts exactly 30 seconds		
        updateImage(cycleCount + 1); // Update the image for the new cycle
        updateTable(cycleCount, new Date().toLocaleTimeString(), formatTime(totalTimeElapsed)); // Update the table

        if (cycleCount >= 61) {
            clearInterval(timerId);
            timerId = null;
            alert("Completed 60 cycles of 30 seconds each!");
            return;
        }
        remainingTime = 30;
        remainingTime = TempsSerie;		
        updateDisplay(remainingTime);
    }
}

function updateDisplay(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    document.getElementById('time').textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function playBeep() 
{
//	const music = document.getElementById('background-music');		
	music.volume = 0.0;
	music.pause();
		
//    const beepSound = document.getElementById('beep-sound');
	beepSound.volume = 1;
    beepSound.currentTime = 0;
    beepSound.play();
	
	music.volume = 1.0;	
	music.play();
	
}

function updateImage(cycleNumber) {
    const imgElement = document.getElementById('cycle-image');
    imgElement.src = `images/image${cycleNumber}.jpg`; // Assuming image names follow this pattern
}

function updateTable(cycleNumber, time, totalElapsed) {
    document.getElementById('cycle-cell').textContent = cycleNumber;
    document.getElementById('time-cell').textContent = time;
    document.getElementById('total-time-cell').textContent = totalElapsed;
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}
