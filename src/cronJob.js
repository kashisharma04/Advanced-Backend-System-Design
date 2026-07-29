import cron from "node-cron";

console.log("Cron Job Started");

// Runs every minute
cron.schedule("* * * * *", () => {

    console.log("Checking Student Attendance");

});

console.log("Application Running...");