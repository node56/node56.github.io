// script.js
let startTime = 0;
let timeLeft = 0;
let score = [0,0];

// Load from local storage
if (localStorage.getItem('startTime')) {
    startTime = localStorage.getItem('startTime');
}

// Function to start the half
function startHalf() {
    startTime = Date.now();
    localStorage.setItem('startTime', startTime);
    updateDisplay();
}

function updateDisplay(){
    // Update time left
    setInterval(function() {
        if (startTime) {
            timeLeft = calculateTimeLeft();
            document.getElementById('time-left').textContent = formatTime(timeLeft);
        }
    }, 1000);
    
    // Update score
    document.getElementById('score').textContent = score[0] + " - " + score[1];
}

// Calculate time left
function calculateTimeLeft() {
    const currentTime = Date.now();
    const elapsedTime = currentTime - startTime;
    // Assuming 45 minutes for half
    return 45*60*1000 - elapsedTime;
}

// Format time
function formatTime(ms) {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor(ms / 1000) % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Function to add goal
function addGoal() {
    score[0]++;
    updateDisplay();
}

// Function to remove goal
function removeGoal() {
    score[0]--;
    updateDisplay();
}

// Function to update the display
function updateDisplay() {
    // Update time left
    if (startTime) {
        timeLeft = calculateTimeLeft();
        document.getElementById('time-left').textContent = formatTime(timeLeft);
    }
    
    // Update score
    document.getElementById('score').textContent = score[0] + " - " + score[1];
}

// Load from local storage
if (localStorage.getItem('startTime')) {
    startTime = parseInt(localStorage.getItem('startTime'));
}

// Function to start the half
function startHalf() {
    startTime = Date.now();
    localStorage.setItem('startTime', startTime);
    updateDisplay();
}

// Calculate time left
function calculateTimeLeft() {
    const currentTime = Date.now();
    const elapsedTime = currentTime - startTime;
    // Assuming 45 minutes for half
    const timeRemaining = 45*60*1000 - elapsedTime;

    // Check for negative time remaining
    return timeRemaining > 0 ? timeRemaining : 0;
}

// Format time
function formatTime(ms) {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor(ms / 1000) % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Function to add goal
function addGoal(team) {
    if(team == 0){
        score[0]++;
    } else {
        score[1]++;
    }
    updateDisplay();
}

// Function to remove goal
function removeGoal(team) {
    if(team == 0){
        score[0] = Math.max(0, score[0] - 1);
    } else {
        score[1] = Math.max(0, score[1] - 1);
    }
    updateDisplay();
}

// Event listeners
document.getElementById('start-half').addEventListener('click', startHalf);
document.getElementById('goal').addEventListener('click', function(){ addGoal(0); });
document.getElementById('remove-goal').addEventListener('click', function(){ removeGoal(0); });
document.getElementById('goal-2').addEventListener('click', function(){ addGoal(1); });
document.getElementById('remove-goal-2').addEventListener('click', function(){ removeGoal(1); });

updateDisplay();
setInterval(function() {
    if (startTime) {
        timeLeft = calculateTimeLeft();
        document.getElementById('time-left').textContent = formatTime(timeLeft);
    }
}, 1000);
