
const dbConfig = require('./dbconfig');
const Pool = require('pg').Pool

const pool = new Pool(dbConfig)

module.exports = pool;

