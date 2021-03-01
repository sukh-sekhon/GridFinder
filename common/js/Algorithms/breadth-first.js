import { actions } from '../bundles.js'

// Breadth-First Search Pathfinding Algorithm
export function bfs(algorithm, grid, start, end) {
  algorithm.grid = grid;
  let currentNode = algorithm.grid[start[COL]][start[ROW]];

  let array = [];
  array.push(currentNode);

  // Iterate until path is found (if one exists)
  while(array.length > 0) {
    currentNode = array.shift();
    currentNode.isVisited = true;
    currentNode.inQueue = false;
    algorithm.countNodeVisited++;

    // Set as visited
    actions.push(currentNode, function(node) {
      node.target.classList.add("visited");
    });

    // Path is Found
    if(currentNode.col == end[COL] && currentNode.row == end[ROW]) {
      algorithm.setPath(currentNode); 
      algorithm.isPathFound = true;
      break;
    }

    // Get all nodes adjacent to current
    let neighbors = algorithm.getAdjacentNodes(currentNode);

    // Check each neighbour
    neighbors.forEach(node => {
      let neighbor = algorithm.grid[node[COL]][node[ROW]];
      if(!neighbor.inQueue) {
        array.push(neighbor);
        neighbor.parent = currentNode;
        neighbor.inQueue = true;
      }
    });
  }
} 