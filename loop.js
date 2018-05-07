// pseudocode for starting a node app


// node myFile.js

const pendingTimers = [];
const pendingOSTasks = [];
const pendingOperations = [];

// new timers, tasks, operations are recorded from myFile running
myFile.runContents();

// node.js does 3 checks to see if event loop should run for another iteration
function shouldContinue() {
  // Check one: any pending setTimeout, setInterval, or setImmediate?
  // Check two: Any pending OS tasks? (Like server listening to port)
  // Check three: Any pending long running operations? (Like fs module)
  return pendingTimers.length || pendingOSTasks.length || pendingOperations.length;
}

// entire body exucutes over and over - each time called a 'tick'
while(shouldContinue()) {
  // 1) Node looks at pendingTimers and sees if any functions are ready to be called

  // 2) Node looks at pendingOSTasks and pendingOperations and calls relevant callbacks

  // 3) Pause execution. Continue when...
      // - a new pendingOSTask is done
      // - a new pendingOperation is done
      // - a timer is about to complete

  // 4) Node looks at pendingTimers. Call any setImmediate

  // 5) Handle any 'close' events ( Example: readStream.on('close', () => { someCleanUpCode() }) );
}

// exit back to terminal
