const Company = require("../models/company");

exports.createCompany = (req, res) => {
  const { name, description, address, phone, website, category, user_id } =
    req.body;

  Company.create(
    { name, description, address, phone, website, category, user_id },
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res
        .status(201)
        .json({
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
