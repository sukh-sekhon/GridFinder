export { manhattanDist, getRand, getRandRange, getTimeStampCallback }

/**
 * Miscellaneous helper functions for algorithms
 */

// Get distance between two points along axis of right angles
function manhattanDist(currNode, endNode) {
    let distY = Math.abs(currNode.col - endNode[COL]);
    let distX = Math.abs(currNode.row - endNode[ROW]);
    return distX + distY;
}

// Get a random number x, where 0<=x<max
function getRand(max) {
    return Math.floor(Math.random() * max);
}

// Get a random number x, where min<=x<=max
function getRandRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}        

// Get most accurate time avaliable (based on browser support)
function getTimeStampCallback() {
    let callback;
    // Highest precision
    if (window.performance.now) {
        callback = () => { return window.performance.now(); };
    } else {
        // Better precision
        if (window.performance.webkitNow) {
            callback = () => { return window.performance.webkitNow(); };
        } 
        // Standard JS precision
        else {
            callback = () => { return new Date().getTime(); };
        }
    }
    return callback;
}