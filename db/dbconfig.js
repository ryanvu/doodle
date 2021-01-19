
const dotenv = require('dotenv');
dotenv.config();

const dbConfig = {
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    user: process.env.PGUSER,
    database: process.env.PGNAME,
    password: null
}

