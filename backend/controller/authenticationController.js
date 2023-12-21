// controllers/AuthController.js
const db = require("../config/database");
const accountsModel = require("../models/accounts");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const validateRegisterInput = require("../validator/RegisterValidator");
require("dotenv").config();

const login = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const sql = `SELECT * FROM account WHERE email = ?`;
  
    db.query(sql, [email], (err, result) => {
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
  
      if(password === account.password){
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
                status: "successe",
                token: token,
                role: account.role,
                id: account.account_id,
              });
            }
          );
          
      }
        
      });
}


const signUp = async (req, res, next) => {
  const { email, password, full_name, date_of_birth, position , company, gender, phonenumber} = req.body;

  // Check if the email already exists
  const checkEmailQuery = 'SELECT * FROM account WHERE email = ?';
  db.query(checkEmailQuery, [email], (err, result) => {
    if (err) {
      return res.status(500).json({
        status: 'failed',
        error: 'Internal Server Error',
      });
    }

    if (result.length > 0) {
      return res.status(401).json({
        status: 'error',
        message: 'Email already exists.',
      });
    }

    // If email doesn't exist, insert the new account
    const insertAccountQuery = `
        INSERT INTO account 
        (email, password, full_name, date_of_birth, position,company, gender, phonenumber, role)
        VALUES (?, ?, ?, ?, ?, ? , ?, ?, ?)
      `;
      const newUserValues = [email, password, full_name, date_of_birth, position, company, gender, phonenumber, 'user'];


      db.query(insertAccountQuery, newUserValues, (err, result) => {
        if (err) {
          return res.status(400).json({
            status: 'failed',
            error: 'Bad Request',
          });
        }
      
        res.json({
          status: 'success',
          message: 'Successfully created account!',
          data: result,
        });
    });
  });
};

module.exports = {
  login,
  signUp
};