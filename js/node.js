import { grid, algorithm, actions, setCustomStartNode, setCustomEndNode} from './bundles.js'
export { node, blockNode }

/**
 * Updates properties of a node (table cell)
 */
function node(col, row, target) {
  this.col = col;
  this.row = row;
  this.target = target;

  this.parent = undefined;
  this.key = (this.i * grid.length) + this.j;
  this.inQueue = false;
  this.isVisited = false;
  this.g = Infinity;
  this.f = Infinity;
  this.setNodeListeners();
}

// Set event listeners for node
node.prototype.setNodeListeners = function() {
    // Move Start/End node or set node as blocked
    this.target.addEventListener("click", (event) => {
      if(!algorithm.isRunning) {
        // Move if Start/End node is clicked
        if (this.isStartOrEnd()) {
            isMoving = !isMoving;
            if (isMoving) {
              this.moveNode(event);
            } else {
              this.placeNode(event);
            }
        }
        // Block if regular node is clicked
        else {
          this.toggleBlockedNode();
        }
      }
    });

    // Set node as blocked if mousedown
    this.target.addEventListener("mouseenter", (event) => {
      if(isMouseDown && !algorithm.isRunning) { 
        this.toggleBlockedNode();
      }
    }); 
}

// Move a start/end node
node.prototype.moveNode = function(event) {
  let nodeClasses = null; // What classes to assign to the node
  let avaliableNodes = null; // Where this node can be moved to
  if (this.isStart()) {
    nodeClasses = 'start-node moving fas fa-arrow-right';
    avaliableNodes = document.querySelectorAll('#grid-table td:not(.end-node):not(.blocked)');
  } else {
    nodeClasses = 'end-node moving far fa-dot-circle';
    avaliableNodes = document.querySelectorAll('#grid-table td:not(.start-node):not(.blocked)');
  }
  this.target.classList.add('moving');

  // Add event listeners
  avaliableNodes.forEach(function(node) {
    node.addEventListener("mouseover", function() {
      if(isMoving && !node.isBlockedOrStartOrEnd) {
        node.className = nodeClasses;
      }
    }), { once: true };
    node.addEventListener("mouseout", function() {
      if(isMoving && !node.isBlockedOrStartOrEnd) {
        node.removeAttribute('class');
      }
    }), { once: true };
  })
};

// Place a start/end node
node.prototype.placeNode = function(event) {
  this.target.classList.remove('moving');  
  let tableId = this.target.id.split(/[a-zA-Z]+/g);
  if (this.isStart()) {
    setCustomStartNode(tableId[1], tableId[2]);
  }
  else {
    setCustomEndNode(tableId[1], tableId[2]);
  }
};

// Toggle node as blocked/unblocked
node.prototype.toggleBlockedNode = function() {
  if (!this.isStartOrEnd()) {
    this.toggleBlocked();
  }
};

// Block node
function blockNode (node) {
  actions.push(node.target, function(node) {
      if (!isNodeAvaliable(node)) {
          node.classList.add("blocked");
      }
  });
}

// Clear Node
node.prototype.clearNode = function() {
  this.parent = undefined;
  this.inQueue = false;
  this.isVisited = false;
  this.g = Infinity;
  this.f = Infinity;
};

// Clear Node classlist
node.prototype.clearNodeClassList = function() {
  this.target.classList = '';
};

node.prototype.toggleBlocked = function() {
  return this.target.classList.toggle("blocked");
};
node.prototype.isBlocked = function() {
  return this.target.classList.contains("blocked");
};
node.prototype.isStart = function() {
  return this.target.classList.contains("start-node");
};
node.prototype.isEnd = function() {
  return this.target.classList.contains("end-node");
};
node.prototype.isStartOrEnd = function() {
  return this.isEnd() || this.isStart();
};
node.prototype.isVisitedOrBlocked = function() {
  return this.target.classList.contains("visited") || this.target.classList.contains("blocked");
};
function isNodeAvaliable(node) {
  return node.classList.contains("blocked") || node.classList.contains("start-node") || node.classList.contains("end-node");
};

// Mouse Properties
let isMouseDown = false;
let isMoving = false;
window.addEventListener("mousedown", () => {
  isMouseDown = true;
});
window.addEventListener("mouseup", () => {
  isMouseDown = false;
});