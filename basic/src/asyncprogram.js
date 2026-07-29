function sendEmail() {

    console.log("Preparing Email...");

    setTimeout(() => {

        console.log("Email Sent Successfully");

    }, 5000);
}

console.log("Request Received");

sendEmail();

console.log("Response Sent");