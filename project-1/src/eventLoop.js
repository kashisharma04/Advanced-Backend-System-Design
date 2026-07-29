// Event Loop Example Demonstration
console.log("Start");

// setTimeout is an asynchronous API. 
// Its callback is moved to the Timers Macrotask Queue and will only execute AFTER 
// the synchronous execution stack finishes completely.
setTimeout(() => {
  console.log("Timer");
}, 0);

console.log("End");

/*
Explanation of output:
Output:
Start
End
Timer

Why?
1. `console.log("Start")` is executed synchronously first on the main thread stack.
2. `setTimeout(..., 0)` registers a timer with 0ms delay. Its callback is delegated to Node.js C++ API, 
   and placed into the Event Loop's Macrotask Queue.
3. `console.log("End")` is executed next synchronously.
4. The main thread call stack becomes empty.
5. The Event Loop checks the Macrotask Queue and processes the callback, printing "Timer".
*/
