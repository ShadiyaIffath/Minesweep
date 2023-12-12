import {
  createBoard,
  markTile,
  getMinesMarkedCount,
  revealTile,
  checkLoose,
  checkWin,
  revealAllMines,
} from "./minesweeper.js";

const BOARD_SIZE = 10;
const NUMBER_OF_MINES = 10;

const board = createBoard(BOARD_SIZE, NUMBER_OF_MINES);

const boardElement = document.querySelector(".board");
const mineCountElement = document.querySelector("[mine-count]");
const messageElement = document.querySelector(".subtext");

board.forEach((row) => {
  row.forEach((tile) => {
    boardElement.append(tile.element);
    tile.element.addEventListener("click", () => {
      revealTile(tile);
      updateGameStatus();
    });
    tile.element.addEventListener("contextmenu", (event) => {
      event.preventDefault();
      markTile(tile);
      updateGameStatus();
      mineCountElement.textContent = NUMBER_OF_MINES - getMinesMarkedCount();
    });
  });
});
boardElement.style.setProperty("--size", BOARD_SIZE);
mineCountElement.textContent = NUMBER_OF_MINES;

function updateGameStatus() {
  const win = checkWin(NUMBER_OF_MINES);
  const lose = checkLoose();

  if (lose || win) {
    boardElement.addEventListener("click", stopEventPropogation, {
      capture: true,
    });
    boardElement.addEventListener("contextmenu", stopEventPropogation, {
      capture: true,
    });
    revealAllMines();
  }

  if (lose) {
    messageElement.textContent = "Oops, You Lose!";
  }
  if (win) {
    messageElement.textContent = "You Win!";
  }
}

function stopEventPropogation(event) {
  event.stopImmediatePropagation();
}
