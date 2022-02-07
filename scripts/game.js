function resetGameStatus() {
  activePlayer = 0;
  currentRound = 1;
  gameIsOver = false;
  gameOverElement.firstElementChild.innerHTML =
    "You won, <span id='winner-name'>PLAYER NAME</span>";
  gameOverElement.style.display = "none";
  let gameBoardIndex = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      gameData[i][j] = 0;
      const gmBdItemEl = gameBoardElement.children[gameBoardIndex];
      gmBdItemEl.classList.remove("disabled");
      gmBdItemEl.textContent = "";
      gameBoardIndex++;
    }
  }
}

function startNewGame() {
  if (players[0].name === "" || players[1].name === "") {
    alert("Please set custom player names for both players!");
    return;
  }

  gameAreaElement.style.display = "block";
  activePlayerNameElement.textContent = players[activePlayer].name;
  resetGameStatus();
}

function switchPlayer() {
  if (activePlayer === 0) activePlayer = 1;
  else activePlayer = 0;
  activePlayerNameElement.textContent = players[activePlayer].name;
}

function selectGameField(event) {
  if (gameIsOver) return;
  const selectedField = event.target;
  const selectedColumn = selectedField.dataset.col - 1;
  const selectedRow = selectedField.dataset.row - 1;

  if (gameData[selectedRow][selectedColumn] > 0) {
    alert("Please select an empty field!");
    return;
  }
  selectedField.textContent = players[activePlayer].symbol;
  selectedField.classList.add("disabled");
  gameData[selectedRow][selectedColumn] = activePlayer + 1;

  const winnerId = checkForGameOver();
  if (winnerId != 0) endGame(winnerId);
  currentRound++;
  switchPlayer();
}

function checkForGameOver() {
  //checking the rows for equality
  for (let r = 0; r < 3; r++) {
    if (
      gameData[r][0] > 0 &&
      gameData[r][0] === gameData[r][1] &&
      gameData[r][1] === gameData[r][2]
    ) {
      return gameData[r][0];
    }
  }
  //checking the columns for equality
  for (let c = 0; c < 3; c++) {
    if (
      gameData[0][c] > 0 &&
      gameData[0][c] === gameData[1][c] &&
      gameData[1][c] === gameData[2][c]
    ) {
      return gameData[0][c];
    }
  }
  //checking the diagoals for equality
  if (
    gameData[0][0] > 0 &&
    gameData[0][0] === gameData[1][1] &&
    gameData[1][1] == gameData[2][2]
  ) {
    return gameData[0][0];
  }
  if (
    gameData[2][0] > 0 &&
    gameData[2][0] === gameData[1][1] &&
    gameData[1][1] == gameData[0][2]
  ) {
    return gameData[2][0];
  }
  if (currentRound === 9) {
    return -1;
  }
  return 0;
}

function endGame(winnerId) {
  gameIsOver = true;
  gameOverElement.style.display = "block";
  if (winnerId > 0) {
    const winnerName = players[winnerId - 1].name;
    gameOverElement.firstElementChild.firstElementChild.textContent =
      winnerName;
  } else {
    gameOverElement.firstElementChild.textContent = "It's a draw";
  }
}
