const express = require("express");
const bodyParser = require("body-parser");
const db = require("./config/db"); // Import the database connection
const routes = require("./routes/index");
const cors = require("cors");

const app = express();

// Enable CORS for all routes
app.use(cors());

// Middleware
app.use(bodyParser.json());
app.use("/api", routes);

// Test Database Connection
db.connect((err) => {
  if (err) {
    console.error("Failed to connect to MySQL database:", err.message);
    process.exit(1); // Exit the process if the database connection fails
  }
  console.log("Connected to MySQL database!");
});

// Start Server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
