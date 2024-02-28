const guessedLetter = document.querySelector(".guessed-letters");
const button = document.querySelector(".guess");
const textInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const guessesLeft = document.querySelector(".remaining span");
const hiddenButton = document.querySelector(".play-again");
const message = document.querySelector(".message");

let word = "magnolia";

//Create a function to Add Placholders for Each Letter 
const placeholder = function(word) {
    const ltrArry = [];
    // console.log(ltrArry);
    for (let letter of word) {
        // console.log(letter);
        ltrArry.push("●");
    }
   wordInProgress.innerText = ltrArry.join("");
};

//call the function and pass it the word variable
placeholder(word);

// Add an event listener for the button, add an event parameter in the function
button.addEventListener("click", function(e){
    e.preventDefault(); //to prevent reloading of the form
       
        const inputs = textInput.value;
        console.log(inputs);
        textInput.value = ""; //to clear the input box
});





            