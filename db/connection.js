const mysql = require('mysql2');

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // Your MySQL usernam,
        user: 'root',
        // Your MySQL password
        password: 'pass1234',
        database: 'employees'
    },
    console.log('Connected to the employees database.')
);

module.exports = db;