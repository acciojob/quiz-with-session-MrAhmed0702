//your JS code here.
function getProgress(){
	return JSON.parse(sessionStorage.getItem("progress")) || {};
}

function saveProgress(obj){
	sessionStorage.setItem("progress", JSON.stringify(obj));
}

const questionsElement = document.getElementById('questions');
const userAnswers = getProgress();

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

// Display the quiz questions and choices
function renderQuestions() {
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const questionElement = document.createElement("div");
    const questionText = document.createTextNode(question.question);
    questionElement.appendChild(questionText);
	  
    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];
      const choiceElement = document.createElement("input");
      choiceElement.setAttribute("type", "radio");
      choiceElement.setAttribute("name", `question-${i}`);
      choiceElement.setAttribute("value", choice);

	  choiceElement.addEventListener("change", () => {
		  userAnswers[i] = choice;
		  saveProgress(userAnswers);
	  });
		
      if (userAnswers[i] === choice) {
        choiceElement.setAttribute("checked", true);
      }
		
      const choiceText = document.createTextNode(choice);
      questionElement.appendChild(choiceElement);
      questionElement.appendChild(choiceText);
    }
    questionsElement.appendChild(questionElement);
  }
	
}

renderQuestions();

const score = document.getElementById("score");
const submit = document.getElementById("submit");
submit.addEventListener('click', () => {
	let count = 0;
	for(let i = 0; i < questions.length; i++){
		if(userAnswers[i] === questions[i].answer){
			count++;
		}
	}

	localStorage.setItem("score", count);

	score.textContent = `Your score is ${count} out of 5.`;
})


const savedScore = localStorage.getItem("score");
if (savedScore !== null) {
	score.textContent = `Your score is ${savedScore} out of 5.`;
}