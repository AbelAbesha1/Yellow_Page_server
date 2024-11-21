const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const companyController = require("../controllers/companyController");

// User Routes
router.post("/users/register", userController.register);
router.post("/users/login", userController.login);
router.post("/users/logout", userController.logout);
router.get("/users", userController.getAllUsers);

// Company Routes (protected by JWT)
router.post(
  "/companies",
  userController.authenticateToken,
  companyController.createCompany
);
router.get("/companies", companyController.getAllCompanies);
router.get("/companies/:id", companyController.getCompanyById);
router.put(
  "/companies/:id",
  userController.authenticateToken,
  companyController.updateCompany
);
router.delete(
  "/companies/:id",
  userController.authenticateToken,
  companyController.deleteCompany
);

module.exports = router;
