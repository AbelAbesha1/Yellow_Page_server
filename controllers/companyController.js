const jwt = require("jsonwebtoken");
const Company = require("../models/company");

const JWT_SECRET = "your_jwt_secret_key";

// Function to verify and extract user info from token
const getUserFromToken = (token) => {
  try {
    // Replace 'your-secret-key' with your actual secret key used to sign the JWT
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded.userId;
  } catch (err) {
    throw new Error("Invalid or expired token");
  }
};

exports.createCompany = (req, res) => {
  // Extract token from Authorization header
  const token = req.headers.authorization?.split(" ")[1]; // Bearer token

  if (!token) {
    return res.status(401).json({ message: "Authorization token is required" });
  }

  // Get user ID from token
  let user_id;
  try {
    user_id = getUserFromToken(token);
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }

  const { name, description, address, phone, website, category } = req.body;
  console.log(name, description, address, phone);
  // Create the company and pass the user_id from the token
  Company.create(
    { name, description, address, phone, website, category, user_id },
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({
        message: "Company created successfully",
        companyId: result.insertId,
      });
    }
  );
};

exports.getAllCompanies = (req, res) => {
  Company.findAll((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
};

exports.getCompanyById = (req, res) => {
  const { id } = req.params;

  Company.findById(id, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.length === 0)
      return res.status(404).json({ message: "Company not found" });
    res.status(200).json(result[0]);
  });
};

exports.updateCompany = (req, res) => {
  const { id } = req.params;
  const data = req.body;

  Company.update(id, data, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ message: "Company updated successfully" });
  });
};

exports.deleteCompany = (req, res) => {
  const { id } = req.params;

  Company.delete(id, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ message: "Company deleted successfully" });
  });
};
