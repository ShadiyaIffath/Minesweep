const TILE_STATUSES = {
  HIDDEN: "hidden",
  MINE: "mine",
  MARKED: "marked",
  NUMBER: "number",
};

const board = [];

export function createBoard(boardSize, numberOfMines) {
  const minePositions = createMines(boardSize, numberOfMines);

  for (let x = 0; x < boardSize; x++) {
    const row = [];
    for (let y = 0; y < boardSize; y++) {
      const element = document.createElement("div");
      element.addEventListener("click", (mouseEvent) => {});
      element.dataset.status = TILE_STATUSES.HIDDEN;

      const tile = {
        x,
        y,
        mine: minePositions.some((position) =>
          isPositionAMatch(position, { x, y })
        ),
        element,
        get status() {
          return this.element.dataset.status;
        },
        set status(value) {
          this.element.dataset.status = value;
        },
      };
      row.push(tile);
    }

    board.push(row);
  }

  return board;
}

export function markTile(tile) {
  if (tile.status === TILE_STATUSES.MARKED) {
    tile.status = TILE_STATUSES.HIDDEN;
  } else if (tile.status === TILE_STATUSES.HIDDEN) {
    tile.status = TILE_STATUSES.MARKED;
  }
}

export function getMinesMarkedCount() {
  const minesMarked = board.reduce((count, row) => {
    return (
      count +
      row.filter(
        (tile) => tile.status === TILE_STATUSES.MARKED && tile.mine === true
      ).length
    );
  }, 0);
  return minesMarked;
}

export function revealTile(tile) {
  if (tile.status !== TILE_STATUSES.HIDDEN) {
    return;
  }

  if (tile.mine === true) {
    tile.status = TILE_STATUSES.MINE;
  }

  tile.status = TILE_STATUSES.NUMBER;
  const adjacentTiles = getAdjacentTiles(tile);
  const mines = adjacentTiles.filter((t) => t.mine);

  if (mines.length == 0) {
    adjacentTiles.forEach(revealTile.bind());
  } else {
    tile.element.textContent = mines.length;
  }
}

function getAdjacentTiles(tile) {
  let tiles = [];
  for (let x = -1; x <= 1; x++) {
    const row = board[tile.x + x];
    if (typeof row !== "undefined") {
      for (let y = -1; y <= 1; y++) {
        const adjacentTile = row[tile.y + y];
        if (typeof adjacentTile !== "undefined") {
          tiles.push(adjacentTile);
        }
      }
    }
  }
  return tiles;
}

function createMines(boardSize, numberOfMines) {
  const positions = [];
  while (positions.length < numberOfMines) {
    const generatedPosition = {
      x: randomNumber(boardSize),
      y: randomNumber(boardSize),
    };

    if (
      !positions.some((position) =>
        isPositionAMatch(generatedPosition, position)
      )
    ) {
      positions.push(generatedPosition);
    }
  }
  return positions;
}

function isPositionAMatch(randomPosition, listedPosition) {
  return (
    randomPosition.x == listedPosition.x && randomPosition.y == listedPosition.y
  );
}

function randomNumber(size) {
  return Math.floor(Math.random() * size);
}
