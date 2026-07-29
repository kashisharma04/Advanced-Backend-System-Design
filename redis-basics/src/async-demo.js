// Step 1: Log that a request has been received by the server
console.log("Request Received");

// Step 2: Start a background task (simulating sending an email) using setTimeout for 5 seconds
setTimeout(() => {
  // Step 4: This code executes after 5 seconds without blocking the main program
  console.log("Email Sent Successfully");
}, 5000);

// Step 3: Immediately log that response is sent, without waiting for the 5-second task to finish
console.log("Response Sent");
