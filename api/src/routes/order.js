const server = require('express').Router();
const {Order}=require('../db');

server.get('/:id',(req,res)=>{
    const orderId =req.params.id;

    Order.findOne({
        where:{id:orderId}
    }).then(respuesta=>{
        console.log("respusta:",respuesta)
        return res.send(respuesta);
    })
})

module.exports= server;