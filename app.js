// app.js
const forwardTaskBtn = document.getElementById('forwardTaskBtn');
const backwardTaskBtn = document.getElementById('backwardTaskBtn');
const digitControls = document.getElementById('digitControls');
const wrongBtn = document.getElementById('wrongBtn');
const digitInput = document.getElementById('digitCount');
const digitDisplay = document.getElementById('digitDisplay');
const forwardScoreDisplay = document.getElementById('forwardScore');
const backwardScoreDisplay = document.getElementById('backwardScore');
const participantIdInput = document.getElementById('participantIdInput');
const groupIdInput = document.getElementById('groupIdInput');
const participantIdDisplay = document.getElementById('participantId');
const groupIdDisplay = document.getElementById('groupId');

let participant = {
    id: 0,
    groupId: ''
}

const scores = {
    forward: 0,
    backward: 0
}
let currentTask = '';

participantIdInput.addEventListener('input', function () {
    participant.id = this.value;
    participantIdDisplay.textContent = participant.id;
})

groupIdInput.addEventListener('input', function () {
    participant.groupId = this.value;
    groupIdDisplay.textContent = participant.groupId;
})

function generateDigits() {
    const digitCount = digitInput.value;

    // Check if input is a number and is greater than 0
    if (digitCount && digitCount > 0) {
        const digits = [];
        for (let i = 0; i < digitCount; i++) {
            digits.push(Math.floor(Math.random() * 10));  // Generate random digit between 0 and 9
        }

        // Display the digits
        digitDisplay.textContent = digits.join(' ');  // Join digits with spaces
    } else {
        digitDisplay.textContent = 'Please enter a valid number.';
    }
}

// Increase the digit count
document.getElementById('increaseBtn').addEventListener('click', function () {
    const input = document.getElementById('digitCount');
    input.value = parseInt(input.value) + 1;  // Increase by 1
    generateDigits();  // Generate new digits based on updated count
});

// Decrease the digit count
document.getElementById('decreaseBtn').addEventListener('click', function () {
    const input = document.getElementById('digitCount');
    if (input.value > 1) {
        input.value = parseInt(input.value) - 1;  // Decrease by 1, but not below 1
        generateDigits();  // Generate new digits based on updated count
    }
});

forwardTaskBtn.addEventListener('click', function () {
    digitControls.style.display = 'block';
    digitInput.value = 3;
    currentTask = 'forward';
    generateDigits()
});

backwardTaskBtn.addEventListener('click', function () {
    digitControls.style.display = 'block';
    currentTask = 'backward';
    digitInput.value = 3;
    generateDigits()
});

wrongBtn.addEventListener('click', function () {
    digitControls.style.display = 'block';
    const score = digitInput.value - 1;

    scores[currentTask] = score;
    console.log(forwardScore);

    forwardScoreDisplay.textContent = scores.forward;
    backwardScoreDisplay.textContent = scores.backward;
})

