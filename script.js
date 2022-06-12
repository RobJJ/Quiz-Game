"use strict";
/////////////////////////////////////////////////////////
///////////////////////////////  Selectors
//////////////////////////////////////////////////////
//
//
const startButton = document.querySelector(".start");
const container = document.querySelector("#container");
const questionNumberLocation = document.querySelector(
  ".question-number-number"
);
const question = document.querySelector(".question");
const answers = document.querySelectorAll(".answer-button"); //nodeList returned 0 indexed
const footerButtons = document.querySelectorAll(".navigation-button"); //nodeList returned
const previousButton = document.querySelector(".previous-button");
const nextButton = document.querySelector(".next-button");
const startOver = document.querySelector(".startOver-button");
const sections = document.querySelectorAll("section"); //Returns nodelist
const info = document.querySelector(".display-info");
//

/////////////////////////////////////////
/////////////////// Data Structures
//////////////////////////////////////
//
//////////////
////// Parent Array answers must be under 20 (Can change this when building out question input feature)
////////////
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
populateCorrectAnswerBank();
//
////////////////////////
//////// Maps of Data
//////////////////////
//
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
//
let questionNumber = 0;
let currentQuestion = ""; // This question number -> If its over the amount of questions available - stop game
let currentAnswer = 0;
let userGameState = [];
let userAnswers = [];
//
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////  ACTION FUNCTIONS
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const nextQuestion = (qNumber) => (currentQuestion = mapRed.get(qNumber)); // This gets the next question
const getNewNumber = function () {
  let num = 0;
  num = Math.floor(Math.random() * 20) + 1;
  return num;
};
const createRandomNumberArray = function () {
  let fiveOptionArray = [];
  let count = 1;
  while (count < 6) {
    // new length condition feature can be added here for condition
    count++;
    fiveOptionArray.push(getNewNumber());
  }
  return fiveOptionArray; //Returns an array of 5 options - can change the amount of options with the new feature
};
const updateUserGameState = function () {
  // Returns an Array of 5 options, one of which is the correct answer
  let panelOptions = createRandomNumberArray(); // Array containing 5 options
  (function () {
    // Automatically replace one of the Array options with the correct answer;
    let correctAns = mapBlue.get(currentQuestion);
    let ranPos = Math.floor(Math.random() * 5);
    panelOptions[ranPos] = correctAns; // ranNum between 1-5 (Will be used to randomly change an option value)
  })();
  return panelOptions;
};
const removeActiveClass = function () {
  answers.forEach((button) => button.classList.remove("answer-button-active"));
};
const addActiveClass = function (e) {
  e.target.classList.add("answer-button-active");
};
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////  HANDLER FUNCTIONS
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const startGame = function () {
  sections.forEach((t) => t.classList.remove("start-game-style"));
  questionNumber++;
  questionNumberLocation.textContent = questionNumber;
  question.textContent = nextQuestion(questionNumber);
  let options = updateUserGameState();
  userGameState.push(options);
  answers.forEach(
    (ele, i) => (ele.textContent = userGameState[questionNumber - 1][i])
  );
};
const buttonClickHandler = function (e) {
  let userChoice = e.target.textContent;
  userAnswers[questionNumber - 1] = Number(userChoice);
  removeActiveClass();
  addActiveClass(e);
};
const nextButtonHandler = function () {
  if (!userAnswers[questionNumber - 1]) {
    info.textContent = "Please select an answer before moving on!";
    return;
  } else if (questionNumber > 4) {
    info.textContent = `Game completed: User Answers: ${userAnswers} and UserOptionArr: ${userGameState[0]} : ${userGameState[1]} : ${userGameState[2]} : ${userGameState[3]} : ${userGameState[4]}`;
    return;
  } else {
    info.textContent = "";
    questionNumber++;
    questionNumberLocation.textContent = questionNumber;
    question.textContent = nextQuestion(questionNumber);
    let options = updateUserGameState();
    userGameState.push(options);
    answers.forEach(
      (ele, i) => (ele.textContent = userGameState[questionNumber - 1][i])
    );
    removeActiveClass();
  }
};
const prevButtonHandler = function () {
  questionNumber--;
  info.textContent = "";
  questionNumberLocation.textContent = questionNumber;
  question.textContent = nextQuestion(questionNumber);
  answers.forEach(
    (ele, i) => (ele.textContent = userGameState[questionNumber - 1][i])
  );
  let currentAnswerPosition = userGameState[questionNumber].indexOf(
    userAnswers[questionNumber]
  ); // Returns index of users answer
  // userAnswers[questionNumber] // Users Answer for this Question
  answers[currentAnswerPosition].classList.add("answer-button-active");
  // userAnswers[questionNumber] //This is the users answer at the question number position
};
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////  BUTTON EVENT LISTENERS
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
previousButton.addEventListener("click", prevButtonHandler);
startButton.addEventListener("click", startGame);
answers.forEach((t) => t.addEventListener("click", buttonClickHandler));
nextButton.addEventListener("click", nextButtonHandler);
// //
// ////////////////
// /////// Users Current Selection and User Answers
// /////////////
// //
// let currentSelection;
// const userAnswers = [];
// userAnswers.fill(5);
// ///////////////////////////////////////////////////////////
// /////////// Create Array of Random Answers - 5 options
// ///////////////////////////////////////////////////////
// const getNewNumber = function () {
//   let num = 0;
//   num = Math.floor(Math.random() * 20) + 1;
//   return num;
// };
// const createRandomNumberArray = function () {
//   let fiveOptionArray = [];
//   let count = 1;
//   while (count < 6) {
//     // new length condition feature can be added here for condition
//     count++;
//     fiveOptionArray.push(getNewNumber());
//   }
//   return fiveOptionArray; //Returns an array of 5 options - can change the amount of options with the new feature
// };
// //
// //

