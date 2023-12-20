const db = require("../config/database");
const express = require("express");
const { accountsModel } = require("../models/accounts");

const getAccount = async (req, res) => {
    const sql = "SELECT * FROM account";
    db.query(sql, (err, result) => {
      if (err) {
        return res.status(500).json({ Error: "Error fetching account" });
      }
      return res.status(200).json({ Status: "Success", accounts: result });
    });
  };

  const getByID = async (req, res) => {
    const id = req.params.id; 
    const sql = "SELECT * FROM account where id = ?";
    const values = [id];
    db.query(sql, values, (err, result) => {
        if (err) {
        return res
            .status(500)
            .json({ Error: "Error fetching account ID" });
        }
        return res.status(200).json({ Status: "Success", Account: result });
    });
  };

  const getFullNameByID = async (req, res) => {
    const id = req.params.id; 
    const sql = "SELECT full_name FROM account where id = ?";
    const values = [id];
    db.query(sql, values, (err, result) => {
        if (err) {
        return res
            .status(500)
            .json({ Error: "Error fetching account ID" });
        }
        return res.status(200).json({ Status: "Success", Account: result });
    });
  };

  const getaccountByID = async (req, res) => {
    const id = req.params.id; 
    const sql = "SELECT * FROM account where id = ?";
    const values = [id];
    db.query(sql, values, (err, result) => {
        if (err) {
        return res
            .status(500)
            .json({ Error: "Error fetching account ID" });
        }
        return res.status(200).json({ Status: "Success", Account: result });
    });
  };

  const updateaccountID = async (req, res) => {
    const id = req.params.id; 
    const status = req.body.status;
  
    const sql = "UPDATE account SET ..... where  id = ?";
    const values = [status, id];
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error("Error deleting:", err);
        return res.status(500).json({ Error: "Internal server error" });
      }
  
      return res.status(200).json({ Status: "Account updated successfully" });
    });
  };

  module.exports = {
    getAccount,
    getByID,
    getFullNameByID,
    getaccountByID , 
    updateaccountID
  };

