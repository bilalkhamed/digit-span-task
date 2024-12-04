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
const copyBtn = document.getElementById('copy-button');
const viewHistoryBtn = document.getElementById('view-history-btn');
const historyTable = document.getElementById('history-table');

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

    forwardScoreDisplay.textContent = scores.forward;
    backwardScoreDisplay.textContent = scores.backward;

    if (currentTask === 'backward') {
        storeToLocalStorage();
    }
})

copyBtn.addEventListener('click', function () {
    const textToCopy = `${participant.id}\t${participant.groupId}\t${scores.forward}\t${scores.backward}`;
    navigator.clipboard.writeText(textToCopy)
        .then(() => {
            this.innerText = 'Copied!';

            setTimeout(() => {
                this.innerText = 'Copy';
            }, 500);
        })
        .catch(err => {
            console.error('Failed to copy text: ', err);
            alert('Error copying')
        });

    resetTask();
});

viewHistoryBtn.addEventListener('click', function () {
    if (this.innerText === 'View history') {
        historyTable.style.opacity = '100%';
        getHistory();
        this.innerText = 'Hide'
    } else {
        historyTable.style.opacity = '0';
        this.innerText = 'View history';
    }
});

function storeToLocalStorage() {
    const participantResult = {
        ...participant,
        ...scores
    };

    const participantResults = JSON.parse(localStorage.getItem('participantResults')) || [];
    participantResults.push(participantResult);
    localStorage.setItem('participantResults', JSON.stringify(participantResults));
}

function getHistory() {
    historyTable.querySelector('tbody').innerHTML = '';
    const participantResults = JSON.parse(localStorage.getItem('participantResults')) || [];
    participantResults.forEach(appendToTable);
}

function appendToTable(data) {
    const row = document.createElement('tr');
    const copyButton = document.createElement('button');

    copyButton.innerText = 'Copy';
    copyButton.classList.add('secondary-btn');
    copyButton.addEventListener('click', function () {
        const textToCopy = `${data.id}\t${data.groupId}\t${data.forward}\t${data.backward}`;
        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                this.innerText = 'Copied!';
                setTimeout(() => {
                    this.innerText = 'Copy';
                }, 500);
            })
            .catch(err => {
                console.error('Failed to copy text: ', err);
                alert('Error copying');
            });
    });

    // Populate the row
    row.innerHTML = `<td>${data.id}</td>
                     <td>${data.groupId}</td>
                     <td>${data.forward}</td>
                     <td>${data.backward}</td>`;

    // Create a new <td> for the button and append the button to it
    const buttonCell = document.createElement('td');
    buttonCell.appendChild(copyButton);
    row.appendChild(buttonCell);

    // Append the row to the table
    historyTable.querySelector('tbody').appendChild(row);
}


function resetTask() {
    // Clear the objects
    scores.forward = 0;
    scores.backward = 0;
    participant.id = 0;
    participant.groupId = '';

    // Clear the elements 
    participantIdInput.value = '';
    groupIdInput.value = '';
    participantIdDisplay.innerText = '';
    groupIdDisplay.innerText = '';
    forwardScoreDisplay.innerText = '';
    backwardScoreDisplay.innerText = '';
    digitDisplay.innerText = '';
    digitControls.style.display = 'none';
}

