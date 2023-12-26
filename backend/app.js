const express = require("express");
const accountRoutes = require("./routes/accounts");
const authRoutes = require("./routes/auth");
const customerRoutes = require("./routes/customer");
const managerRoutes = require("./routes/manager");
const employeeRoutes = require("./routes/employee");
const routeRoute = require("./routes/route");
const trainRoute = require("./routes/train");
const carriageRoute = require("./routes/carriages");
const { verifyToken } = require("./middleware/authMiddleware");

require("dotenv").config();

const cors = require("cors");

const mysql = require("mysql2");
const bodyParser = require("body-parser");

const db = require("./config/database");
const configViewEngine = require("./config/viewEngine");
const app = express();

const port = process.env.PORT || 8888;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
// Config template engine
configViewEngine(app);

// define all our routes
app.use("/", accountRoutes);
app.use("/", verifyToken, authRoutes);
app.use("/", verifyToken,customerRoutes);
app.use("/", managerRoutes);
app.use("/",  employeeRoutes);
app.use("/api", routeRoute);
app.use("/api", trainRoute);
app.use("/api", carriageRoute);

app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on port ${port}`);
});

db.query("SELECT 1 + 1", (error, results, fields) => {
  if (error) {
    console.error("Error connecting to MySQL:", error.message);
    return;
  }
  console.log("Connected to My SQL!");
});
