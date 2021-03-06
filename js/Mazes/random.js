import { gridDim, getRand, blockNode } from '../bundles.js'

// Randomly generated grid
export function random(grid) {
    let width = gridDim.width;
    let height = gridDim.height;
    let sparsity = 3;

    for (var i = 0; i < width * height; i+=sparsity) {
        blockNode(grid[getRand(width)][getRand(height)]);
    }
}