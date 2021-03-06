import { actions, Heap, manhattanDist } from '../bundles.js'

// A-Star Search Pathfinding Algorithm
export function astar(algorithm, grid, start, end) {
  algorithm.grid = grid;
  let startNode = algorithm.grid[start[COL]][start[ROW]];

  // Create a heap
  let heap = new Heap();
  startNode.g = 0;
  startNode.f = manhattanDist(start, end);
  heap.push(startNode, startNode.g);

  // Iterate until path is found (if one exists)
  while(heap.length > 0) {
    let currNode = heap.pop();

    currNode.isVisited = true;
    algorithm.countNodeVisited++;

    // Set as visited
    actions.push(currNode, function(node) {
      node.target.classList.add("visited");
    });

    // Path is Found
    if(currNode.col == end[COL] && currNode.row == end[ROW]) {
      algorithm.setPath(currNode);
      algorithm.isPathFound = true;
      break;
    }

    // Get all nodes adjacent to current
    let neighbors = algorithm.getAdjacentNodes(currNode, algorithm.checkDiagonals);

    // Check each neighbour
    neighbors.forEach(node => {
      let neighbor = algorithm.grid[node[COL]][node[ROW]];
      let shortestG = currNode.g;
      let isVisited = neighbor.isVisited;

      // If currently the most optimal neighbour
      if (!isVisited || shortestG < neighbor.g) {
        neighbor.isVisited = true;
        neighbor.parent = currNode;
        neighbor.g = shortestG;
        neighbor.f = neighbor.g + manhattanDist(neighbor, end);
        // Push into heap and set as in queue
        if(!isVisited) {
          neighbor.inQueue = true;
          heap.push(neighbor, neighbor.f);
        } 
        // Needs to be sorted again
        else {
          heap.bubbleDown(neighbor.f);
        }
      }
    });
  }
} 