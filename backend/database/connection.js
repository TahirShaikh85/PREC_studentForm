const mysql = require("mysql");

// Create a MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "TAHIR",
  password: "tahir@123",
  database: "prec",
});


module.exports = db;
