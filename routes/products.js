const {Product} = require('../models/product');
const express = require("express");

const productsRouter = express.Router();

productsRouter.get('/electronics',async (req,res) =>{
    const electronics = await Product.find({});
    if(electronics){
        res.send({electronicProducts :electronics});
    }else{
        res.send({message:"No electronics products found."});
    }
})

module.exports = productsRouter;
