const productrouter =require('./routes/productrouter.js')
const express=require ("express");
const app=express();

app.use(express.json())

app.use('/api/product',productrouter)
module.exports=app