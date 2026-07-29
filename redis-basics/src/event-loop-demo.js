// Step 1: Synchronous code runs first - immediately prints "Start"
console.log("Start");

// Step 2: Schedule a timer callback (even with 0ms delay, it gets sent to the Event Queue)
setTimeout(() => {
  // Step 4: Callback runs only after all synchronous code finishes executing
  console.log("Timer");
}, 0);

// Step 3: Synchronous code continues line-by-line - immediately prints "End"
console.log("End");

/* 
 * WHY "Timer" IS PRINTED LAST (EVENT LOOP EXPLANATION):
 * 1. Synchronous code ("Start", "End") runs on the Call Stack immediately.
 * 2. setTimeout callback ("Timer") is moved to the Event Queue to wait.
 * 3. The Event Loop checks if the Call Stack is empty. Once synchronous 
 *    code finishes ("End"), the Event Loop moves "Timer" to the stack to run.
 */
