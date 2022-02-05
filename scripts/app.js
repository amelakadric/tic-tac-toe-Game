const playerConfigOverlayElement = document.getElementById("config-overlay");
const backDropElement = document.getElementById("backdrop");

const editPlayer1ButtonElement = document.getElementById("edit-player1-btn");
const editPlayer2ButtonElement = document.getElementById("edit-player2-btn");
const cancelConfigButtonElement = document.getElementById("cancel-config-btn");

editPlayer1ButtonElement.addEventListener("click", openPlayerConfig);
editPlayer2ButtonElement.addEventListener("click", openPlayerConfig);

cancelConfigButtonElement.addEventListener("click", closePlayerConfig);
backDropElement.addEventListener("click", closePlayerConfig);
