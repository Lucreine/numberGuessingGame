let randomNumber;
let attemptsRemaining;
const guessInput = document.getElementById('guess-input');
const submitGuessButton = document.getElementById('submit-guess');
const resultMessage = document.getElementById('result-message');
const attemptsRemainingDisplay = document.getElementById('attempts-remaining');
const resetGameButton = document.getElementById('reset-game');
const maximumNumberInput = document.getElementById('maximum-number');
const maximumValidateButton = document.getElementById('submit-validate');
const bestScoreDisplay = document.getElementById('best-score');
let bestScore = 10;

let maximumNumber = 100;

function initializeGame() {
    randomNumber = Math.floor(Math.random() * maximumNumber) + 1;
    attemptsRemaining = 10;
    resultMessage.textContent = '';
    attemptsRemainingDisplay.textContent = `Essais restants : ${attemptsRemaining}`;
    guessInput.value = '';
}

function checkGuess() {
    const userGuess = Number(guessInput.value);
    if (userGuess < 1 || userGuess > maximumNumber || isNaN(userGuess)) {
        updateMessage('Veuillez entrer un nombre entre 1 et ${maximumNumber}.', true);
    return;
    }
    attemptsRemaining--;
    attemptsRemainingDisplay.textContent = `Essais restants : ${attemptsRemaining}`;
    if (userGuess === randomNumber) {
        updateMessage('Félicitations! Vous avez deviné le nombre!', false);
        updateBestScore(10 - attemptsRemaining);
        submitGuessButton.disabled = true;

        return;
        } else if (userGuess < randomNumber) {
            updateMessage('Trop bas!', true);
        } else {
            updateMessage('Trop haut!', true);
        }
        if (attemptsRemaining === 0) {
            updateMessage(`Game over! Le nombre était ${randomNumber}.`, true);
            submitGuessButton.disabled = true;
    }
}

function updateMessage(message, isError) {
    resultMessage.textContent = message;
    resultMessage.style.color = isError ? 'red' : 'green';
}

function validateMaximumNumber() {
    const maxNum = Number(maximumNumberInput.value);
    if (maxNum < 1 || isNaN(maxNum)) {
        updateMessage('Veuillez entrer une valeur maximale valide.', true);
        return;
    }
    maximumNumber = maxNum;
    initializeGame();
    updateMessage(`Valeur maximale définie à ${maximumNumber}.`, false);
}

function updateBestScore(currentScore) {
    if (currentScore < bestScore) {
        bestScore = currentScore;
        bestScoreDisplay.textContent = `Meilleur score : ${bestScore} tentatives`;
    }
}

submitGuessButton.addEventListener('click', checkGuess);
maximumValidateButton.addEventListener('click', validateMaximumNumber);
resetGameButton.addEventListener('click', initializeGame);
initializeGame();

