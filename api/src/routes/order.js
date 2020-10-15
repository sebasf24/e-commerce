const server = require('express').Router();
const {Order}=require('../db');

<<<<<<< HEAD
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

=======
//ruta para obtener una orden por id
>>>>>>> 0a1b1531492d07922f092fef0b0cd21a7ccac59d
server.get('/:id',(req,res)=>{
    const orderId =req.params.id;

    Order.findOne({
        where:{id:orderId}
    }).then(respuesta=>{
<<<<<<< HEAD
        console.log("respuesta:",respuesta)
=======

>>>>>>> 0a1b1531492d07922f092fef0b0cd21a7ccac59d
        return res.send(respuesta);
    })
})

<<<<<<< HEAD
=======
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

>>>>>>> 0a1b1531492d07922f092fef0b0cd21a7ccac59d
module.exports= server;