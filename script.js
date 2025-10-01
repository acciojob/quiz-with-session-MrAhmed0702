// Define the quiz questions
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars", "Saturn"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

// DOM elements
const questionsElement = document.getElementById("questions");
const submitButton = document.getElementById("submit");
const scoreElement = document.getElementById("score");

// --- SESSION STORAGE UTILS ---

function getSavedAnswers() {
  const saved = sessionStorage.getItem("progress");
  return saved ? JSON.parse(saved) : {};
}

function saveAnswer(index, choice) {
  const progress = getSavedAnswers();
  progress[index] = choice;
  sessionStorage.setItem("progress", JSON.stringify(progress));
}

// --- RENDER QUESTIONS TO PAGE ---

function renderQuestions() {
  const savedAnswers = getSavedAnswers();

  questions.forEach((question, qIndex) => {
    const questionDiv = document.createElement("div");

    const questionText = document.createElement("p");
    questionText.textContent = question.question;
    questionDiv.appendChild(questionText);

    question.choices.forEach(choice => {
      const label = document.createElement("label");

      const input = document.createElement("input");
      input.type = "radio";
      input.name = `question-${qIndex}`;
      input.value = choice;

      // Restore saved selection
      if (savedAnswers[qIndex] === choice) {
        input.checked = true;
      }

      // Save selection when changed
      input.addEventListener("change", () => {
        saveAnswer(qIndex, choice);
      });

      label.appendChild(input);
      label.appendChild(document.createTextNode(choice));
      questionDiv.appendChild(label);
    });

    questionsElement.appendChild(questionDiv);
  });
}

// --- CALCULATE SCORE ---

function calculateScore() {
  const answers = getSavedAnswers();
  let score = 0;

  questions.forEach((q, i) => {
    if (answers[i] === q.answer) {
      score++;
    }
  });

  // Show and store score
  const scoreText = `Your score is ${score} out of ${questions.length}.`;
  scoreElement.textContent = scoreText;
  localStorage.setItem("score", score);
}

// --- DISPLAY SAVED SCORE IF EXISTS ---

function displaySavedScore() {
  const stored = localStorage.getItem("score");
  if (stored !== null) {
    scoreElement.textContent = `Your score is ${stored} out of ${questions.length}.`;
  }
}

// --- EVENT LISTENERS ---

submitButton.addEventListener("click", calculateScore);

// --- INIT ---

renderQuestions();
displaySavedScore();
