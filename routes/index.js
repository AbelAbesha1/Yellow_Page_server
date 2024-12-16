const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const companyController = require("../controllers/company.controller");

// User Routes
router.post("/users/register", userController.register);
router.post("/users/login", userController.login);
router.post("/users/logout", userController.logout);
router.get("/users", userController.getAllUsers);

// Routes for company CRUD
// Create a new company
router.post("/companies", companyController.createCompany);

// Get all companies
router.get("/companies", companyController.getAllCompanies);

// Get a company by ID
router.get("/companies/:id", companyController.getCompanyById);

// Update company information
router.put("/companies/:id", companyController.updateCompany);

// Delete company
router.delete("/companies/:id", companyController.deleteCompany);

// Update company tag status (approved, pending, or not approved)
router.put("/companies/:id/tag", companyController.updateTagStatus);

module.exports = router;
