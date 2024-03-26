const guessedLettersElement = document.querySelector(".guessed-letters"); //unordered list
const button = document.querySelector(".guess"); //button with "guess" in it
const textInput = document.querySelector(".letter"); //text input where player guesses the letter
const wordInProgress = document.querySelector(".word-in-progress");//selects Paragraph where word in progress appears
const remainingGuessesElement = document.querySelector(".remaining");//paragraph that shows remaining guesses
const guessesLeft = document.querySelector(".remaining span");//selects span inside P that shows remaining guesses
const hiddenButton = document.querySelector(".play-again");//hidden button that will appear prompting player to play again
const message = document.querySelector(".message");//paragraph where messages appear when the player guesses
const playerGuesses = [];  //empty arry to hold the player guesses

let word = "magnolia"; //initial word string.

let guessedLetters = []; //empty array to hold all the letters the player guesses

let remainingGuesses = 8; //variable to set the maximum number of guesses

//Async function to fetch word data
const getWord = async function () {
    const request = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await request.text();
    // console.log(words); //logs out the list of fetched words

    const wordArray = words.split("\n");
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    // console.log(randomIndex); //for test puposes only
    let randomWord = wordArray[randomIndex];
    console.log(randomWord); //logs out the random word

    randomWord = randomWord.trim();
    word = randomWord;

    placeholder(word);
};
 
// getWord();

//Create a function to Add Placholders for Each Letter
const placeholder = function (word) {
    const ltrArry = [];
    for (let letter of word) {
        // console.log(letter); //to test loop
        ltrArry.push("●");
    }
    wordInProgress.innerText = ltrArry.join("");
};

// Call the function and pass it the word variable
getWord(word);

//Add an event listener for the button, add an event parameter in the function
button.addEventListener("click", function (e) {
    e.preventDefault(); //to prevent reloading of the form
    
    message.innerText = ""; //to clear the message paragraph

    const guess = textInput.value; //to grab what was entered in the input
    
    const goodInput = checkInput(guess); //Call function and pass it the input value, save it to a variable
    // console.log(goodInput); //to test the output

    if (goodInput) {
    makeGuess(guess);
    };
    textInput.value = ""; //to clear the input box
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
};

//Create a function to capture the guessed letter    
const makeGuess = function(guess) {
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
        message.innerText = `You already guessed that letter. Try Again.`;
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
        showGuessedLetters(guess);
        updateGuessesLeft(guess);
        showWordInProgress(guessedLetters);
    } 
};

// makeGuess("a") //to test function
// makeGuess("b")
// makeGuess("c")

//Create a name a function to update the page with the letters the player guesses
const showGuessedLetters = function () {

    guessedLettersElement.innerHTML = "";

    for (let letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letter;
        guessedLettersElement.append(li);
    }
};

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
    starOver();
};

//function to count guesses remaining
const updateGuessesLeft = function(guess) {
    const upperWord = word.toUpperCase();

    if (!upperWord.includes(guess)) {
        message.innerText = `The word doesn't containing the letter ${guess}`;
        remainingGuesses -= 1;
    } else {
        message.innerText = `The word contains the letter ${guess}`;
    }
    if (remainingGuesses === 0) {
        remainingGuessesElement.innerText = `You have no guesses remaining.`;
        message.innerHTML = `Game over! The word was <span class="highlight">${word}!</span>`;
    } else if (remainingGuesses === 1) {
        guessesLeft.innerText = `${remainingGuesses} guess`;
    } else {
        guessesLeft.innerText = `${remainingGuesses} guesses`;
    }
};

//function to check if the Player won
const checkIfWin = function () {
    if (wordInProgress.innerText === word.toUpperCase()) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">"You've guessed the correct word! Congratulations!</p>`;
    }
};

//funciton to Play it Again
const starOver = function () {
    if (wordInProgress.innerText === word.toUpperCase()) {  //if player wins
        button.classList.add("hide"); // hiding the guess button
        remainingGuessesElement.classList.add("hide"); // hiding paragraph where remaining guesses display
        guessedLettersElement.classList.add("hide"); //hiding list where guessed letters appear
        hiddenButton.classList.remove("hide"); //showing the play again button
    } else if (remainingGuesses === 0) { //if player loses
        button.classList.add("hide"); // hiding the guess button
        remainingGuessesElement.classList.add("hide"); // hiding paragraph where remaining guesses display
        guessedLettersElement.classList.add("hide"); //hiding list where guessed letters appear
        hiddenButton.classList.remove("hide"); //showing the play again button
    }
};

//Add an event listener to the Play Again hidden button to start the game over
hiddenButton.addEventListener("click", function() {
    message.classList.remove("win");//remove the class of "win" tothe message element
    message.innerText = ""; //to empty the message text
    guessedLettersElement.innerText = "";//to empty the unordered list
    
    remainingGuesses = 8; //reset the number of guesses
    guessedLetters = []; //reset this variable to an empty array
    guessesLeft.innerText = `${remainingGuesses} guesses`;//populate the span inside the P with the # of guesses

    button.classList.remove("hide"); //remove hide and show the guess button
    remainingGuessesElement.classList.remove("hide"); //remove hide and show the paragraph where remaining guesses display
    guessedLettersElement.classList.remove("hide"); //remove hide and show list where guessed letters appear
    hiddenButton.classList.add("hide"); //add hide to the play again button

    getWord(); //call the async function to get the new word
});


