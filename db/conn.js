const mysql2 = require('mysql2');
require('dotenv').config()

const conn = mysql2.createConnection({
    connectionLimit: 10,
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE, 
});

module.exports = conn


