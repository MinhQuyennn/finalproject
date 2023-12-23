// controllers/AuthController.js
const db = require("../config/database");
const pool = db.promise(); // promisify pool
const accountsModel = require("../models/accounts");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10; 
// const validateRegisterInput = require("../validator/RegisterValidator");
require("dotenv").config();

const login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const sql = `SELECT * FROM account WHERE email = ?`;

  db.query(sql, [email], async (err, result) => {
    try {
      if (err) {
        return res.status(500).json({
          status: "failed",
          error: "Internal Server Error",
        });
      }

      if (result.length === 0) {
        return res.status(404).json({
          status: "failed",
          error: "Account not found",
        });
      }

      const account = result[0];

      // Compare hashed passwords
      const passwordMatch = await bcrypt.compare(password, account.password);
      if (passwordMatch) {
        const payload = {
          id: account.account_id,
          email: account.email,
          role: account.role,
        };

        jwt.sign(
          payload,
          process.env.JWT_SECRET_KEY,
          { expiresIn: 3155 },
          (err, token) => {
            if (err) {
              return res.status(500).json({
                status: "failed",
                error: "Error signing the token",
              });
            }

            // Include the account ID in the response
            res.json({
              status: "success",
              token: token,
              role: account.role,
              id: account.account_id,
            });
          }
        );
      } else {
        res.status(401).json({ status: "failed", error: "Invalid credentials" });
      }
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ status: "failed", error: "Error during login." });
    }
  });
};



const signUp = async (req, res) => {
  const {
    phone,
    email,
    password,
    id_card,
    citizen_identification_card,
    fullname,
    gender,
    dob
  } = req.body;

  // Validate input parameters here if needed

  let connection;
  try {
    connection = await pool.getConnection();
    await connection.beginTransaction(); // Begin transaction

    // Check if email already exists in the account table
    const [rows] = await connection.query('SELECT * FROM account WHERE email = ?', [email]);
    if (rows.length > 0) {
      res.status(409).json({ message: 'Email already in use.' });
      return;
    }

    // Hash the password before saving it to the database
    const hash = await bcrypt.hash(password, saltRounds);

       // Set default role to 'customer'
       const role = 'customer';
    // Insert the new user into the account table
    const [accountResult] = await connection.query(
      'INSERT INTO account (email, password, role) VALUES (?, ?, ?)', 
      [email, hash, role] 
    );
    const accountId = accountResult.insertId;

    // Insert data into the customer table with the generated account_id
    const [customerResult] = await connection.query(
      'INSERT INTO customer (account_id, id_card, citizen_identification_card, fullname, phone, gender, dob) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [accountId, id_card, citizen_identification_card, fullname, phone, gender, dob]
    );

    await connection.commit(); // Commit the transaction

    res.status(201).json({
      message: 'User successfully registered.',
      accountId: accountId,
      customerId: customerResult.insertId,
      role: role 
    });
  } catch (error) {
    if (connection) {
      await connection.rollback(); // Rollback the transaction if an error occurs
    }
    console.error('Error registering the user:', error);
    res.status(500).json({ message: 'Error registering the user.' });
  } finally {
    if (connection) {
      connection.release(); // Release the connection back to the pool
    }
  }
};


module.exports = {
  login,
  signUp
}