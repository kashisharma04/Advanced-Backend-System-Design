// API caching is a technique. Redis is a tool that can be used to implement API caching.
// API caching means: "Caching the response of an API so future requests can get the response faster."

// Import express and redis libraries
const express = require('express');
const { createClient } = require('redis');

// Create express app and redis client
const app = express();
const client = createClient();

// Connect to Redis server before starting server
client.connect().then(() => console.log('Connected to Redis!')).catch(console.error);

// GET /save: Endpoint to store a key-value pair in Redis
app.get('/save', async (req, res) => {
  // Get key and value from query parameters, e.g. /save?key=user&val=Alice
  const key = req.query.key || 'demoKey';
  const val = req.query.val || 'demoValue';

  // Save key-value pair in Redis
  await client.set(key, val);
  res.json({ message: 'Saved to Redis', key, val });
  // test:localhost:3000/save?key=name&val=Alice - podtmsn
});

// GET /read: Endpoint to fetch a value from Redis using a key
app.get('/read', async (req, res) => {
  const key = req.query.key || 'demoKey';

  // Retrieve value for key from Redis
  const value = await client.get(key);
  if (!value) {
    return res.status(404).json({ message: 'Key not found in Redis', key });
  }
  return res.json({ message: 'Read from Redis', key, value });
});

// GET /delete: Endpoint to remove a key from Redis
app.get('/delete', async (req, res) => {
  const key = req.query.key || 'demoKey';

  // Delete key from Redis
  const count = await client.del(key);
  if (count === 0) {
    return res.status(404).json({ message: 'Key not found to delete', key });
  }
  res.json({ message: 'Deleted from Redis', key });
});

// Start Express web server on port 3000
app.listen(3000, () => {
  console.log('Express Redis server running on http://localhost:3000');
});




//===========================
// example-2
app.get("/send-otp/:mobile", async (req,res)=>{

    const mobile = req.params.mobile;
    // Generate random OTP
    const otp = Math.floor(100000 + Math.random()*900000);


    // Store OTP in Redis for 5 minutes
    await redis.set(
        `otp:${mobile}`,
        otp,
        {
            EX:300
        }
    );


    res.json({
        message:"OTP sent",
        otp:otp   // only for demo, don't send in real apps
    });

  })
  // test=localhost:3000/send-otp/9876543210

// Verify otp code
app.get("/verify-otp/:mobile/:otp", async(req,res)=>{


    const mobile = req.params.mobile;

    const enteredOTP = req.params.otp;


    // Get OTP from Redis

    const savedOTP = await redis.get(
        `otp:${mobile}`
    );


    if(!savedOTP){

        return res.json({
            message:"OTP expired"
        });

    }


    if(savedOTP == enteredOTP){

        // Delete OTP after successful login

        await redis.del(
            `otp:${mobile}`
        );


        return res.json({
            message:"Login successful"
        });

    }


    res.json({
        message:"Wrong OTP"
    });


});