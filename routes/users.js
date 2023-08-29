const {User} = require('../models/user');
const express = require("express");
const bcrypt = require('bcrypt');
const saltRounds = 10; //10 dafa ghuma do

const usersRouter = express.Router();

usersRouter.post("/register", async (req,res)=> {
    const userName = req.body.userName;
    const password = req.body.password;
    const existUser = await User.findOne({userName});
    if(existUser){
        console.log("Username already taken.");
        res.send({message:"Username already taken."});
    }else{
        //const userData = {userName,password}; //before bcrypt/hash
        //const userData = {userName};
        // await bcrypt.hash(password,saltRounds).then((hash)=>{
        //     userData.password = hash;
        // })
        const hashedPassword = await bcrypt.hash(password,saltRounds);
        const userData = {userName,password:hashedPassword};//password key neccessary for bcrypt.compare()
        const unsavedUser = new User(userData);
        const savedUser = await unsavedUser.save(); //.save() provided by mongoose
        console.log("Created");
        console.log(savedUser);
        res.status(200).send({user:savedUser,message:"New User created... "});
    }
    
});

usersRouter.post("/login",async (req,res)=> {
    const userName = req.body.userName;
    const password = req.body.password;
    const isUser = await User.findOne({userName});
    if(isUser){
        console.log(isUser);
     // if(isUser.password === password){
        const passwordMatch = await bcrypt.compare(password,isUser.password);//comparing the password with password hash
        if(passwordMatch){
            res.send({message:"Login Successful"});
        }else{
            res.send({message:"Wrong password"});
        }
    }else{
        res.send({message:"No user data available for this username"});
    }

});

module.exports = usersRouter;

// const registerUser = async (req,res)=> {
//     const userName = req.body.userName;
//     const password = req.body.password;
//     const existUser = await User.findOne({userName});
//     if(existUser){
//         console.log("Username already taken.");
//         res.send({message:"Username already taken."});
//     }else{
//         const userData = {userName,password};
//         const unsavedUser = new User(userData);
//         const savedUser = await unsavedUser.save(); //.save() provided by mongoose
//         console.log("Created");

//         res.status(200).send({user:savedUser,message:"New User created... "});
//     }
// };

// const loginUser =async (req,res)=> {
//     const userName = req.body.userName;
//     const password = req.body.password;
//     const isUser = await User.findOne({userName});
//     if(isUser){
//         if(isUser.password === password){
//             res.send({message:"Login Successful"});
//         }else{
//             res.send({message:"Wrong password"});
//         }
//     }else{
//         res.send({message:"No user data available for this username"});
//     }
// };


// module.exports = {registerUser,loginUser};