const startButton = document.getElementById('start-btn') // Selects the start button element by its ID
const nextButton = document.getElementById('next-btn') // Selects the next button element by its ID
const questionContainerElement = document.getElementById('question-container') // Selects the container for the questions by its ID
const questionElement = document.getElementById('question') // Selects the question element by its ID
const answerButtonsElement = document.getElementById('answer-buttons') // Selects the container for the answer buttons by its ID

let shuffledQuestions, currentQuestionIndex // Variables to store shuffled questions and current question index

// Adds a click event listener to the start button to trigger the startGame function when clicked
startButton.addEventListener('click', startGame) 

// Adds a click event listener to the next button to move to the next question
nextButton.addEventListener('click', () => {
  currentQuestionIndex++ // Increment the current question index
  setNextQuestion() // Call function to set up the next question
})

// Function to start the quiz game
function startGame() {
  startButton.classList.add('hide') // Hide the start button
  shuffledQuestions = questions.sort(() => Math.random() - .5) // Shuffle the questions randomly
  currentQuestionIndex = 0 // Reset the current question index to 0 (first question)
  questionContainerElement.classList.remove('hide') // Show the question container
  setNextQuestion() // Load the first question
}

// Function to set up the next question
function setNextQuestion() {
  resetState() // Reset the UI state before displaying the next question
  showQuestion(shuffledQuestions[currentQuestionIndex]) // Show the current question
}

// Function to display the question and its answers
function showQuestion(question) {
  questionElement.innerText = question.question // Set the text of the question element to the current question
  question.answers.forEach(answer => { // Loop through each answer in the question
    const button = document.createElement('button') // Create a new button for each answer
    button.innerText = answer.text // Set the button's text to the answer text
    button.classList.add('btn') // Add the 'btn' class to the button
    if (answer.correct) {
      button.dataset.correct = answer.correct // If the answer is correct, store that in a data attribute
    }
    button.addEventListener('click', selectAnswer) // Add an event listener for the button click
    answerButtonsElement.appendChild(button) // Append the button to the answer buttons container
  })
}

// Function to reset the state for the next question
function resetState() {
  clearStatusClass(document.body) // Remove correct/wrong classes from the body
  nextButton.classList.add('hide') // Hide the next button initially
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild) // Remove all answer buttons from the previous question
  }
}

// Function to handle answer selection
function selectAnswer(e) {
  const selectedButton = e.target // Get the button that was clicked
  const correct = selectedButton.dataset.correct // Check if the selected answer is correct
  setStatusClass(document.body, correct) // Update the body class based on whether the answer is correct
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct) // Update each answer button to indicate correct/incorrect
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide') // Show the next button if there are more questions
  } else {
    startButton.innerText = 'Restart' // Change start button text to 'Restart' when the quiz is over
    startButton.classList.remove('hide') // Show the start/restart button
  }
}

// Function to set the correct/wrong class based on the answer's correctness
function setStatusClass(element, correct) {
  clearStatusClass(element) // Clear any previous status class
  if (correct) {
    element.classList.add('correct') // Add the 'correct' class if the answer is correct
  } else {
    element.classList.add('wrong') // Add the 'wrong' class if the answer is wrong
  }
}

// Function to clear the correct/wrong class from an element
function clearStatusClass(element) {
  element.classList.remove('correct') // Remove the 'correct' class
  element.classList.remove('wrong') // Remove the 'wrong' class
}

// Array of question objects, each with a question and an array of answers
const questions = [
  {
    question: 'What is 2 + 2?', // The question text
    answers: [
      { text: '4', correct: true }, // Correct answer
      { text: '22', correct: false } // Incorrect answer
    ]
  },
  {
    question: 'Who is the progammer', // The question text
    answers: [
      { text: 'MR Paul', correct: true }, // Correct answer (multiple correct options)
      { text: 'Mr Jibril', correct: true },
      { text: 'Mr Salim ', correct: true },
      { text: 'Mr Readone', correct: true }
    ]
  },
  {
    question: 'Is web development fun?', // The question text
    answers: [
      { text: 'Kinda', correct: false }, // Incorrect answer
      { text: 'YES!!!', correct: true }, // Correct answer
      { text: 'Um no', correct: false }, // Incorrect answer
      { text: 'IDK', correct: false } // Incorrect answer
    ]
  },
  {
    question: 'What is 4 * 2?', // The question text
    answers: [
      { text: '6', correct: false }, // Incorrect answer
      { text: '8', correct: true } // Correct answer
    ]
  }
]
