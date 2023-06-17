const express = require('express');
const dotenv = require('dotenv');
const morgan = require = require('morgan');
const bodyparser = require('body-parser');
const path = require('path');


const app = express();

dotenv.config({path:'config.env'});
const PORT = process.env.PORT || 8080;

// logs
app.use(morgan("tiny"));

// parse request
app.use(express.urlencoded({extended : true}));



// load assets
app.use('/css',express.static(__dirname + "assets/css"));
app.use('/js',express.static(__dirname + "assets/js"));
app.use('/img',express.static(__dirname + "assets/img"));
// app.use('/js',express.static(path.resolve(__dirname,"assets/js")));
// app.use('/img',express.static(path.resolve(__dirname,"assets/img")));

// load routers
app.use('/',require('./server/routes/router'));

app.listen(PORT,()=>{console.log(`Sevrer is running on http://localhost:${PORT}`)});