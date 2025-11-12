// pega o canvas e contexto
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// tamanho da raquete aumentado em 40%
const paddleWidth = 10;
const paddleHeight = 140; // antes era 100
const ballSize = 10;

// posicao inicial das raquetes
let leftY = canvas.height / 2 - paddleHeight / 2;
let rightY = canvas.height / 2 - paddleHeight / 2;

// velocidade das raquetes
const paddleSpeed = 7;

// bola
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 5;
let ballSpeedY = 3;

// controle das teclas
let keys = {};

// evento de teclas
document.addEventListener("keydown", (e) => (keys[e.key] = true));
document.addEventListener("keyup", (e) => (keys[e.key] = false));

// atualiza o jogo a cada frame
function update() {
  // move raquete esquerda (W e S)
  if (keys["w"] && leftY > 0) leftY -= paddleSpeed;
  if (keys["s"] && leftY < canvas.height - paddleHeight)
    leftY += paddleSpeed;

  // move raquete direita (setas)
  if (keys["ArrowUp"] && rightY > 0) rightY -= paddleSpeed;
  if (keys["ArrowDown"] && rightY < canvas.height - paddleHeight)
    rightY += paddleSpeed;

  // move bola
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // colisao com parede
  if (ballY <= 0 || ballY + ballSize >= canvas.height) {
    ballSpeedY = -ballSpeedY;
  }

  // colisao com raquete esquerda
  if (
    ballX <= 20 &&
    ballY + ballSize > leftY &&
    ballY < leftY + paddleHeight
  ) {
    ballSpeedX = -ballSpeedX;
  }

  // colisao com raquete direita
  if (
    ballX + ballSize >= canvas.width - 20 &&
    ballY + ballSize > rightY &&
    ballY < rightY + paddleHeight
  ) {
    ballSpeedX = -ballSpeedX;
  }

  // reseta bola se sair da tela
  if (ballX < 0 || ballX > canvas.width) {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = -ballSpeedX;
  }
}

// desenha tudo
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // raquete esquerda
  ctx.fillStyle = "white";
  ctx.fillRect(10, leftY, paddleWidth, paddleHeight);

  // raquete direita
  ctx.fillRect(canvas.width - 20, rightY, paddleWidth, paddleHeight);

  // bola
  ctx.fillRect(ballX, ballY, ballSize, ballSize);
}

// loop do jogo
function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

// inicia o jogo
document.getElementById("startButton").addEventListener("click", () => {
  document.getElementById("menu").style.display = "none";
  canvas.style.display = "block";
  gameLoop();
});
