const guessedLettersElement = document.querySelector(".guessed-letters"); //unordered list
const button = document.querySelector(".guess"); //button with "guess" in it
const textInput = document.querySelector(".letter"); //text input where player guesses the letter
const wordInProgress = document.querySelector(".word-in-progress");//selects Paragraph where word in progress appears
const remainingGuesses = document.querySelector(".remaining");//paragraph that shows remaining guesses
const guessesLeft = document.querySelector(".remaining span");//selects span inside P that shows remaining guesses
const hiddenButton = document.querySelector(".play-again");//hidden button that will appear prompting player to play again
const message = document.querySelector(".message");//paragraph where messages appear when the player guesses
const playerGuesses = [];  //empty arry to hold the player guesses

let word = "magnolia"; //initial word string.

const guessedLetters = []; //empty array to hold all the letters the player guesses

//Create a function to Add Placholders for Each Letter
const placeholder = function (word) {
    const ltrArry = [];
    for (let letter of word) {
        console.log(letter);
        ltrArry.push("●");
    }
    wordInProgress.innerText = ltrArry.join("");
};

//Call the function and pass it the word variable
placeholder(word);

//Add an event listener for the button, add an event parameter in the function
button.addEventListener("click", function (e) {
    e.preventDefault(); //to prevent reloading of the form

    const guess = textInput.value;
    console.log(guess);
    textInput.value = ""; //to clear the input box

    const goodInput = checkInput(guess); //Call function and pass it the input value, save it to a variable
    if (goodInput) {
        makeGuess(guess);
    }
});

//Function to check player's input
const checkInput = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0) {
        message.innerText = "Please enter a letter.";
    } else if (input.length > 1) {
        message.innerText = "Try again.  One letter only at a time.";
    } else if (!input.match(acceptedLetter)) {
        message.innerText = "Please enter a letter from A to Z.";
    } else {
        return input;
    }
}
//Create a name a function to update the page with the letters the player guesses
const showGuessedLetters = function () {

    guessedLettersElement.innerHTML = "";

    for (let letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letter;
        guessedLettersElement.append(li);
    }
};

//Create a function to capture the guessed letter    
const makeGuess = function (guess) {
    guess = guess.toUpperCase();
    if (playerGuesses.includes(guess)) {
        message.innerText = "You already guessed that letter.  Try again.";
    } else {
        playerGuesses.push(guess);
        // console.log(playerGuesses);
        showGuessedLetters(guess);
        showWordInProgress(guessedLetters);
    }
};

// makeGuess("a")
// makeGuess("b")
// makeGuess("c")

//Create a function that accepts the guessedLetters array as a parameter. 
//This function updates the word in progress.
const showWordInProgress = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    // console.log(wordArray);

    const revealWord = [];
    for (let letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            revealWord.push(letter.toUpperCase());
        } else {
            revealWord.push("●");
        }
    };
    wordInProgress.innerText = revealWord.join("");
    checkIfWin();
};

//function to check if the Player won
const checkIfWin = function () {
    if (wordInProgress.innerText === word.toUpperCase()) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">"You've guessed the correct word! Congratulations!</p>`;
    }
};