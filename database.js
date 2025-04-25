// db.js
const mysql = require('mysql2');

// Create a connection to the MySQL database
const db = mysql.createConnection({
  host: 'localhost',         // MySQL server host (usually localhost)
  user: 'your-username',     // Your MySQL username
  password: 'your-password', // Your MySQL password
  database: 'users_db'       // The database you created
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database: ', err);
    return;
  }
  console.log('Connected to the MySQL database');
});

module.exports = db;  // Export the database connection
