import { gridDim, actions, bfs, astar, dfs, best, clearVisitedNodes, updateStatistics, getTimeStampCallback } from '../bundles.js'
export { algorithm }

/**
 * Pathfinding algorithms for finding minimal distance from start to end node
 */
const algorithm = {
  strategy: "best",       // What pathfinding strategy to use (default to best-first)
  grid: undefined,        // Grid
  isRunning: false,       // If an algorithm is running
  isPathFound: false,     // If the algorithm has found a path
  isEndNodeKnown: false,  // If the algorithm strategy knows where the end node is
  countNodeVisited: 0,    // Number of nodes visited
  countNodeInPath: 0,     // Number of nodes in path found
  timeToRun: 0,           // Time (ms) the algorithm took to run
};

// Get a function with most accurate time based on browser
let getTime = getTimeStampCallback();

// Set the pathfinding strategy
algorithm.setAlgorithmStrategy = function(strategy) {
  this.strategy = strategy;
};

// Find the path with minimum distance using the set strategy
algorithm.findPath = function(grid, start, end) {
  if(!this.isRunning) {
    // Clear grid and action queue
    clearVisitedNodes();
    actions.clear();
    // Set defaults
    this.isSearching = true;
    this.isPathFound = false;
    this.countNodeVisited = 0;
    this.countNodeInPath = 0;
    this.timeToRun = 0;

    // Run the algorithm based on strategy and capture time
    let startTime = getTime();
    algorithm[algorithm.strategy](grid, start, end);
    this.timeToRun = (getTime() - startTime) * 1000;
    
    // Execute actions, update statistics, and set running to false
    actions.run();
    updateStatistics();
    algorithm.isRunning = false;
  }
};

// Recursively set path
algorithm.setPath = function (node) {
  this.countNodeInPath++;
  // Set as part of path
  actions.push(node, function(node) {
    node.target.classList.add("path");
  });
  // Call if parent to node exists
  if (node.parent) {
    algorithm.setPath(node.parent);
  }
};

// Check if node is within the grid
algorithm.isNodeVisitable = function(col, row) {
  let isColInRange = col >= 0 && col < gridDim.width;
  let isRowInRange = row >= 0 && row < gridDim.height;
  // If valid col and row, check if visited or blocked
  if (isColInRange && isRowInRange) {
    let node = this.grid[col][row];
    return !(node.isVisited || node.isBlocked());
  }
  return false;
};

// Get the adjacent elements of a node (children)
algorithm.getAdjacentNodes = function(node) {
  let adjacentNodes = [];

  const NORTH =   [0, -1];
  const EAST =    [1, 0];
  const SOUTH =   [0, 1];
  const WEST =    [-1, 0];

  [NORTH, EAST, SOUTH, WEST].forEach(dir => {
    let curNode = [node.col + dir[COL], node.row + dir[ROW]];
    if (this.isNodeVisitable(curNode[COL], curNode[ROW])) {
      adjacentNodes.push(curNode);
    }
  });

  return adjacentNodes;
};

// A*
algorithm.astar = function(grid, start, end) {
  this.isEndNodeKnown = true;
  astar(algorithm, grid, start, end);
};
// Best First Search
algorithm.best = function(grid, start, end) {
  this.isEndNodeKnown = true;
  best(algorithm, grid, start, end);
};
// Breadth-First Search
algorithm.bfs = function(grid, start,end ) {
  this.isEndNodeKnown = false;
  bfs(algorithm, grid, start, end);
};
// Depth-First Search
algorithm.dfs = function(grid, start, end) {
  this.isEndNodeKnown = false;
  dfs(algorithm, grid, start, end);
};