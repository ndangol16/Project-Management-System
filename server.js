const express = require('express');
const dotenv = require('dotenv');
const morgan = require = require('morgan');


const app = express();

dotenv.config({path:'config.env'});
const PORT = process.env.PORT || 8080;

// logs
app.use(morgan("tiny"));

app.get('/',(req,res)=>{
    res.send("TrellNOOO App");
});

app.listen(PORT,()=>{console.log(`Sevrer is running on http://localhost:${PORT}`)});