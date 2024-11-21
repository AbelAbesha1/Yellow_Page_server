const mysql = require("mysql");

// Configure the database connection
const db = mysql.createConnection({
  host: "localhost", // Typically localhost for phpMyAdmin
  user: "root", // Default MySQL user
  password: "", // Leave blank if no password is set
  database: "Yellow_Page", // Replace with your database name
});

// Export the connection
module.exports = db;
