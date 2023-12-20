const express = require("express");
const accountRoutes = require("./routes/accounts");
const authRoutes = require("./routes/auth");
const meetingRouter = require("./routes/meeting");

const cors = require('cors');


const mysql = require('mysql2');
const bodyParser = require('body-parser');

const db = require("./config/database")
const configViewEngine = require("./config/viewEngine")
const app = express();

const port = process.env.PORT || 8888;


app.use(cors());
app.use(express.json());

// Config template engine
configViewEngine(app)

// define all our routes
app.use("/", accountRoutes);
app.use("/", authRoutes);
app.use("/", meetingRouter);



app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
});

db.query('SELECT 1 + 1', (error, results, fields) => {
  if (error) {
    console.error('Error connecting to MySQL:', error.message);
    return;
  }
  console.log('Connected to My SQL!');
});   

 