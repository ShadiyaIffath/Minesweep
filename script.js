import { createBoard, markTile, minesMarkedCount } from "./minesweeper.js";

const BOARD_SIZE = 10;
const NUMBER_OF_MINES = 10;

const board = createBoard(BOARD_SIZE, NUMBER_OF_MINES);
console.log(board);
const boardElement = document.querySelector(".board");
const mineCountElement = document.querySelector("[mine-count]");

board.forEach((row) => {
  row.forEach((tile) => {
    boardElement.append(tile.element);
    tile.element.addEventListener("click", () => {});
    tile.element.addEventListener("contextmenu", (event) => {
      event.preventDefault();
      markTile(tile);
      mineCountElement.textContent = NUMBER_OF_MINES - minesMarkedCount();
    });
  });
});
boardElement.style.setProperty("--size", BOARD_SIZE);
mineCountElement.textContent = NUMBER_OF_MINES;
