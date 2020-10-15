const server = require('express').Router();
const {Order}=require('../db');

server.get('/', (req,res)=>{
    const status = req.query.status;

    if(!status){
    return Order.findAll()
    .then(orders=>{
        res.send(orders)
    })
    }
    else {
        Order.findAll({
            where:{
                estado: status
            }
        })
        .then(orders=>{
            res.send(orders)
        })
        .catch(err=>{
            console.log(err)
            res.send("algo malir sal");})
        }
})

server.get('/:id',(req,res)=>{
    const orderId =req.params.id;

    Order.findOne({
        where:{id:orderId}
    }).then(respuesta=>{
        console.log("respuesta:",respuesta)
        return res.send(respuesta);
    })
})

module.exports= server;