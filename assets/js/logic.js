console.log(questions);
let startBtn = document.getElementById("start");
let quizScreen = document.getElementById("questions");
let score = 0;
let timeLeft = 60;
let qi = 0;
function startGame() {
  document.getElementById("start-screen").classList.add("hide");
  quizScreen.classList.remove("hide");
  loadQuestion();
}
function loadQuestion() {
  document.getElementById("choices").innerHTML = "";
  document.getElementById("question-title").textContent = questions[qi].text;
  questions[qi].choices.forEach(function (choice) {
    let btn = document.createElement("button");
    btn.textContent = choice;
    btn.setAttribute("value", choice);
    btn.addEventListener("click", function () {
      if (this.value === questions[qi].correct) {
        score++;
      } else {
        timeLeft -= 10;
      }
      qi++;
      if (qi === questions.length) {
        endGame();
      } else {
        loadQuestion();
      }
    });
    document.getElementById("choices").appendChild(btn);
  });
}
function endGame() {
  quizScreen.classList.add("hide");
  document.getElementById("end-screen").classList.remove("hide");
}
startBtn.addEventListener("click", startGame);
