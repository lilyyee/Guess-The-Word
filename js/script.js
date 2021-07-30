const guessedLettersElement = document.querySelector(".guessed-letters");   // The unordered list where the player’s guessed letters will appear.
const guessLetterButton = document.querySelector(".guess");   // The button with the text “Guess!” in it.
const letterInput = document.querySelector(".letter");   // The text input where the player will guess a letter.
const wordInProgress = document.querySelector(".word-in-progress");   // The empty paragraph where the word in progress will appear.
const remainingGuessesElement = document.querySelector(".remaining");   // The paragraph where the remaining guesses will display.
const remainingGuessesSpan = document.querySelector(".remaining span");   // The span inside the paragraph where the remaining guesses will display.
const message = document.querySelector(".message");   // The empty paragraph where messages will appear when the player guesses a letter.
const playAgainButton = document.querySelector(".play-again");   // The hidden button that will appear prompting the player to play again.

const guessFormElement = document.querySelector("#guess-label");   // The label for the guess the letter input.
const winMessage = document.querySelector(".win-message");  // The image shown when word is guessed correctly.
const loseMessage = document.querySelector(".lose-message");  // The image shown when word is not guessed.  Game over.

let word = "magnolia";   // Magnolia is the starting word.
let guessedLetters = [];
let remainingGuesses = 8; 


// Add async function - to get word
const getWord = async function (){
    const response = await fetch ("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await response.text();
    const wordArray = words.split("\n");
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    placeholder(word);
};

getWord();   // Fire off the game


// Display symbols as placeholders for chosen word's letters.
const placeholder = function (word){
    const placeholderLetters = [];   
    for (const letter of word){
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
};


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
        updateGuessesRemaining(guess);
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


// Create function to count guesses remaining
const updateGuessesRemaining = function (guess){
    const upperWord = word.toUpperCase();
    if (!upperWord.includes(guess)){
        message.innerText = `Sorry, the word has no ${guess}.`;
        remainingGuesses -= 1;
    } else {
        message.innerText = `Good guess! The word has the letter ${guess}.`;
    }

    if (remainingGuesses === 0){
        message.innerHTML = `Game Over! The word was <span class ="highlight">${word}</span>.`;
        loseMessage.classList.remove("hide");
        remainingGuessesElement.classList.add("hide");
        guessedLettersElement.classList.add("hide");
        guessFormElement.classList.add("hide");
        wordInProgress.classList.add("hide");
        letterInput.classList.add("hide");
        startOver();
    } else if (remainingGuesses === 1){
        remainingGuessesSpan.innerText = `${remainingGuesses} guess`;
    } else {
        remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    }
};


// Create function to check if player won
const checkIfWin = function(){
    if (word.toUpperCase()===wordInProgress.innerText){
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed the correct word!  Congrats!</p>`;
        winMessage.classList.remove("hide");
        remainingGuessesElement.classList.add("hide");
        guessedLettersElement.classList.add("hide");
        guessFormElement.classList.add("hide");
        wordInProgress.classList.add("hide");
        letterInput.classList.add("hide");
        startOver();
    }
};


// Create function to hide and show elements
const startOver = function(){
    guessLetterButton.classList.add("hide");
    remainingGuessesElement.classList.add("hide");
    guessedLettersElement.classList.add("hide");
    playAgainButton.classList.remove("hide");
};


// Add click event to play again button
playAgainButton.addEventListener("click", function(){
    // Reset all values - grab new word
    message.classList.remove("win");
    guessedLetters = [];
    remainingGuesses = 8;
    remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    guessedLettersElement.innerHTML = "";
    message.innerText = "";

    getWord();   // Grab a new word

    // Showing UI elements
    guessLetterButton.classList.remove("hide");
    playAgainButton.classList.add("hide");
    remainingGuessesElement.classList.remove("hide");
    guessedLettersElement.classList.remove("hide");
    loseMessage.classList.add("hide");
    winMessage.classList.add("hide");
    guessFormElement.classList.remove("hide");
    wordInProgress.classList.remove("hide");
    letterInput.classList.remove("hide");
});

