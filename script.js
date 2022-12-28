// Define the size of the grid
const GRID_WIDTH = 10;
const GRID_HEIGHT = 10;

// Define the possible states for each cell
const ROCK = 0;
const PAPER = 1;
const SCISSORS = 2;

// Create the grid and initialize each cell with a random state
let grid = [];
for (let i = 0; i < GRID_HEIGHT; i++) {
  let row = [];
  for (let j = 0; j < GRID_WIDTH; j++) {
    row.push(Math.floor(Math.random() * 3));
  }
  grid.push(row);
}

// Define the rules of the game
function playMatch(player1, player2) {
  if (player1 === player2) {
    return "tie";
  } else if (
    (player1 === ROCK && player2 === SCISSORS) ||
    (player1 === SCISSORS && player2 === PAPER) ||
    (player1 === PAPER && player2 === ROCK)
  ) {
    return "player1";
  } else {
    return "player2";
  }
}

// Create the grid elements and add them to the webpage
const gridContainer = document.getElementById("grid-container");
for (let i = 0; i < GRID_HEIGHT; i++) {
  for (let j = 0; j < GRID_WIDTH; j++) {
  // Create a new element for the cell
    let cell = document.createElement("div");
    cell.classList.add("cell");
    cell.textContent = grid[i][j];

    // Add the appropriate class based on the cell's state
    if (grid[i][j] === ROCK) {
      cell.classList.add("rock");
    } else if (grid[i][j] === PAPER) {
      cell.classList.add("paper");
    } else if (grid[i][j] === SCISSORS) {
      cell.classList.add("scissors");
    }

    // Add the cell to the grid
    gridContainer.appendChild(cell);
  }
}

// Play the game
setInterval(() => {
  // Create a new grid to store the updated state of each cell
  let newGrid = [];
  for (let i = 0; i < GRID_HEIGHT; i++) {
    let row = [];
    for (let j = 0; j < GRID_WIDTH; j++) {
      row.push(0);
    }
    newGrid.push(row);
  }

  // Iterate over each cell in the grid
  for (let i = 0; i < GRID_HEIGHT; i++) {
    for (let j = 0; j < GRID_WIDTH; j++) {
      // Get the moves of the current cell and its neighbors
      let cellMove = grid[i][j];
      let topMove = grid[i - 1] ? grid[i - 1][j] : Math.floor(Math.random() * 3);
      let bottomMove = grid[i + 1] ? grid[i + 1][j] : Math.floor(Math.random() * 3);
      let leftMove = grid[i][j - 1] ?
      let rightMove = grid[i][j + 1] ? grid[i][j + 1] : Math.floor(Math.random() * 3);

      // Play a match against the appropriate neighbors and update the cell's state based on the result
      if (i % 2 === 0) {
        // Play against row neighbors
        if (playMatch(cellMove, topMove) === "player1") {
          newGrid[i][j] = cellMove;
        } else if (playMatch(cellMove, topMove) === "player2") {
          newGrid[i][j] = topMove;
        } else if (playMatch(cellMove, bottomMove) === "player1") {
          newGrid[i][j] = cellMove;
        } else if (playMatch(cellMove, bottomMove) === "player2") {
          newGrid[i][j] = bottomMove;
        }
      } else {
        // Play against column neighbors
        if (playMatch(cellMove, leftMove) === "player1") {
          newGrid[i][j] = cellMove;
        } else if (playMatch(cellMove, leftMove) === "player2") {
          newGrid[i][j] = leftMove;
        } else if (playMatch(cellMove, rightMove) === "player1") {
          newGrid[i][j] = cellMove;
        } else if (playMatch(cellMove, rightMove) === "player2") {
          newGrid[i][j] = rightMove;
        }
      }
    }
  }

  // Update the grid with the new state of each cell
  grid = newGrid;

  // Update the grid elements on the webpage
  let cells = gridContainer.querySelectorAll(".cell");
  for (let i = 0; i < cells.length; i++) {
    cells[i].textContent = grid[Math.floor(i / GRID_WIDTH)][i % GRID_WIDTH];

    // Update the appropriate class based on the cell's state
    if (grid[Math.floor(i / GRID_WIDTH)][i % GRID_WIDTH] === ROCK) {
      cells[i].classList.remove("paper", "scissors");
      cells[i].classList.add("rock");
    } else if (grid[Math.floor(i / GRID_WIDTH)][i % GRID_WIDTH] === PAPER) {
      cells[i].classList.remove("rock", "scissors");
      cells[i].classList.add("paper");
    } else if (grid[Math.floor(i / GRID_WIDTH)][i % GRID_WIDTH] === SCISSORS) {
      cells[i].classList.remove("rock", "paper");
      cells[i].classList.add("scissors");
    }
  }
}, 1000);
