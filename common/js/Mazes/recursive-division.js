import { blockNode, getRandRange, gridDim } from '../bundles.js'

// Grid generated with recursive division
export function recursive(grid) {
    let nodeList = [];
    let isHorizontal = Math.random() > 0.5;
    let start = [0, 0];
    let end = [gridDim.width - 1, gridDim.height - 1];

    // Recursively divide grid
    nodeList = divide(grid, nodeList, isHorizontal, start, end);

    // Block nodes
    nodeList.forEach(function (elem) {
        blockNode(grid[elem[COL]][elem[ROW]]);
    });
}

// Recursive function
// Params:
//      Grid:           grid being updated
//      nodeList:       list of nodes to block
//      isHorizontal:   true if being divided horizontally, false otherwise
//      subStart:       start node of subgrid
//      subEnd:         end node of subgrid
function divide(grid, nodeList, isHorizontal, subStart, subEnd) {
    // divide horizontally
    if (isHorizontal) {
        // Stop dividing
        if (subEnd[COL] - subStart[COL] < 2) {
            return;
        }
        var wallY = Math.floor(getRandRange(subStart[ROW], subEnd[ROW]) / 2) * 2;
        createHorizontalWall(nodeList, subStart[COL], subEnd[COL], wallY);
        divide(grid, nodeList, !isHorizontal, [subStart[COL], wallY+1], subEnd);
        divide(grid, nodeList, !isHorizontal, subStart, [subEnd[COL], wallY-1]);
    } 
    // divide vertically
    else {
        // Stop dividing
        if (subEnd[ROW] - subStart[ROW] < 2) {
            return;
        }
        var wallX = Math.floor(getRandRange(subStart[COL], subEnd[COL]) / 2) * 2;
        createVerticalWall(nodeList, subStart[ROW], subEnd[ROW], wallX);
        divide(grid, nodeList, !isHorizontal, [wallX+1, subStart[ROW]], subEnd);
        divide(grid, nodeList, !isHorizontal, subStart, [wallX-1, subEnd[ROW]]);
    }
    return nodeList;
}

// Create a horizontal wall with a passage
// Params:
//      nodeList:       list of nodes to block
//      start:          start index of wall  
//      end:            end index of wall
//      y:              y position of wall
function createHorizontalWall(nodeList, start, end, y) {
    let passage = getPassageIndex(start, end);
    for (let i = start ; i <= end; i++) {
        // Block node if not passage
        if (i !== passage) {
            nodeList.push([i, y]);
        }   
    }
}

// Create a vertical wall with a passage
// Params:
//      nodeList:       list of nodes to block
//      start:          start index of wall  
//      end:            end index of wall
//      x:              x position of wall
function createVerticalWall(nodeList, start, end, x) {
    let passage = getPassageIndex(start, end);
    for (let i = start; i <= end; i++) {
        // Block node if not passage
        if (i !== passage) {
            nodeList.push([x, i]);
        }
    }
}

// Get index of passage in wall
function getPassageIndex(min, max) {
    return Math.floor(getRandRange(min, max) / 2) * 2 + 1;
}