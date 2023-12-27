// controllers/AuthController.js
const db = require("../config/database");
const pool = db.promise(); // promisify pool
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const saltRounds = 10; 
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


const GetCustomerIDByAccountID = async (req, res) => {
  const accountId = req.params.account_id;

  const sql = 'SELECT customer_id FROM customer WHERE account_id = ?';

  db.query(sql, [accountId], (err, result) => {
    if (err) {
      return res.status(500).json({
        status: 'failed',
        error: 'Internal Server Error',
      });
    }

    if (result.length === 0) {
      return res.status(404).json({
        status: 'failed',
        error: 'Customer not found for the provided account ID',
      });
    }

    const customerId = result[0].customer_id;
    res.json({
      status: 'success',
      customer_id: customerId,
    });
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





const sendResetEmail = async (email, resetToken) => {
  try {
      // Create a transporter
      let transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
              user: process.env.EMAIL_USERNAME,
              pass: process.env.EMAIL_PASSWORD,
          },
      });

      // Email options
      let mailOptions = {
          from: process.env.EMAIL_FROM,
          to: email,
          subject: 'Password Reset',
          html: `<p>You requested a password reset. Here is your reset token:</p>
                 <p><b>${resetToken}</b></p>
                 <p>If you did not request this, please ignore this email.</p>`
      };

      // Send email
      await transporter.sendMail(mailOptions);
  } catch (error) {
      console.error('Error sending email: ', error);
  }
};
const requestPasswordReset = async (req, res) => { 
  const { email } = req.body;
  if (!email) {
      return res.status(400).send({ message: 'Email is required' });
  }

  try {
    // Get a promise-based connection from the pool
    const connection = await pool.getConnection();

    // Generate a random reset token
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Set the expiration time (e.g., 30 minutes)
    const expireTime = new Date();
    expireTime.setMinutes(expireTime.getMinutes() + 30);

    // Update the user's record with the reset token and expiration time
    const sql = 'UPDATE account SET password_reset_code = ?, password_reset_expires = ? WHERE email = ?';
  
    const [result] = await connection.execute(sql, [resetToken, expireTime, email]);

    connection.release(); // Release the connection back to the pool

    if (result.affectedRows === 0) {
        return res.status(404).send({ message: 'Email not found' });
    }

    // Send the reset email
    await sendResetEmail(email, resetToken);

    res.send({ message: 'Password reset email sent' });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: 'Error updating user data' });
  }
};

const resetPassword = async (req, res) => {
  const { resetToken, newPassword, confirmPassword } = req.body;

  if (!resetToken || !newPassword || !confirmPassword) {
    return res.status(400).send({ message: 'resetToken, newPassword, and confirmPassword are required' });
  }

  if (newPassword !== confirmPassword) {
    return res.status(400).send({ message: 'Passwords do not match' });
  }

  try {
    const connection = await pool.getConnection();

    // Check if the reset token and expiration time are valid
    const sql = 'SELECT * FROM account WHERE password_reset_code = ? AND password_reset_expires > NOW()';
    const [user] = await connection.execute(sql, [resetToken]);

    connection.release();

    if (user.length === 0) {
      return res.status(404).send({ message: 'Invalid reset token or expired' });
    }

    // Update the user's password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const updateSql = 'UPDATE account SET password = ?, password_reset_code = NULL, password_reset_expires = NULL WHERE password_reset_code = ?';
    await connection.execute(updateSql, [hashedPassword, resetToken]);

    res.send({ message: 'Password reset successful' });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: 'Error resetting password' });
  }
};

module.exports = {
  login,
  signUp,
  requestPasswordReset,
  resetPassword,
  GetCustomerIDByAccountID
};