const express = require('express');
const pool = require('./db');
const app = express();

pool.connect()
.then( res=> {
    console.log('connected to database');
})
.catch(err=>{
    console.log(err);
})


app.listen(5000, ()=> {
    console.log("server is listening on 5000");
})