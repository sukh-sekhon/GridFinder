import { gridDim, getRandRange, blockNode, start} from '../bundles.js'

// Randomly generated grid
export function radial(grid) {
    let nodeList = [];

    // Set circle center
    let startX = start.col;
    let startY = start.row;

    // Create circles with radius increments
    let maxRadius = Math.max(gridDim.width, gridDim.height);
    let radIncr = 3;
    for(var radius = radIncr; radius < maxRadius; radius += radIncr) {
        createCircle(nodeList, startX, startY, radius);
    }

    // Block nodes
    nodeList.forEach(function (elem) {
        blockNode(grid[elem[COL]][elem[ROW]]);
    })
}

// Create a circle with defined points, radius, and a passage 
function createCircle(nodeList, pointX, pointY, rad) {
    let xStart = pointX - rad;
    let xEnd = pointX + rad;
    let yStart = pointY - rad;
    let yEnd = pointY + rad;

    // If passage is horizontal or vertical
    let isPassageHorizontal = Math.random() > 0.5;
    // Index where to create passage on circle
    let passageIndex = getPassageIndex(isPassageHorizontal, xStart, xEnd, yStart, yEnd)

    // Loop over rows
    for(var y = yStart; y <= yEnd; y++) {
        // Check if in range
        if((y < 0 || y >= gridDim.height) || (isPassageHorizontal && y === passageIndex)) {
            continue;
        }
        // Loop over columns
        for(var x = xStart; x <= xEnd; x++) {
            // Check if in range
            if((x < 0 || x >= gridDim.width) || (!isPassageHorizontal && x === passageIndex)) {
                continue;
            }

            var dist = getDistance(pointX, pointY, x, y);
            if (rad < dist || rad > dist + 1) {
                continue;
            }
            // Push node
            nodeList.push([x, y]);
        }
    }
    return nodeList;
}

// Get index of a passage
function getPassageIndex(isPassageHorizontal, xStart, xEnd, yStart, yEnd) {
    if (isPassageHorizontal) {
        return getRandRange(Math.max(0, yStart) + 2, Math.min(yEnd, gridDim.width) - 2);
    }
    else {
        return getRandRange(Math.max(0, xStart) + 2, Math.min(xEnd, gridDim.height) - 2);
    }
}

// Get distance between two points
function getDistance(xA, yA, xB, yB) {
    let xDiff = xA - xB;
    let yDiff = yA - yB;
    return Math.sqrt( xDiff*xDiff + yDiff*yDiff );
}