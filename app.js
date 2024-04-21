const express = require('express');

//import post router and user router
const postRouter = require('./routes/post.routes');
const userRouter = require('./routes/user.routes')



//create express app
const app = express();


//add middleware to parse request body
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));


//Middleware for API endpoints
app.use("/api", userRouter)
app.use("/api/posts", postRouter)


module.exports = app;