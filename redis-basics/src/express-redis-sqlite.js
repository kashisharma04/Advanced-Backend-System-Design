// Import libraries
const express = require("express");
const Database = require("better-sqlite3");
const { createClient } = require("redis");


// Create Express app
const app = express();


// Create SQLite database
const db = new Database("students.db");


// Create Redis client
const redis = createClient();


// Redis error handling
redis.on("error", (err) => {
    console.log("Redis Error:", err);
});


// Connect Redis
redis.connect()
.then(() => {
    console.log("Redis Connected");
});


// Middleware
app.use(express.json());



// Create SQLite table

db.exec(`
CREATE TABLE IF NOT EXISTS students(

    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    age INTEGER NOT NULL

)
`);



// ===============================
// CREATE STUDENT
// ===============================

app.post("/students", async(req,res)=>{


    const {name, age} = req.body;


    // Insert into SQLite

    const stmt = db.prepare(
        "INSERT INTO students(name, age) VALUES(?,?)"
    );


    const result = stmt.run(name,age);



    // Clear Redis cache
    // because data changed

    await redis.del("students");



    res.json({

        id: result.lastInsertRowid,
        name,
        age

    });


});




// ===============================
// GET ALL STUDENTS
// ===============================


app.get("/students", async(req,res)=>{


    // 1. Check Redis first

    const cachedStudents = await redis.get("students");



    if(cachedStudents){


        console.log("Data from Redis");


        return res.json({

            source:"Redis",
            data:JSON.parse(cachedStudents)

        });

    }



    // 2. If Redis empty, get from SQLite


    console.log("Data from SQLite");


    const students = db
    .prepare("SELECT * FROM students")
    .all();



    // 3. Save result in Redis

    await redis.set(

        "students",

        JSON.stringify(students),

        {
            EX:60
        }

    );



    res.json({

        source:"SQLite",
        data:students

    });


});





// ===============================
// GET STUDENT BY ID
// ===============================


app.get("/students/:id", async(req,res)=>{


    const id = req.params.id;


    const key = `student:${id}`;



    // Check Redis

    const cachedStudent = await redis.get(key);



    if(cachedStudent){

        return res.json({

            source:"Redis",
            data:JSON.parse(cachedStudent)

        });

    }




    // Get from SQLite

    const student = db
    .prepare(
        "SELECT * FROM students WHERE id=?"
    )
    .get(id);



    if(!student){

        return res.status(404)
        .json({
            message:"Student not found"
        });

    }




    // Store in Redis

    await redis.set(

        key,

        JSON.stringify(student),

        {
            EX:60
        }

    );



    res.json({

        source:"SQLite",
        data:student

    });


});





// ===============================
// UPDATE STUDENT
// ===============================


app.put("/students/:id", async(req,res)=>{


    const {name,age}=req.body;


    const id=req.params.id;



    const stmt=db.prepare(

        "UPDATE students SET name=?, age=? WHERE id=?"

    );


    const result=stmt.run(name,age,id);



    if(result.changes===0){

        return res.status(404)
        .json({
            message:"Student not found"
        });

    }



    // Remove old cache

    await redis.del(`student:${id}`);

    await redis.del("students");



    res.json({

        message:"Student updated"

    });


});





// ===============================
// DELETE STUDENT
// ===============================


app.delete("/students/:id", async(req,res)=>{


    const id=req.params.id;



    const result=db.prepare(

        "DELETE FROM students WHERE id=?"

    )
    .run(id);



    if(result.changes===0){

        return res.status(404)
        .json({
            message:"Student not found"
        });

    }



    // Remove cache

    await redis.del(`student:${id}`);

    await redis.del("students");



    res.json({

        message:"Student deleted"

    });


});





// Start server

app.listen(3000,()=>{

    console.log(
        "Server running on http://localhost:3000"
    );

});