// ////////////////////////////////////////////
// //////////////////// Set up functions
// //////////////////////////////////////////
// //
// //
// let questionNumber = 0;
// let currentQuestion = ""; // This question number -> If its over the amount of questions available - stop game
// let currentAnswer = 0;
// //
// //
// const nextQuestionNum = () => questionNumber++; // lets ignore this func -> just increase and decrease manually
// const nextQuestion = (qNumber) => (currentQuestion = mapRed.get(qNumber)); // This gets the next question
// const nextCurrentAnswer = (question) =>
//   (currentAnswer = mapBlue.get(currentQuestion));
// //////////
// //
// // Update Panel One Function
// const updatePanelOne = function () {
//   nextQuestionNum();
//   questionNumberLocation.textContent = questionNumber;
//   question.textContent = nextQuestion(questionNumber);
// };
// //
// //
// const updateUserGameState = function() {
//   let panelOptions = createRandomNumberArray(); // Array containing 5 options
//   (function () { // Automatically replace one of the Array options with the correct answer;
//         let correctAns = mapBlue.get(currentQuestion);
//         let ranPos = Math.floor(Math.random() * 5);
//         panelAnswers[ranPos] = correctAns; // ranNum between 1-5 (Will be used to randomly change an option value)
//       })();
// }
// //Update Panel Two Function -
// const updatePanelTwo = function () {
//   let panelAnswers = createRandomNumberArray(); // Returns an array of options (5) ** use this variable to update collection
//   (function () {
//     let correctAns = mapBlue.get(currentQuestion);
//     let ranPos = Math.floor(Math.random() * 5);
//     panelAnswers[ranPos] = correctAns; // ranNum between 1-5 (Will be used to randomly change an option value)
//   })();
//   answers.forEach((ele, i) => (ele.textContent = panelAnswers[i]));
// };
// //
// //
// //
// const removeActiveClass = function () {
//   answers.forEach((button) => button.classList.remove("answer-button-active"));
// };
// //
// ///////////////////////////////////////////
// ////////////////////// Game Actions
// ////////////////////////////////////////
// //
// //
// // const stopGame
// //
// ////////////////////////////
// ///////////// Next button
// /////////////////////////
// const masterSwitch = function () {
//   // Used for next button functionality
//   if (questionNumber > 4) {
//     container.style.backgroundColor = "black"; // End Game - > Add Overlay with Stats bar ?
//     window.alert(`Your answers: ${userAnswers}`);
//   } else {
//     updatePanelOne();
//     updatePanelTwo();
//     removeActiveClass();
//     userAnswers[questionNumber - 1] = currentSelection;
//   }
//   startButton.classList.add("start-game-style");
// };
// //
// //
// const startGameFunc = function () {
//   updatePanelOne();
//   updatePanelTwo();
//   removeActiveClass();
// };
// //
// startButton.addEventListener("click", startGameFunc);
// nextButton.addEventListener("click", masterSwitch);
// //

// //
// //
// const startOverFunc = function () {
//   questionNumber = 0;
//   currentQuestion = "";
//   currentAnswer = 0;
//   container.style.backgroundColor = "cadetblue";
//   masterSwitch();
// };
// startOver.addEventListener("click", startOverFunc);
// //
// // //
// ////////////////////////
// //////// Answer Buttons
// //////////////////////
// //
// //
// // Functions: addActiveClass to button , remove activeClass from button, update current selection
// //
// //
// const updateCurrentSelection = function (e) {
//   currentSelection = e.target.textContent;
// };
// //
// // Adds color change to active button
// const addActiveClass = function (e) {
//   e.target.classList.add("answer-button-active");
// };
// //
// //
// //
// // Gives each button 3 eventListeners - currentSelection, removeActiveClass from all buttons, add activeClass to one button
// const updateButtons = function () {
//   answers.forEach((button) =>
//     button.addEventListener("click", updateCurrentSelection)
//   );
//   answers.forEach((button) =>
//     button.addEventListener("click", removeActiveClass)
//   );
//   answers.forEach((button) => button.addEventListener("click", addActiveClass));
// };
// updateButtons();
// //
// //
//
