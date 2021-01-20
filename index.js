const express = require('express');
const dotenv = require('dotenv');
const pool = require('./db');
const app = express();
const cors = require('cors');
const bcrypt = require('bcrypt');

app.use(cors());
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
app.get("/", (req, res) => {
    res.send("hello world")
})

//login 
app.post("/login", (req, res) => {
    const { username, password } = req.body;
    const query = `SELECT * FROM users`;
    pool.query(query, async (err, result) => {
        if (err) {
            console.log(err.stack);
            res.status(404).send("Wrong username or password");
            } else {
                const users = result.rows;
                const user = users.find(u => u.username == username)
                if (user == null) {
                    return res.status(400).send('Cannot find user');
                } 
                try {
                    if (await bcrypt.compare(password, user.password)) {
                        res.status(200).cookie('username', `${username}`, { domain: 'doodlegram.com' ,maxAge: 90000 }).send('Sucessfully Logged In');
                    } else {
                        res.send('The password for this account is incorrect');
                    }
                } catch {
                    res.status(500).send();
                }
            }
    })
})

//create a user
app.post("/createUser", async (req, res) => {
    const { username, password, email } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    pool.query(`SELECT * FROM users WHERE email = $1`, [email], (err, r1) => {
        if (err) {
            console.log(err);
        } else {
            if (r1.rows.length > 0) {
                res.status(400).send('This email is already taken')
            } else {
                const query = `INSERT INTO users (username, password, email) VALUES($1, $2, $3) RETURNING *`
                const values = [username, hashedPassword, email]
                pool.query(query, values, (error, result) => {
                    if (err) {
                        console.log(error.stack);
                    } else {
                        res.status(201).send(result.rows[0]);
                    };
                })
            }
        }
    })

    
})

app.listen(PORT, ()=> {
    console.log(`server is listening on http://localhost:${PORT}`);
})