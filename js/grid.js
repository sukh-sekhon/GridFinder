import { algorithm, actions, maze, node, getRand, clearStatistics } from './bundles.js'
export { grid, gridDim, start, end, setCustomStartNode, setCustomEndNode, setRandomStartEndNodes, createGrid, clearGrid, clearVisitedNodes }

/**
 * Setting up grid 
 */

 // Global constant variables
const global = (0,eval)("this");
global.COL = 0;
global.ROW = 1;

// Grid containing nodes
let grid = [];

// Grid Dimensions (window size dependant)
let gridDim = { 
    width:  Math.floor(window.innerWidth / 35), 
    height: Math.floor((window.innerHeight / 25) - 8)
}

// Start/End Nodes
let start = [0, 0];
let end = [0, 0];

// Set Start/End Nodes as Default
function setDefaultStartEndNodes() {
    start.col = Math.floor(gridDim.width / 4);
    start.row = Math.floor(gridDim.height / 2);
    end.col   = Math.ceil(3 * gridDim.width / 4);
    end.row   = start.row;

    setCustomStartNode(start.col, start.row);
    setCustomEndNode(end.col, end.row);
}

// Set a user defined Start Node and clear it
function setCustomStartNode(col, row) {
    let node = grid[start.col][start.row];
    node.clearNode();
    node.clearNodeClassList();
    start.col = col;
    start.row = row;
    setStartEndNodeClasses(true, start.col, start.row);
}

// Set a user defined End Node and clear it
function setCustomEndNode(col, row) {
    let node = grid[end.col][end.row];
    node.clearNode();
    node.clearNodeClassList();
    end.col   = col;
    end.row   = row;
    setStartEndNodeClasses(false, end.col, end.row);
}

// Set classlists of start/end node
function setStartEndNodeClasses(isStartNode, col, row) {
    if (isStartNode) {
        grid[col][row].target.classList.add("start-node", "fas", "fa-arrow-right");
    }
    else {
        grid[col][row].target.classList.add("end-node", "far", "fa-dot-circle");
    }
}

// Set random start/end nodes
function setRandomStartEndNodes() {
    setCustomStartNode(getRand(gridDim.width), getRand(gridDim.height));
    // Ensure that the end node is unique
    do {
        setCustomEndNode(getRand(gridDim.width), getRand(gridDim.height));
    } while (start.col === end.col && start.row === end.row);
}

// Create a grid
function createGrid() {
    // Initialize empty grid
    grid = Array.from(Array(gridDim.width), () => new Array(gridDim.height));
    let table = document.querySelector("#grid-table");

    for(let row = 0; row < gridDim.height; row++) {
    // Append rows to DOM
        let tableRow = document.createElement("tr");
        tableRow.setAttribute("id", "row" + row);
        table.appendChild(tableRow);

        // Append cols to rows
        for(let col = 0; col < gridDim.width; col++) {
            let tableCell = document.createElement("td");
            tableCell.setAttribute("id", "c" + col + "r" + row);
            tableRow.appendChild(tableCell);
            grid[col][row] = new node(col, row, tableCell);
        }
    }
    setDefaultStartEndNodes();
}

// Wipe grid and resets start/end points and statistics
function clearGrid() {
    actions.clear();
    algorithm.isRunning = false;
    maze.isGenerating = false;
  
    for(let col = 0; col < gridDim.width; col++) {
      for(let row = 0; row < gridDim.height; row++) {
          let node = grid[col][row];
            node.clearNode();
            node.clearNodeClassList();
        }
    }

    setDefaultStartEndNodes();
    clearStatistics();
}

// Wipe nodes that are visited
function clearVisitedNodes() {
    for(let col = 0; col < gridDim.width; col++) {
        for(let row = 0; row < gridDim.height; row++) {
            let node = grid[col][row];
            if (node.isVisitedOrBlocked()) {
                node.target.classList.remove("path");
                node.target.classList.remove("visited");
            }
            node.clearNode();
        }
    }
}