
const guessInput = document.getElementById("guess-value");
const guessButton = document.getElementById("guess-btn");
const restartButton = document.getElementById("restart-btn");
const attemptDisplay = document.getElementById("attempt");
const resultDisplay = document.getElementById("result");

const maxAttempts = 5;

let targetNumber = null;
let attempts = 0;
let gameActive = false;

// Start or restart the game
function startGame() {
    targetNumber = Math.floor(Math.random() * 20) + 1;

    attempts = 0;
    gameActive = true;

    attemptDisplay.textContent = attempts;
    resultDisplay.textContent = "";
    resultDisplay.className = "";

    guessInput.value = "";
    guessInput.hidden = false;

    guessButton.hidden = false;
    restartButton.hidden = true;

    guessInput.focus();
}

// Finish the game
function finishGame(message, outcome) {
    gameActive = false;

    resultDisplay.textContent = message;
    resultDisplay.className = outcome;

    guessInput.value = "0";
    guessInput.hidden = true;

    guessButton.hidden = true;
    restartButton.hidden = false;

    restartButton.focus();
}

// Check the player's guess
function makeGuess() {
    if (!gameActive) return;

    const inputValue = guessInput.value.trim();

    // Do nothing if empty or invalid
    if (inputValue === "") return;

    const guess = Number(inputValue);

    if (!Number.isFinite(guess) || !Number.isInteger(guess)) {
        return;
    }

    // Increase attempt count
    attempts++;
    attemptDisplay.textContent = attempts;

    // Correct answer
    if (guess === targetNumber) {
        finishGame("You WIN!", "win");
        return;
    }

    // Out of attempts
    if (attempts >= maxAttempts) {
        finishGame(
            "You LOSE! The number was " + targetNumber + ".",
            "lose"
        );
        return;
    }

    // Compare the guess with the target
    if (guess > targetNumber) {
        resultDisplay.textContent = guess + " is too high!";
    } else {
        resultDisplay.textContent = guess + " is too low!";
    }

    resultDisplay.className = "";

    // Reset input and focus it again
    guessInput.value = "0";
    guessInput.focus();
    guessInput.select();
}

// Button events
restartButton.addEventListener("click", startGame);
guessButton.addEventListener("click", makeGuess);

// Allow Enter key to submit
guessInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        makeGuess();
    }
});
