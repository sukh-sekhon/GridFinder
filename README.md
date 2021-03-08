# GridFinder
[![forthebadge](https://forthebadge.com/images/badges/made-with-JavaScript.svg)](./common/js/main.js) [![forthebadge](https://forthebadge.com/images/badges/uses-css.svg)](./common/css/styles.scss) [![forthebadge](https://forthebadge.com/images/badges/uses-html.svg)](./common/index.html)


## Demo
### See it in action [here](https://sukhjot-sekhon.github.io/GridFinder)


## Usage
__Basics__
* __Move__ a start or end node via click
* __Block__ nodes via a click or click-and-drag
* __Clear__ the grid using the Clear Grid button (<kbd>backspace</kbd>)
* Adjust __speed__ with the slider (<kbd>↑</kbd> <kbd>→</kbd> <kbd>↓</kbd> <kbd>←</kbd>)
* The Statistics panel display the estimated runtime, count of nodes visited, and nodes in path

__Maze Generation Algorithms__
| Algorithm | Shortcut | Description |
|---|:-:|---|
| Recursive Division | <kbd>1</kbd>  | Recursively divide the grid with a wall containing a passage. |
| Lines | <kbd>2</kbd>  | Draw horizontal or vertical walls with a random passage. |
| Radial | <kbd>3</kbd> | Draw circles with passages with the origin set as the start node. |
| Random | <kbd>4</kbd> | Block $^1/_3$ of the grid with randomly positioned nodes. |


__Search Algorithms__
__Maze Generation Algorithms__
| Algorithm | Shortcut | Data Structure |  Time Complexity | Space Complexity | Description |
|---|:-:|---|---|---|---|
| Best-First | <kbd>Q</kbd> | Queue | O(row x col) | O(row x col) | Greedy algorithm using Manhattan distance as it's heuristic |
| A-Star | <kbd>W</kbd> | Priority Queue | O(row x col) | O(row x col) | Greedy algorithm using Manhattan distance as it's heuristic. |
| Breadth-First | <kbd>E</kbd> | Queue | O(row x col) | O(row x col) | Travserses grid by visiting neighbouring nodes before visiting children. |
| Depth-First | <kbd>R</kbd> | Stack | O(row x col) | O(row x col) | Traverses grid by visiting all highest-depth nodes before backtracking. |
