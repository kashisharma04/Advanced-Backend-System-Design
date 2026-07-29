// Step 1: Log that a request has been received by the server
console.log("Request Received");

// Step 2: Start a background task (simulating sending an email) using setTimeout for 5 seconds
setTimeout(() => {
  // Step 4: This code executes after 5 seconds without blocking the main program
  console.log("Email Sent Successfully");
}, 5000);

// Step 3: Immediately log that response is sent, without waiting for the 5-second task to finish
console.log("Response Sent");

// Problem : "What if we have to do many async tasks one after another?"
// Example:Login User,Get User Details,Get Orders,Get Payment History

// ===========================================

// Promises in js:
// A Promise was introduced to avoid callback hell and make asynchronous code easier to manage.
// Think of a food delivery app.,You place an order.,The restaurant says:
// "We promise to deliver your food."
// Three things can happen:Order is still being prepared (Pending),Food is delivered (Fulfilled),Restaurant cancels (Rejected)

// code
const promise = new Promise((resolve, reject) => {
    let success = true;
    if(success){
        resolve("Order Delivered");
    }else{
        reject("Order Cancelled");
    }
});
promise
.then((data)=>{
    console.log(data);
})
.catch((err)=>{
    console.log(err);
});
// Problem : Multiple then() calls


// Async-await
function getData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Student Data");
        }, 2000);
    });
}

async function display() {
    const data = await getData();
    console.log(data);
}
display();