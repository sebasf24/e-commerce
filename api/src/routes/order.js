const server = require('express').Router();
const {Order}=require('../db');

//ruta para obtener una orden por id
server.get('/:id',(req,res)=>{
    const orderId =req.params.id;

    Order.findOne({
        where:{id:orderId}
    }).then(respuesta=>{

        return res.send(respuesta);
    })
})

//ruta para modificar una orden por id
server.put('/:id', (req,res)=>{
    const {id} = req.params;
    const {estado} = req.body;
    Order.update({
        estado: estado
    },
    {
        where:{id:id}
    }
    )

    res.send('orden modificada correctamente');
})

module.exports= server;