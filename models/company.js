const db = require("../config/db");

const Company = {
  create: (data, callback) => {
    const sql = `INSERT INTO companies 
      (name, description, address, phone, website, category, user_id) 
      VALUES (?, ?, ?, ?, ?, ?, ?)`;
    db.query(
      sql,
      [
        data.name,
        data.description,
        data.address,
        data.phone,
        data.website,
        data.category,
        data.user_id,
      ],
      callback
    );
  },
  findAll: (callback) => {
    const sql = "SELECT * FROM companies";
    db.query(sql, callback);
  },
  findById: (id, callback) => {
    const sql = "SELECT * FROM companies WHERE id = ?";
    db.query(sql, [id], callback);
  },
  update: (id, data, callback) => {
    const sql = `UPDATE companies SET 
      name = ?, description = ?, address = ?, phone = ?, website = ?, category = ? 
      WHERE id = ?`;
    db.query(
      sql,
      [
        data.name,
        data.description,
        data.address,
        data.phone,
        data.website,
        data.category,
        id,
      ],
      callback
    );
  },
  delete: (id, callback) => {
    const sql = "DELETE FROM companies WHERE id = ?";
    db.query(sql, [id], callback);
  },
};
module.exports = Company;
