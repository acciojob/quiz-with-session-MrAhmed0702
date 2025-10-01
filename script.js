// ----------------- STATE HELPERS -----------------
function getProgress() {
  return JSON.parse(sessionStorage.getItem("progress")) || {};
}

function saveProgress(progress) {
  sessionStorage.setItem("progress", JSON.stringify(progress));
}

function saveScore(score) {
  localStorage.setItem("score", score);
}

// ----------------- RENDER QUESTIONS -----------------
const questionsElement = document.getElementById("questions");
const scoreElement = document.getElementById("score");
const submitBtn = document.getElementById("submit");

// Load saved progress if available
const userAnswers = getProgress();

function renderQuestions() {
  questionsElement.innerHTML = "";

  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];

    const questionElement = document.createElement("div");

    const qText = document.createElement("p");
    qText.textContent = question.question;
    questionElement.appendChild(qText);

    // Render options
    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];

      const choiceElement = document.createElement("input");
      choiceElement.type = "radio";
      choiceElement.name = `question-${i}`;
      choiceElement.value = choice;

      // restore saved answer
      if (userAnswers[i] === choice) {
        choiceElement.checked = true;
      }

      // Save answer on selection
      choiceElement.addEventListener("change", () => {
        userAnswers[i] = choice;
        saveProgress(userAnswers);
      });

      const label = document.createElement("label");
      label.textContent = choice;

      questionElement.appendChild(choiceElement);
      questionElement.appendChild(label);
      questionElement.appendChild(document.createElement("br"));
    }

    questionsElement.appendChild(questionElement);
  }
}

// ----------------- CALCULATE SCORE -----------------
function calculateScore() {
  let score = 0;
  for (let i = 0; i < questions.length; i++) {
    if (userAnswers[i] === questions[i].answer) {
      score++;
    }
  }
  return score;
}

// ----------------- HANDLE SUBMIT -----------------
submitBtn.addEventListener("click", () => {
  const score = calculateScore();
  scoreElement.textContent = `Your score is ${score} out of ${questions.length}.`;

  saveScore(score); // persist in localStorage
});

// ----------------- RESTORE LAST SCORE -----------------
window.addEventListener("load", () => {
  const lastScore = localStorage.getItem("score");
  if (lastScore !== null) {
    scoreElement.textContent = `Your score is ${lastScore} out of ${questions.length}.`;
  }
});

// ----------------- INITIAL RENDER -----------------
renderQuestions();
