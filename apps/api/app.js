const express = require('express');
const mongoose=require('mongoose');
const columnRouter=require('./controllers/columnController');
// const taskRouter=require('./controllers/taskController');
const userRouter=require('./controllers/userController');

const app = express();

mongoose .connect('mongodb://127.0.0.1/DWIT')
.then(()=>console.log('connected to mongodb'))
.catch(err=>console.error('could not connect to mongodb',err));

app.use (express.json());
app.use('/api/columns',columnRouter);
// app.use('/api/tasks',taskRouter);
app.use('/api/users',userRouter);

app.listen(process.env.API_PORT, () => {
    console.log(`Listening on port ${process.env.API_PORT}`);
})
