const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Secret key for JWT
const JWT_SECRET = "your_jwt_secret_key"; // Replace with a strong secret key

// Register a new user
exports.register = (req, res) => {
  const { username, email, password } = req.body;

  // Hash the password
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) return res.status(500).json({ error: "Failed to hash password" });

    // Check if the email already exists
    User.findByEmail(email, (err, result) => {
      if (result.length > 0) {
        return res.status(400).json({ message: "Email already exists" });
      }

      // Create the user
      User.create(username, email, hashedPassword, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({
          message: "User registered successfully",
          email,
          username,
          password,
        });
      });
    });
  });
};
// Fetch all users
exports.getAllUsers = (req, res) => {
  User.getAll((err, users) => {
    if (err) {
      return res.status(500).json({ error: "Failed to fetch users" });
    }
    res.status(200).json(users);
  });
};

// Login a user and issue a JWT token
exports.login = (req, res) => {
  const { email, password } = req.body;

  User.findByEmail(email, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.length === 0) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const user = result[0];

    // Compare the provided password with the hashed password
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err)
        return res.status(500).json({ error: "Password comparison failed" });
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid email or password" });
      }

      // Create a JWT token
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        JWT_SECRET,
        { expiresIn: "1h" }
      );
      res.status(200).json({ message: "Login successful", token });
    });
  });
};

// Middleware to verify JWT token
exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token)
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = user; // Add the user info to the request
    next();
  });
};

// Logout a user (client-side removes token)
exports.logout = (req, res) => {
  res.status(200).json({ message: "Logged out successfully" });
};
