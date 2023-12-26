const db = require("../config/database");
const bcrypt = require('bcrypt');
const getFullNameByIDCustomer = async (req, res) => {
    const id = req.params.id; 
    const sql = "SELECT fullname FROM customer c join account a on a.account_id = c.account_id where c.account_id = ?";
    const values = [id]; // Use the corrected variable name
    db.query(sql, values, (err, result) => {
        if (err) {
            return res
                .status(500)
                .json({ Error: "Error fetching account ID" });
        }
        return res.status(200).json({ Status: "Success", Customer: result });
    });
};


const getAllCustomers = async (req, res) => {
    const sql = `
        SELECT c.*, a.email, a.role, a.password
        FROM customer c
        JOIN account a ON a.account_id = c.account_id;
    `;

    db.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json({ Error: "Error fetching customer information" });
        }
        return res.status(200).json({ Status: "Success", CustomersInformation: result });
    });
};
const SearchUserByName = async (req, res) => {
    const { name } = req.params; // Access the parameter from req.params

    if (!name) {
        return res.status(400).json({ Error: "Invalid or missing 'name' parameter" });
    }

    const searchTerm = `%${name}%`; // Adding wildcards to search for partial matches

    const sql = `
        SELECT c.*, a.email, a.role, a.password
        FROM customer c
        JOIN account a ON a.account_id = c.account_id
        WHERE LOWER(TRIM(c.fullname)) LIKE LOWER(?);
    `;

    db.query(sql, [searchTerm], (err, result) => {
        console.log('Search Term:', searchTerm);
        if (err) {
            console.error("Error searching for user by name:", err);
            return res.status(500).json({ Error: "Error searching for user by name" });
        }
        return res.status(200).json({ Status: "Success", CustomersInformation: result });
    });
};

// Delete customer by ID
const deleteCustomerByID = async (req, res) => {
    const { id } = req.params;

    try {
      await new Promise((resolve, reject) => {
        db.query('START TRANSACTION', (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
  
      // Delete customer
      await new Promise((resolve, reject) => {
        db.query('DELETE FROM customer WHERE account_id = ?', [id], (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
  
      // Delete associated account
      await new Promise((resolve, reject) => {
        db.query('DELETE FROM account WHERE account_id = ?', [id], (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
  
      await new Promise((resolve, reject) => {
        db.query('COMMIT', (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
  
      return res.status(200).json({ Status: "Success", Message: "Customer and associated account deleted successfully" });
    } catch (error) {
      await new Promise((resolve, reject) => {
        db.query('ROLLBACK', (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
  
      console.error("Error deleting customer and account:", error);
      return res.status(500).json({ Error: "Error deleting customer and account" });
    }
  };

    const UpdateCustomerByID = async (req, res) => {
      const {customer_id} = req.params;
      const {id_card, citizen_identification_card, fullname, phone, gender, dob } = req.body;
      console.log(id_card, citizen_identification_card, fullname, phone, gender, dob);
      const sql = `
          UPDATE customer
          SET id_card = ?, citizen_identification_card = ?, fullname = ?, phone = ?, gender = ?, dob = ?
          WHERE customer_id = ?
      `;
      const values = [id_card, citizen_identification_card, fullname, phone, gender, dob, customer_id];

      db.query(sql, values, (err, result) => {
          if (err) {
              return res.status(500).json({ Error: "Error updating customer information" });
          }
          return res.status(200).json({ Status: "Success", Message: "Customer information updated successfully" });
      });
  };

  const InsertCustomer = async (req, res) => {
    const { email, password } = req.body;
    const { fullname, phone, gender, dob, id_card, citizen_identification_card } = req.body;

    // Hash the password before inserting into the database
    const hashedPassword = await bcrypt.hash(password, 10); // Use bcrypt to hash the password with a salt round of 10

    const accountInsertQuery = `
        INSERT INTO account (email, password, role)
        VALUES (?, ?, ?)
    `;
    const accountValues = [email, hashedPassword, 'customer'];

    db.query(accountInsertQuery, accountValues, (accountErr, accountResult) => {
        if (accountErr) {
            return res.status(500).json({ Error: "Error creating customer account" });
        }

        const account_id = accountResult.insertId;

        const customerInsertQuery = `
            INSERT INTO customer (account_id, fullname, phone, gender, dob, id_card, citizen_identification_card)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        const customerValues = [account_id, fullname, phone, gender, dob, id_card, citizen_identification_card];

        db.query(customerInsertQuery, customerValues, (customerErr, customerResult) => {
            if (customerErr) {
                db.query('DELETE FROM account WHERE account_id = ?', [account_id], (deleteErr, deleteResult) => {
                    if (deleteErr) {
                        return res.status(500).json({ Error: "Error deleting account due to customer creation failure" });
                    }
                    return res.status(500).json({ Error: "Error creating customer. Account deleted." });
                });
            } else {
                return res.status(200).json({ Status: "Success", Message: "Customer created successfully" });
            }
        });
    });
};

module.exports = {
    getFullNameByIDCustomer,
    getAllCustomers,
    SearchUserByName,
    deleteCustomerByID,
    UpdateCustomerByID,
    InsertCustomer
};
