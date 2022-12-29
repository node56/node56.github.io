
let stackedProportionsChart = new Chart(document.getElementById("rock-chart"), {
  type: "line",
  data: {
    datasets: [
      {
        label: "Rock", // The label for the rock dataset
        data: [], // The data for the rock dataset
        backgroundColor: "#ff0000", // The fill color for the bar
        fill: 'origin',
      },
      {
        label: "Paper", // The label for the paper dataset
        data: [], // The data for the paper dataset
        backgroundColor: "#0000ff", // The fill color for the bar
        fill: '-1',
      },
      {
        label: "Scissors", // The label for the scissors dataset
        data: [], // The data for the scissors dataset
        backgroundColor: "#00ff00", // The fill color for the bar
        fill: '-1',
      }
    ]
  },
  options: {
    responsive: true, // Make the chart responsive to the size of the canvas
    scales: {
      xAxis: {
      },
      yAxis: {
      }
    }
  }
});

// Define the size of the grid
const GRID_WIDTH = 30;
const GRID_HEIGHT = 30;

// Define the possible states for each cell
const ROCK = "R";
const PAPER = "P";
const SCISSORS = "S";
let round = 0;
// Create the grid and initialize each cell with a random state
let grid = [];
for (let i = 0; i < GRID_HEIGHT; i++) {
  let row = [];
  for (let j = 0; j < GRID_WIDTH; j++) {
    row.push("RPS"[Math.floor(Math.random() * 3)]);
  }
  grid.push(row);
}

// Define the rules of the game
function playMatch(player1, player2) {
  if (player1 === player2) {
    return player1;
  } else if (
    (player1 === ROCK && player2 === SCISSORS) ||
    (player1 === SCISSORS && player2 === PAPER) ||
    (player1 === PAPER && player2 === ROCK)
  ) {
    return player1;
  } else {
    return player2;
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
  let rockTotal = 0;
  let paperTotal = 0;
  let scissorsTotal = 0;
  
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
      let topMove = grid[(i + GRID_WIDTH -1) % GRID_WIDTH][j];
      let bottomMove = grid[(i + 1) % GRID_WIDTH][j];
      let leftMove = grid[i][(j + GRID_HEIGHT -1) % GRID_HEIGHT];
      let rightMove = grid[i][(j + 1) % GRID_HEIGHT];
      dir = Math.floor(Math.random() * 4)
      if (dir % 4 === 0) { newGrid[i][j] = playMatch(cellMove, topMove); }
      if (dir % 4 === 1) { newGrid[i][j] = playMatch(cellMove, leftMove); }
      if (dir % 4 === 2) { newGrid[i][j] = playMatch(cellMove, bottomMove); }
      if (dir % 4 === 3) { newGrid[i][j] = playMatch(cellMove, rightMove); }
      let c = newGrid[i][j];
      if (c === "R") rockTotal++;
      if (c === "P") paperTotal++;
      if (c === "S") scissorsTotal++;
    }
  }
  round = round + 1;
 
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
  // Calculate the total number of items
  let total = rockTotal + paperTotal + scissorsTotal;

  // Calculate the proportions of each item
  let rockProportion = rockTotal / total;
  let paperProportion = paperTotal / total + paperProportion;
  let scissorsProportion = scissorsTotal / total + scissorsProportion;

  // Update the chart data
  stackedProportionsChart.data.labels.push(round);
  stackedProportionsChart.data.datasets[0].data.push(rockProportion);
  stackedProportionsChart.data.datasets[1].data.push(paperProportion);
  stackedProportionsChart.data.datasets[2].data.push(scissorsProportion);
  if (round > 100) {
    stackedProportionsChart.data.labels.shift();
    stackedProportionsChart.data.datasets[0].data.shift();
    stackedProportionsChart.data.datasets[1].data.shift();
    stackedProportionsChart.data.datasets[2].data.shift();
  }
  stackedProportionsChart.update(); // Update the chart
}, 200);
