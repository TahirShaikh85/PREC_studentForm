const express = require("express");
const PORT = 3000;
const app = express();
const mysql = require("./database/connection");
const cors = require("cors");

app.use(express.json());
app.use(cors());

// Connect to the MySQL database
mysql.connect((err) => {
  if (err) {
    console.error("MySQL connection error: " + err);
    return;
  }
  console.log("Connected to MySQL database");
});

app.get("/", (req, res) => {
  res.send("hello world");
});

// routes
app.use("/api", require("./routes/routes"));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
