// cron job : A Cron Job is a scheduler. It automatically runs a function at a specific time or interval, without waiting for a user request.

// Step 1: Import the node-cron scheduling package
const cron = require('node-cron');

// Step 2: Log that the application process has started
console.log('Application Started');

// Step 3: Schedule a cron task to run automatically every minute ('* * * * *')
// Note: Cron jobs run on a timer automatically without needing an incoming user HTTP request
cron.schedule('* * * * *', () => {
  // Step 4: This function runs automatically once at the start of every minute
  console.log('Checking Attendance...');
});

// always 5 star
// * * * * *

// | | | | |

// | | | | Day of Week

// | | | Month

// | | Day of Month

// | Hour

// Minute

/////means
// Every Minute
// Every Hour
// Every Day
// Every Month
// Every Day of Week  (Minute Hour Day Month Weekday  -- every sec)
// every hour "0 * * * *"
// every day at 9 am :-> "0 9 * * *"
// every sunday "0 9 * * 0"
// Every 2 minutes : */2 * * * *

// every 2 min
cron.schedule("*/2 * * * *", () => {
    console.log("Running Every 2 Minutes");
});