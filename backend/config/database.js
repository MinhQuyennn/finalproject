require("dotenv").config();
const mysql = require("mysql2");

const db = mysql.createPool({
  host: "www.db4free.net",
  user: "nghiango100",
  password: "Admin_123",
  database: "projectmhhdl",
});

module.exports = db;