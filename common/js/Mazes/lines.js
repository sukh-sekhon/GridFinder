import { gridDim, blockNode, getRandRange } from '../bundles.js'

var rows = gridDim.height;
var cols = gridDim.width;

// Random horizontal or verical lines
export function lines(grid) {
    let isHorizontal = Math.random() > 0.5;
    let passages = []; // Passages to create in each line
    var lineOrder = []; // Order to push the lines

    if (isHorizontal) {
        passages = getPassages(cols, rows);
        lineOrder = getLineOrder(passages.length);
    }
    else {
        passages = getPassages(rows, cols);
        lineOrder = getLineOrder(passages.length);
    }    
    
    let result = getResult(isHorizontal, passages, lineOrder)

    // Block nodes
    result.forEach(function(item) {
        blockNode(grid[item[COL]][item[ROW]]);
    });
}

// Get the result of nodes to push
// Params:
//      isHorizontal:   If the lines will be drawn horizontally
//      passages:       list of passages to make
//      lineOrder:   order to draw lines
//      subStart:       start node of subgrid
//      subEnd:         end node of subgrid
function getResult(isHorizontal, passages, lineOrder) {
    let result = [];

    for(let i = 0; i < passages.length; i++) {
        let line = lineOrder[i];
        if (!isHorizontal) {
            for (let c = 0; c < cols ; c++) {
                if (c !== passages[line]) {
                    result.push([c, 2*line + 1]);
                }
            }
        }
        else {
            for (let r = 0; r < rows; r++) {
                if (r !== passages[line]) {
                    result.push([2*line + 1, r]);
                }
            }
        }
    };
    return result;
}

// Get random passages based on length (number of lines) and range (number of rows or columns)
function getPassages(length, range) {
    let numLines = Math.floor((length - 1) / 2);
    let passages = [];
    for (let i = 0; i < numLines; i++) {
        passages.push(getRandRange(1, range-1));
    }
    return passages;
}

// Get order to push lines
function getLineOrder(lineCount) {
    let order = [];
    for (let i = 0; i < lineCount; i++){
        order[i] = i;
    }
    return shuffleArray(order)
}

// Shuffer order of array
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * i);
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}