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
