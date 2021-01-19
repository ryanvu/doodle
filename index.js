const express = require('express');
const dotenv = require('dotenv');
const pool = require('./db');
const app = express();

app.use(express.json());
dotenv.config();

const PORT = process.env.PORT || 6060;
//connecting to database
pool.connect()
.then( res=> {
    console.log('connected to database');
})
.catch(err=>{
    console.log(err);
})


//create a user
app.post("/createUser", (req, res) => {
    const { id, username, password, email } = req.body
    const query = `INSERT INTO users (username, password, email) VALUES($1, $2, $3) RETURNING *`
    const values = [username, password, email]
    pool.query(query, values, (err, result) => {
        if (err) {
            console.log(err.stack)
        } else {
            res.send(result.rows[0]);
        };
    })
})

app.listen(PORT, ()=> {
    console.log(`server is listening on http://localhost:${PORT}`);
})