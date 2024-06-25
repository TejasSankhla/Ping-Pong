// Your script should start when basic html dom is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Write action here
  const paddle = document.getElementById("paddle");
  const ball = document.getElementById("ball");
  const table = document.getElementById("table");
  const scoreValue=document.getElementById('score-value');
  // paddle position
  let py = 0;
  const pdy = 30;

  // Ball positions
  let by = 50,
    bx = 50;
  let bdx = 2,
    bdy = 2;
  // score
  var score = 0;
  setInterval(() => {
    // All logic here
    // making ball move
    bx += bdx;
    by += bdy;
    ball.style.top = `${by}px`;
    ball.style.left = `${bx}px`;

    // constarining inside box
    if (bx >= table.offsetWidth - ball.offsetWidth || bx < 0) bdx *= -1;
    if (by >= table.offsetHeight - ball.offsetHeight || by < 0) bdy *= -1;
    if (
      bx <= paddle.offsetLeft + paddle.offsetWidth &&
      by + ball.offsetHeight < paddle.offsetTop + paddle.offsetHeight &&
      by > paddle.offsetTop
    ) {
      bdx *= -1;
      score++;
        scoreValue.innerText=score;
    }
  }, 5);

  // controlling paddle
  document.addEventListener("keydown", (event) => {
    event.preventDefault();
    if (event.keyCode == 40 && py + paddle.offsetHeight < table.offsetHeight) {
      py += pdy;
    } else if (event.keyCode == 38 && py > 0) {
      py += -1 * pdy;
    }
    paddle.style.top = `${py}px`;
  });
  document.addEventListener("mousemove", (event) => {
    if (event.clientX > table.offsetLeft + table.offsetWidth / 2) return;
    let mouseDistanceFromTop = event.clientY; // this is the distance of the mouse point from the top of the screen
    let distanceOfTableFromTop = table.offsetTop;
    let mousePointControl =
      mouseDistanceFromTop - distanceOfTableFromTop - paddle.offsetHeight / 2;
    py = mousePointControl;
    if (py <= 0 || py > table.offsetHeight - paddle.offsetHeight) return; // if bottom of the paddle touches bottom of the table return
    paddle.style.top = `${py}px`;
  });
});
