import { actions, Heap, manhattanDist } from '../bundles.js'

// Best-First Search Pathfinding Algorithm
export function best(algorithm, grid, start, end) {
    algorithm.grid = grid;
    let currentNode = algorithm.grid[start[COL]][start[ROW]];
  
    // Create a heap
    let heap = new Heap();
    heap.push(currentNode, 0);

    // Iterate until path is found (if one exists)
    while(heap.length > 0) {
      currentNode = heap.pop();
      // currentNode.inQueue = false;
      currentNode.isVisited = true;
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
        let dist = manhattanDist(neighbor, end);
        // Push into heap, set as in queue, and update parent
        if(!neighbor.inQueue) {
          neighbor.inQueue = true;
          neighbor.parent = currentNode;
          heap.push(neighbor, dist);
        }
      });
    }
  } 