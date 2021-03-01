import { actions, clearGrid, random, recursive, test, radial, lines, setRandomStartEndNodes } from '../bundles.js'

/**
 * Generates maze depending on selected mode
 */
export const maze = {
    mode : "random",
    grid : undefined,
    isGenerating : false
};

// Set the maze generation strategy
maze.setGenerateMode = function(mode) {
    this.mode = mode;
};

// Generate maze depending on generation mode
maze.generateMaze = function(grid) {
    // Clear grid and set random start/end points
    clearGrid();
    setRandomStartEndNodes();
    if(!this.isGenerating) {
        this.isGenerating = true;
        // Run the algorithm based on mode
        this[this.mode](grid);
        // Execute actions and set is generating to false        
        actions.run();
        maze.isGenerating = false;
    }
};

// Radial
maze.radial = function(grid) {
    radial(grid);
}
// Test
maze.test = function(grid) {
    test(grid);
}
// Random
maze.random = function(grid) {
    random(grid);
}
// Recursive division
maze.recursive = function(grid) {
    recursive(grid);
}
// Lines
maze.lines = function(grid) {
    lines(grid);
}