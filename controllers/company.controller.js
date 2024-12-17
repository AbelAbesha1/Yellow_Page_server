const companyModel = require("../models/company.model");

// Create a new company
exports.createCompany = (req, res) => {
  const {
    username,
    email,
    name,
    phone,
    address,
    description,
    category,
    website,
    locationLink,
    socialMediaLinks,
  } = req.body;

  // Validate required fields
  if (!username || !email || !name || !phone || !address || !description || !category) {
    return res.status(400).json({ error: "Required fields are missing" });
  }

  const companyData = {
    username,
    email,
    name,
    phone,
    address,
    description,
    category,
    website,
    locationLink,
    socialMediaLinks: JSON.stringify(socialMediaLinks),
  };
  console.log(companyData)

  companyModel.createCompany(companyData, (err, companyId) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: companyId, ...companyData, tag: "pending" });
  });
};

// Get all companies
exports.getAllCompanies = (req, res) => {
  companyModel.getAllCompanies((err, companies) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(companies);
  });
};

// Get company by ID
exports.getCompanyById = (req, res) => {
  const { id } = req.params;
  companyModel.getCompanyById(id, (err, company) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!company) {
      return res.status(404).json({ error: "Company not found" });
    }
    res.status(200).json(company);
  });
};

// Update company information
exports.updateCompany = (req, res) => {
  const { id } = req.params;
  const {
    username,
    email,
    name,
    phone,
    address,
    description,
    category,
    website,
    locationLink,
    socialMediaLinks,
  } = req.body;

  const companyData = {
    username,
    email,
    name,
    phone,
    address,
    description,
    category,
    website,
    locationLink,
    socialMediaLinks: JSON.stringify(socialMediaLinks),
  };

  companyModel.updateCompany(id, companyData, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: "Company updated successfully" });
  });
};

// Delete company
exports.deleteCompany = (req, res) => {
  const { id } = req.params;
  companyModel.deleteCompany(id, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: "Company deleted successfully" });
  });
};

// Update company tag status
exports.updateTagStatus = (req, res) => {
  const { id } = req.params;
  const { tag } = req.body;

  companyModel.updateTagStatus(id, tag, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: "Tag updated successfully" });
  });
};
