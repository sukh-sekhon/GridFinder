# GridFinder
[![forthebadge](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](./common/js/main.js) [![forthebadge](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](./common/index.html) [![forthebadge](https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white)](./common/css/styles.scss)

## [🚀Launch Demo🚀](https://sukhjot-sekhon.github.io/GridFinder)

## Features
__Basics__
* __Move__ a start or end node via click
* __Block__ nodes via a click or click-and-drag
* __Clear__ the grid using the Clear Grid button (<kbd>backspace</kbd>)
* Adjust __speed__ with the slider (increment: <kbd>↑</kbd> <kbd>→</kbd>, decrement: <kbd>↓</kbd> <kbd>←</kbd>)


__Maze Generation Algorithms__
| Algorithm | Key | Description |
|---|:-:|---|
| Recursive Division | <kbd>1</kbd>  | Recursively divide the grid with a wall containing a passage. |
| Lines | <kbd>2</kbd>  | Draw horizontal or vertical walls with a random passage. |
| Radial | <kbd>3</kbd> | Draw circles with passages with the origin set as the start node. |
| Random | <kbd>4</kbd> | Block 1/3 of the grid with randomly positioned nodes. |
\

__Pathfinding Algorithms__
| Algorithm | Key | Data Structure | Description |
|---|:-:|:-:|---|
| Best-First | <kbd>Q</kbd> | Queue | Greedy algorithm using Manhattan distance as it's heuristic |
| A-Star | <kbd>W</kbd> | Priority Queue | Greedy algorithm using Manhattan distance as it's heuristic. |
| Breadth-First | <kbd>E</kbd> | Queue | Travserses grid by visiting neighbouring nodes before visiting children. |
| Depth-First | <kbd>R</kbd> | Stack | Traverses grid by visiting all highest-depth nodes before backtracking. |
