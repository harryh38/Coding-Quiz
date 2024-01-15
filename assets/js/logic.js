console.log(questions);
let finalScore;
let startBtn = document.getElementById("start");
let quizScreen = document.getElementById("questions");
let score = 0;
let timeLeft = 60;
let qi = 0;
let timeInterval;
let timeEl = document.getElementById("time");
let highScore = JSON.parse(localStorage.getItem("highScore")) || [];
function clockTick() {
  timeLeft--;
  if (timeLeft < 0) {
    timeLeft = 0;
    endGame();
  }
  timeEl.textContent = timeLeft;
}
function startGame() {
  document.getElementById("start-screen").classList.add("hide");
  quizScreen.classList.remove("hide");
  timeInterval = setInterval(clockTick, 1000);
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
  document.querySelector(".timer").classList.add("hide");
  finalScore = score * timeLeft;
  document.getElementById("final-score").textContent = finalScore;
  clearInterval(timeInterval);
  console.log(finalScore);
}
startBtn.addEventListener("click", startGame);
document.getElementById("submit").addEventListener("click", function () {
  var initials = document.getElementById("initials").value;
  var scoreObject = {
    initials,
    finalScore,
  };
  highScore.push(scoreObject);
  localStorage.setItem("highScore", JSON.stringify(highScore));
  window.location.href = "/highscores.html";
});
