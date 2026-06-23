const questions = [
  {
    number: "8 / 8",
    text: "👨‍🦰 What type of hair do you like in men?",
    placeholder: "For example: curly, short, dark...",
  },
  {
    number: "7 / 8",
    text: "👀 What type of eyes do you like in men?",
    placeholder: "For example: brown, kind, mysterious...",
  },
  {
    number: "6 / 8",
    text: "💪 What type of body do you like in men?",
    placeholder: "Write your answer...",
  },
  {
    number: "5 / 8",
    text: "🌙 What is your favorite date-night activity?",
    placeholder: "For example: dinner, stargazing, movies...",
  },
  {
    number: "4 / 8",
    text: "😄 Do you prefer humor or romantic gestures?",
    placeholder: "Tell me honestly...",
  },
  {
    number: "3 / 8",
    text: "💖 What personality trait attracts you most?",
    placeholder: "For example: kindness, confidence...",
  },
  {
    number: "2 / 8",
    text: "🗨️ How important is communication in a relationship?",
    placeholder: "Write what you think...",
  },
  {
    number: "1 / 8",
    text: "💍 Would you prefer a surprise proposal or a planned one?",
    placeholder: "Surprise or planned?",
  },
];

let currentQuestionIndex = 0;
const userAnswers = [];

const questionNumber = document.getElementById("questionNumber");
const questionLabel = document.getElementById("questionLabel");
const userInput = document.getElementById("userInput");
const nextButton = document.getElementById("nextButton");
const progressText = document.getElementById("progressText");
const progressBar = document.getElementById("progressBar");

const questionSection = document.getElementById("questionSection");
const resultSection = document.getElementById("resultSection");
const loadingMessage = document.getElementById("loadingMessage");
const finalResult = document.getElementById("finalResult");
const restartButton = document.getElementById("restartButton");

function updateQuestion() {
  const currentQuestion = questions[currentQuestionIndex];

  questionNumber.textContent = currentQuestion.number;
  questionLabel.textContent = currentQuestion.text;
  userInput.placeholder = currentQuestion.placeholder;
  userInput.value = "";

  const completed = currentQuestionIndex;
  const progressPercent = (completed / questions.length) * 100;

  progressText.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
  progressBar.style.width = `${progressPercent}%`;

  nextButton.textContent =
    currentQuestionIndex === questions.length - 1
      ? "Reveal My Result ♡"
      : "Next ♡";

  userInput.focus();
}

function shakeInput() {
  userInput.classList.remove("shake");

  requestAnimationFrame(() => {
    userInput.classList.add("shake");
  });
}

function goToNextQuestion() {
  const answer = userInput.value.trim();

  if (!answer) {
    shakeInput();
    return;
  }

  userAnswers[currentQuestionIndex] = answer;

  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    updateQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  progressBar.style.width = "100%";

  questionSection.classList.add("hidden");
  resultSection.classList.remove("hidden");

  setTimeout(() => {
    loadingMessage.textContent = "Comparing your answers with the perfect match...";

    setTimeout(() => {
      loadingMessage.classList.add("hidden");
      finalResult.classList.remove("hidden");
    }, 1800);
  }, 1400);
}

function restartGame() {
  currentQuestionIndex = 0;
  userAnswers.length = 0;

  resultSection.classList.add("hidden");
  finalResult.classList.add("hidden");
  loadingMessage.classList.remove("hidden");
  loadingMessage.textContent = "Finding your perfect partner...";

  questionSection.classList.remove("hidden");
  updateQuestion();
}

nextButton.addEventListener("click", goToNextQuestion);

userInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    goToNextQuestion();
  }
});

restartButton.addEventListener("click", restartGame);

updateQuestion();