const guessedLettersElement = document.querySelector(".guessed-letters");   // The unordered list where the player’s guessed letters will appear.
const guessLetterButton = document.querySelector(".guess");   // The button with the text “Guess!” in it.
const letterInput = document.querySelector(".letter");   // The text input where the player will guess a letter.
const wordInProgress = document.querySelector(".word-in-progress");   // The empty paragraph where the word in progress will appear.
const remainingGuessesElement = document.querySelector(".remaining");   // The paragraph where the remaining guesses will display.
const remainingGuessesSpan = document.querySelector(".remaining span");   // The span inside the paragraph where the remaining guesses will display.
const message = document.querySelector(".message");   // The empty paragraph where messages will appear when the player guesses a letter.
const playAgainButton = document.querySelector("play-again");   // The hidden button that will appear prompting the player to play again.
const word = "Magnolia";   // Magnolia is the starting word.
const guessedLetters = [];


// Display symbols as placeholders for chosen word's letters.
const placeholder = function (){
    const placeholderLetters = [];   
    for (const letter of word){
        console.log(letter);
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
};
placeholder(word);


// Add event listener for guessLetterButton.
guessLetterButton.addEventListener("click", function(e){
    e.preventDefault();
    message.innerText = "";   // Empty message paragraph
    const guess = letterInput.value;  // Grab what's entered in the input
    const goodGuess = validateInput(guess);  // Make sure it's a single letter
    if (goodGuess){
        makeGuess(guess);
    }
    letterInput.value = "";
});


// Create function to check player's input
const validateInput = function (input){
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length===0){ 
        message.innerText = "Please enter a letter.";
    } else if (input.length >1){
        message.innerText = "Please enter a single letter.";
    } else if (!input.match(acceptedLetter)){
        message.innerText = "Please enter a letter from A-Z.";
    } else {
        return input;
    }
};


// Create function to store input
const makeGuess = function(guess){
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)){
        message.innerText = "You already guessed that letter.  Pick another one.";
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
        showGuessedLetters();
        updateWordInProgress(guessedLetters);
    }
};

// Create function to show the guessed letters
const showGuessedLetters = function (){
    guessedLettersElement.innerHTML = "";  // Clear list first
    for (const letter of guessedLetters){
        const li = document.createElement("li");
        li.innerText = letter;
        guessedLettersElement.append(li);
    }
};


// Create function to update word in progress
const updateWordInProgress = function (guessedLetters){
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const revealWord = [];
    for (const letter of wordArray){
        if (guessedLetters.includes(letter)){
            revealWord.push(letter.toUpperCase());
        } else {
            revealWord.push("●");
        }
    }
    wordInProgress.innerText = revealWord.join("");
    checkIfWin();
};


// Create function to check if player won
const checkIfWin = function(){
    if (word.toUpperCase()===wordInProgress.innerText){
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed the correct word!  Congrats!</p>`;
    }
};




