const guessedLetter = document.querySelector(".guessed-letters");
const button = document.querySelector(".guess");
const textInput = document.querySelector("#letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const guessesLeft = document.querySelector(".remaining span");
const hiddenButton = document.querySelector(".play-again");
const message = document.querySelector(".message");
const playerGuesses = [];

let word = "magnolia";

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

//Create a function to capture the guessed letter    
const makeGuess = function (guess) {
    guess = guess.toUpperCase();
    if (playerGuesses.includes(guess)) {
        message.innerText = "You already guessed that letter.  Try again.";
    } else {
    
        playerGuesses.push(guess);
        console.log(playerGuesses);
    }
};

makeGuess("a")
makeGuess("b")
makeGuess("c")

