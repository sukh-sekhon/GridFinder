import { algorithm } from './bundles.js'
export { updateStatistics, clearStatistics }

/**
 * Statistics
 */

// DOM Elements
const pathCount = document.getElementById('path-count');
const visitedCount = document.getElementById('visited-count');
const runningTime = document.getElementById('running-time');

// update statistics after search complete
function updateStatistics() {
    updateValue(pathCount, algorithm.countNodeInPath);
    updateValue(visitedCount, algorithm.countNodeVisited);
    updateValue(runningTime, algorithm.timeToRun);
}

// Set all values to 0
function clearStatistics() {
    pathCount.innerText = "0";
    visitedCount.innerText = "0";
    runningTime.innerText = "0";
}

// Update number animation
function updateValue(elem, value) {
    let duration = 250;
    let start = 0;

    const step = (time) => {
        if (!start) {
            start = time
        };
        const progress = Math.min((time - start) / duration, 1);
        elem.innerHTML = Math.floor(progress * value);

        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
  }