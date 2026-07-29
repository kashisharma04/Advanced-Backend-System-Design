// Simulating a slow database query

async function getStudentsFromDatabase() {

    console.log("Fetching students from database...");

    // Simulate database delay
    await new Promise(resolve => setTimeout(resolve, 3000));

    return [
        { id: 1, name: "Alice" },
        { id: 2, name: "Bob" }
    ];
}

async function main() {

    console.time("Database Time");

    const students = await getStudentsFromDatabase();

    console.timeEnd("Database Time");

    console.log(students);

}

main();