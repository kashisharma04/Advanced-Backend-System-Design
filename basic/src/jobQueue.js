const jobs = [];

jobs.push("Send Welcome Email");
jobs.push("Generate PDF");
jobs.push("Create Report");

console.log("Pending Jobs:");

console.log(jobs);

while (jobs.length > 0) {

    const job = jobs.shift();

    console.log("Processing:", job);

}

console.log("All Jobs Completed");