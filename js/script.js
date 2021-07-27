const guessedLettersElement = document.querySelector(".guessed-letters");   // The unordered list where the player’s guessed letters will appear.
const guessLetterButton = document.querySelector(".guess");   // The button with the text “Guess!” in it.
const letterInput = document.querySelector(".letter");   // The text input where the player will guess a letter.
const wordInProgress = document.querySelector(".word-in-progress");   // The empty paragraph where the word in progress will appear.
const remainingGuessesElement = document.querySelector(".remaining");   // The paragraph where the remaining guesses will display.
const remainingGuessesSpan = document.querySelector(".remaining span");   // The span inside the paragraph where the remaining guesses will display.
const message = document.querySelector(".message");   // The empty paragraph where messages will appear when the player guesses a letter.
const playAgainButton = document.querySelector("play-again");   // The hidden button that will appear prompting the player to play again.
const word = "Magnolia";   // Magnolia is the starting word.


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
    const guess = letterInput.value;
    console.log(guess);
    letterInput.value = [];
});




