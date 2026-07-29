const cache = new Map();

async function getStudents() {

    if (cache.has("students")) {

        console.log("Cache Hit");

        return cache.get("students");
    }

    console.log("Cache Miss");

    await new Promise(resolve => setTimeout(resolve, 3000));

    const students = [
        "Alice",
        "Bob",
        "Charlie"
    ];

    cache.set("students", students);

    return students;
}

async function main() {

    console.log(await getStudents());

    console.log(await getStudents());

}

main();