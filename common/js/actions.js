/**
 * Queue of actions
 * Used to mark nodes as visited or blocked
 */

let maxDelay = 40;

 // Queue of actions
export const actions = {
  queue : [],
  delay : maxDelay - document.querySelector("#speed-slider").value,
};

// Set delay
actions.setDelay = function(delay) {
  this.delay = maxDelay - delay;
};

// Push events (next node to visit) in queue
actions.push = function(elem, callback) {
  this.queue.push({elem: elem, callback: callback});
};

// Clear the queue
actions.clear = function() {
  this.queue = [];
};

// Recursively execute events
actions.run = function() {
  setTimeout(() => {
    if(this.queue.length > 0) {
      this.queue[0].callback(this.queue[0].elem);
      this.queue.shift();
      this.run();
    }
  }, this.delay);
};