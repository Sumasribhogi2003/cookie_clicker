const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Your MySQL username
  password: '1234', // Your MySQL password
  database: 'cookie_clicker',
});

module.exports = connection;
