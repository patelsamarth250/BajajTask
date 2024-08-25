// Load environment variables from the .env file
require('dotenv').config();
const cors = require("cors");

const express = require('express');
const app = express();

app.use(express.json());
app.use(cors());

// app.use(cors({ origin: "http://your-frontend-domain.com" }));

// Get the port and other values from environment variables
const PORT = process.env.PORT || 3000;
const USER_ID = process.env.USER_ID;
const EMAIL = process.env.EMAIL;
const ROLL_NUMBER = process.env.ROLL_NUMBER;

// GET method endpoint
app.get('/bfhl', (req, res) => {
    res.status(200).json({ "operation_code": 1 });
});

// POST method endpoint
app.post('/bfhl', (req, res) => {
    const { data } = req.body;
    
    if (!Array.isArray(data)) {
        return res.status(400).json({ "is_success": false, "message": "Invalid input format" });
    }

    let numbers = [];
    let alphabets = [];
    let highest_lowercase_alphabet = [];

    data.forEach(item => {
        if (!isNaN(item)) {
            numbers.push(item);
        } else if (typeof item === 'string' && /^[a-zA-Z]$/.test(item)) {
            alphabets.push(item);
            if (item === item.toLowerCase()) {
                highest_lowercase_alphabet.push(item);
            }
        }
    });

    highest_lowercase_alphabet = highest_lowercase_alphabet.sort().reverse().slice(0, 1);

    res.json({
        "is_success": true,
        "user_id": USER_ID,
        "email": EMAIL,
        "roll_number": ROLL_NUMBER,
        "numbers": numbers,
        "alphabets": alphabets,
        "highest_lowercase_alphabet": highest_lowercase_alphabet
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
