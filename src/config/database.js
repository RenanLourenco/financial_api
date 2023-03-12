const Pool = require('pg').Pool;

const pool = new Pool({
    user:"renan",
    password:'admin',
    host:'localhost',
    port:5432,
    database:'financial_db'
})

module.exports = pool;