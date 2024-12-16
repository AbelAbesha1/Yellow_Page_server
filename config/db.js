const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "", // your MySQL password
  database: "yellow_page", // your database name
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err.stack);
  } else {
    console.log("Connected to the MySQL database.");
  }
});

module.exports = connection;
