const quiz = [
  {
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    answer: "4"
  },
  {
    question: "Capital of Pakistan?",
    options: ["Lahore", "Karachi", "Islamabad", "Peshawar"],
    answer: "Islamabad"
  },
  {
    question: "Which is a programming language?",
    options: ["HTML", "CSS", "JavaScript", "All of these"],
    answer: "All of these"
  }
];


let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const resultEl = document.getElementById("result");
const scoreEl = document.getElementById("score");
const nextBtn = document.getElementById("nextBtn");


const retakeBtn = document.createElement("button");
retakeBtn.innerText = "Retake Quiz";
retakeBtn.style.display = "none";
retakeBtn.style.marginTop = "10px";
document.querySelector(".container").appendChild(retakeBtn);


function loadQuestion() {
  const q = quiz[currentQuestion];

  questionEl.innerText = q.question;
  optionsEl.innerHTML = "";

  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.innerText = option;
    btn.classList.add("option");

    btn.onclick = () => checkAnswer(option);

    optionsEl.appendChild(btn);
  });

  resultEl.innerText = "";
  nextBtn.style.display = "none";

  
  scoreEl.innerText = `Score: ${score}/${quiz.length}`;
}


function checkAnswer(selected) {
  const correct = quiz[currentQuestion].answer;

  if (selected === correct) {
    resultEl.innerText = "Correct";
    score++;
  } else {
    resultEl.innerText = "Wrong";
  }

  scoreEl.innerText = `Score: ${score}/${quiz.length}`;
  nextBtn.style.display = "block";

  document.querySelectorAll(".option").forEach(btn => {
    btn.disabled = true;
  });
}

nextBtn.addEventListener("click", () => {
  currentQuestion++;

  if (currentQuestion < quiz.length) {
    loadQuestion();
  } else {
    
    questionEl.innerText = "Quiz Finished!";
    optionsEl.innerHTML = "";
    resultEl.innerText = "";

    nextBtn.style.display = "none";
    scoreEl.innerText = `Final Score: ${score}/${quiz.length}`;

    retakeBtn.style.display = "inline-block";
  }
});


retakeBtn.addEventListener("click", () => {
  currentQuestion = 0;
  score = 0;

  loadQuestion();
});


loadQuestion();
function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";

  if (isCorrect) {
    selectedBtn.classList.add("correct");
  } else {
    selectedBtn.classList.add("wrong");
  }

  // Sab buttons disable + correct highlight
  Array.from(options.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
}