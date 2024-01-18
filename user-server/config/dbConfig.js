// config/dbConfig.js
const mysql = require('mysql2');

// MySQL database connection configuration
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'mataro091',
  database: 'user',
});

module.exports = db;
