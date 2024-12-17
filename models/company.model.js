const db = require("../config/db"); // Import the database connection

// Create a new company
exports.createCompany = (companyData, callback) => {
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
  } = companyData;

  // SQL query to insert company data
  const query = `INSERT INTO companies (username, email, name, phone, address, description, category, website, locationLink, socialMediaLinks, tag) 
                  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')`;
  
  db.query(
    query,
    [
      username,
      email,
      name,
      phone,
      address,
      description,
      category,  // category without `=`
      website,
      locationLink,
      JSON.stringify(socialMediaLinks),
    ],
    (err, result) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, result.insertId); // Return the inserted company ID
    }
  );
};

// Get all companies
exports.getAllCompanies = (callback) => {
  const query = "SELECT * FROM companies";
  db.query(query, (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results);
  });
};

// Get a company by ID
exports.getCompanyById = (id, callback) => {
  const query = "SELECT * FROM companies WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result[0]); // Return the first result
  });
};

// Update company details
exports.updateCompany = (id, companyData, callback) => {
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
  } = companyData;

  const query = `UPDATE companies SET 
                 username = ?, 
                 email = ?, 
                 name = ?, 
                 phone = ?, 
                 address = ?, 
                 description = ?, 
                 category = ?, 
                 website = ?, 
                 locationLink = ?, 
                 socialMediaLinks = ?
                 WHERE id = ?`;

  db.query(
    query,
    [
      username,
      email,
      name,
      phone,
      address,
      description,
      category,
      website,
      locationLink,
      JSON.stringify(socialMediaLinks),
      id,
    ],
    (err, result) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, result);
    }
  );
};

// Delete company
exports.deleteCompany = (id, callback) => {
  const query = "DELETE FROM companies WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};

// Update company tag status
exports.updateTagStatus = (id, tag, callback) => {
  if (!["pending", "approved", "not approved"].includes(tag)) {
    return callback(
      new Error(
        'Invalid tag value. Use "pending", "approved", or "not approved"'
      ),
      null
    );
  }

  const query = "UPDATE companies SET tag = ? WHERE id = ?";
  db.query(query, [tag, id], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};
