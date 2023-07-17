const mysql2 = require('mysql2');

const pool = mysql2.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '1407',
    database: 'nodemysql', 
});

module.exports = pool

