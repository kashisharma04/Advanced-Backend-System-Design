// Simulating Redis using a JavaScript Map

const store = new Map();

store.set("student:1", {
    name: "Alice",
    course: "Node.js"
});

store.set("student:2", {
    name: "Bob",
    course: "React"
});

console.log("Student 1:");
console.log(store.get("student:1"));

console.log("\nAll Keys:");
console.log([...store.keys()]);