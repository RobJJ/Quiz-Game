"use strict";
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////  SELECTORS
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
const startButton = document.querySelector(".start");
const container = document.querySelector("#container");
const questionNumberLocation = document.querySelector(
  ".question-number-number"
);
const questionLocation = document.querySelector(".question");
const answers = document.querySelectorAll(".answer-button"); //nodeList returned 0 indexed
const footerButtons = document.querySelectorAll(".navigation-button"); //nodeList returned
const previousButton = document.querySelector(".previous-button");
const nextButton = document.querySelector(".next-button");
const submitButton = document.querySelector(".submit-button");
const sections = document.querySelectorAll("section"); //Returns nodelist
const info = document.querySelector(".display-info");
const restart = document.querySelector(".restart-button");
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////  DATA BANK
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
const parrentArrayBank = [
  [1, "What is 2+2?", 4],
  [2, "What is 3+4?", 7],
  [3, "What is 2^3?", 8],
  [4, "What is 2*6?", 12],
  [5, "What is 11-6?", 5],
];
//
const correctAnswerBank = []; // Array of correct answers to use later at score compare func
const populateCorrectAnswerBank = function () {
  parrentArrayBank.forEach((t) => correctAnswerBank.push(t[2]));
};
populateCorrectAnswerBank(); ////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////  DATA STRUCTURES
//////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
const mapRed = new Map();
const mapBlue = new Map();

const mapRedAdd = () => {
  for (const [x, y] of parrentArrayBank) {
    mapRed.set(x, y);
  }
};
const mapBlueAdd = () => {
  for (const [, x, y] of parrentArrayBank) {
    mapBlue.set(x, y);
  }
};
mapRedAdd(); // Created map with [question number, question]
mapBlueAdd(); // Created map with [question, answer]
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////// STATE
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////

let questionNumber = 0;
let question;
let answer = 0;
let userAnswers = [];
let selectedAnsButton = [];
let userChoices = [];
let userTotalScores = [];
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////// HANDLER FUNCTIONS
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////

const startGame = function () {
  questionNumber++;
  updateDisplay();
  hideStartButton();
  revealPanels();
};
const next = function () {
  if (questionNumber === 5) {
    info.textContent = `Game completed, if you are happy with your answers, click Submit!`;
    return;
  }
  if (!userAnswers[questionNumber - 1]) {
    info.textContent = `Please select an answer!`;
    return;
  }
  questionNumber++;
  updateDisplay();
};
const prev = function () {
  if (questionNumber === 1) return;
  questionNumber--;
  updateDisplay();
};
const submit = function () {
  hidePanelsForSubmit();
  let score = calculateScore();
  info.textContent = `
  Good job!
  Here are your stats :
  Your answers: ${userAnswers}
  Correct answers: ${correctAnswerBank}
  Current Score: ${score}/5
  ${userTotalScores ? `Your previous scores: ${userTotalScores}` : ""}
  `;
  userTotalScores.push(score);
  restart.classList.remove("start-game-style");
  hideFooterButtons();
};
const tryAgain = function () {
  questionNumber = 1;
  answer = 0;
  userAnswers = [];
  selectedAnsButton = [];
  userChoices = [];
  setNewGameDisplay();
  updateDisplay();
  info.textContent = `Your Answer is : `;
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////  MAIN FUNCTIONS
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
const makeNewArray = function () {
  // Return array of 5 options
  const getNewNum = () => Math.floor(Math.random() * 20) + 1;
  let newArray = new Array(5).fill(1).map((ele, idx) => (ele = getNewNum()));
  return newArray;
};
const newArrayWithCorrectAnswer = function () {
  // Return the 5 option array with the correct answer. We will use this one
  let choices = makeNewArray();
  (function () {
    let ranPos = Math.floor(Math.random() * 5);
    choices[ranPos] = correctAnswerBank[questionNumber - 1]; // replace 77 with the correct answer
  })();
  return choices;
};
const updateDisplay = function () {
  questionNumberLocation.textContent = questionNumber;
  questionLocation.textContent = mapRed.get(questionNumber);
  if (userChoices[questionNumber - 1]) {
    // This means that this question has been loaded before
    answers.forEach(
      (ele, i) => (ele.textContent = Number(userChoices[questionNumber - 1][i]))
    );
    removeActiveClasses();
    if (selectedAnsButton[questionNumber - 1]) {
      answers[selectedAnsButton[questionNumber - 1] - 1].classList.add(
        "answer-button-active"
      );
      info.textContent = `Your Answer is : ${userAnswers[questionNumber - 1]}`;
    } else {
      info.textContent = `Your Answer is : `;
    }

    return;
  } else {
    // This means that this question has *NOT* been loaded before
    let newOptionArray = newArrayWithCorrectAnswer();
    userChoices.push(newOptionArray);
    answers.forEach(
      (ele, i) => (ele.textContent = Number(userChoices[questionNumber - 1][i]))
    );
    removeActiveClasses();
    info.textContent = `Your Answer is : `;
  }
};
const storeUserChoices = function () {};
const updateUserAnswer = function (e) {
  // This is what the button does on click!
  userAnswers[questionNumber - 1] = Number(e.target.textContent);
  info.textContent = `Your Answer is : ${e.target.textContent}`;
  removeActiveClasses();
  addActiveClass(e);
  selectedAnsButton[questionNumber - 1] = e.target.dataset.num;
};
const storeButtonSelected = function () {};
const removeActiveClasses = function () {
  answers.forEach((button) => button.classList.remove("answer-button-active"));
};
const addActiveClass = function (e) {
  e.target.classList.add("answer-button-active");
};
const displaySelectedButton = function () {};
const updateUserChoice = function () {};
const displayResults = function () {};
const hidePanels = function () {};
const revealPanels = function () {
  sections.forEach((t) => t.classList.remove("start-game-style"));
};
const hideStartButton = function () {
  startButton.classList.add("start-game-style");
};
const hidePanelsForSubmit = function () {
  document.querySelector(".section-1").classList.add("start-game-style");
  document.querySelector(".display-answers").classList.add("start-game-style");
};
const hideFooterButtons = function () {
  footerButtons.forEach((t) => t.classList.add("start-game-style"));
};
const calculateScore = function () {
  let score = 0;
  correctAnswerBank.forEach((answer, idx) =>
    answer == userAnswers[idx] ? score++ : ""
  );
  return score;
};
const showPanelsForNewGame = function () {
  footerButtons.forEach((t) => t.classList.remove("start-game-style"));
  restart.classList.add("start-game-style");
  document
    .querySelector(".display-answers")
    .classList.remove("start-game-style");
};
const setNewGameDisplay = function () {
  revealPanels();
  showPanelsForNewGame();
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////  EVENT LISTENERS
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////
startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", next);
answers.forEach((t) => t.addEventListener("click", updateUserAnswer));
previousButton.addEventListener("click", prev);
submitButton.addEventListener("click", submit);
restart.addEventListener("click", tryAgain);
