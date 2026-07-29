async function generateReport() {

    console.log("Generating Report...");

    await new Promise(resolve => setTimeout(resolve, 5000));

    console.log("Report Generated");

}

async function main() {

    console.log("Request Accepted");

    generateReport();

    console.log("User Does Not Wait");

}

main();