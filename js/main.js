import { algorithm, actions, maze, createGrid, clearGrid, grid, start, end } from './bundles.js'

/**
 * Setting up listeners for actions 
 */

// DOM Elements
const clearButton = document.querySelector("#clear");
const speedSelect = document.querySelector("#speed-slider");
const generateButtons = document.querySelector("#generate-buttons");
const findButtons = document.querySelector("#find-buttons");

// Initialze event listeners for DOM-Based events
function addDOMListeners() {
  clearButton.addEventListener("click", clearGrid);
  speedSelect.addEventListener("change", () => {
    setSpeed(speedSelect.value);
  });
  generateButtons.childNodes.forEach((btn) => {
    btn.addEventListener(("click"), (event) =>
      generateMaze(event.target.id)
    );
  });
  findButtons.childNodes.forEach((btn) => {
    btn.addEventListener(("click"), (event) =>
      findPath(event.target.id)
    );
  });
}

// Initialze event listeners for Keyboard-Based events
function addKeyboardListeners() {
  document.addEventListener('keyup', event => {
    switch (event.key) {
      case "Enter":
          generateMaze();
          break;
      case " ":
          findPath();
          break;
      case "Backspace": case "C": case "c":
          pseudoHover("clear");
          clearGrid();
          break;
      // Speed
      case "ArrowUp": case "ArrowRight":
          setSpeed(parseInt(speedSelect.value) + 10);
          break;
      case "ArrowDown": case "ArrowLeft":
          setSpeed(parseInt(speedSelect.value) - 10);
          break;
      // Maze generation 
      case "1":
          generateMaze("recursive");
          pseudoHover("recursive");
          break;
      case "2":
          generateMaze("lines");
          pseudoHover("lines");
          break;
      case "3":
          generateMaze("radial");
          pseudoHover("radial");
          break;
      case "4":
          generateMaze("random");
          pseudoHover("random");
          break;
      // Path finding 
      case "Q": case "q":
          findPath("best");
          pseudoHover("best");
          break;
      case "W": case "w":
          findPath("astar");
          pseudoHover("astar");
          break;
      case "E": case "e":
          findPath("bfs");
          pseudoHover("bfs");
          break;
      case "R": case "r":
          findPath("dfs");
          pseudoHover("dfs");
          break;

      default:
        console.log(event.code);
        return; // Quit when this doesn't handle the key event.
    }
  })
}

// Initialze event listeners for Window-Based events
function addWindowListeners() {
  // Reload page on resize
  window.addEventListener('resize', function () { 
    "use strict";
    window.location.reload();     
  });
}

// Initialize all listeners
function initializeListeners() {
  addDOMListeners();
  addKeyboardListeners();
  addWindowListeners();
}

// Add psuedo-hover styling for keyboard events
function pseudoHover(elementID) {
  let target = document.getElementById(elementID);
  target.classList.add("pseudo-hover");
  setTimeout(() => {
    target.classList.remove("pseudo-hover");
  }, 1000);
}

// Generate maze; set mode if passed
function generateMaze(mode) {
  if (mode) {
    setMazeMode(mode);
  }
  maze.generateMaze(grid);
}

// Set generate maze mode
function setMazeMode(mode) {
  maze.setGenerateMode(mode);
}

// Set speed of action queue and update range input
function setSpeed(speed) {
  speedSelect.value = speed;
  actions.setDelay(speed);
}

// Find path; set mode if passed
function findPath(mode) {
  if (mode) {
    setFindMode(mode);
  }
  algorithm.findPath(grid, [start.col, start.row], [end.col, end.row]);
}

// Set pathfinding mode
function setFindMode(mode) {
  algorithm.setAlgorithmStrategy(mode);
}

(function () {
  initializeListeners();
  createGrid();
})();