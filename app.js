const express = require('express');
const mongoose = require('mongoose');
//const {registerUser,loginUser} = require('./routes/users')
const usersRouter = require('./routes/users')
const productsRouter = require('./routes/products')
const app = express();

require("dotenv").config();
//console.log("Process",process.env.mongoURI);
//mongoose.connect(process.env.mongoURI)
 // .then(() => console.log('Connected!'));

app.use(express.json());
app.get("/",(req,res)=> {
    //res.sendStatus(200);
    //res.send("BISMILLAH");
    res.status(200).send("Server is running");
});

//user APIs
// app.post("/register",registerUser);
// app.post("/login",loginUser);
app.use("/users",usersRouter);

//products api
app.use("/products",productsRouter);

app.listen(8000,()=>console.log("Server is running"));