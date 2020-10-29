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

//ruta para obtener una orden por id
// server.get('/:id',(req,res)=>{
//     const orderId =req.params.id;

//     Order.findOne({
//         where:{id:orderId}
//     }).then(respuesta=>{
//         console.log("respuesta:",respuesta)

//         return res.send(respuesta);
//     })
// })

server.get('/:id',(req,res)=>{
    const orderId =req.params.id;
    Order_line.findAll({
        where:{orderId: orderId}
    }).then((resp)=>{
        res.send(resp)
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

//Camiar estado order
server.get('/state/:id/:cancel', (req, res) => {
    const orderId = req.params.id;

    const cancel = req.params.cancel;

    if (cancel === 'false') {
        Order.findOne({
            where: {
                id: orderId
            }
        })
            .then(respuesta => {
                console.log(respuesta.dataValues.estado)
                switch (respuesta.dataValues.estado) {
                    case 'carrito':
                        Order.update(
                            {
                                estado: 'procesando'
                            },
                            {
                                where:
                                {
                                    id: respuesta.dataValues.id
                                }
                            }
                        )
                            .then(resp => {
                                Order.findAll()
                                    .then(order => {
                                        return res.send(order);
                                    })
                            })
                        break;
                    case 'procesando':
                        Order.update(
                            {
                                estado: 'enviada'
                            },
                            {
                                where:
                                {
                                    id: respuesta.dataValues.id
                                }
                            }
                        )
                            .then(resp => {
                                Order.findAll()
                                    .then(order => {
                                        return res.send(order);
                                    })
                            })
                        break;
                    case 'enviada':
                        Order.update(
                            {
                                estado: 'completada'
                            },
                            {
                                where:
                                {
                                    id: respuesta.dataValues.id
                                }
                            }
                        )
                            .then(resp => {
                                Order.findAll()
                                    .then(order => {
                                        return res.send(order);
                                    })
                            })
                        break;
                    case 'completada':
                        Order.update(
                            {
                                estado: 'completada'
                            },
                            {
                                where:
                                {
                                    id: respuesta.dataValues.id
                                }
                            }
                        )
                            .then(resp => {
                                Order.findAll()
                                    .then(order => {
                                        return res.send(order);
                                    })
                            })
                        break;
                    default:
                        break;
                }
            })
            .catch(err => {
                console.log(err)
                res.send(err)
            })
    } else {
        Order.findOne({
            where: {
                id: orderId
            }
        })
            .then(respuesta => {
                if (respuesta.dataValues.estado !== 'completada') {
                    Order.update(
                        {
                            estado: 'cancelada'
                        },
                        {
                            where:
                            {
                                id: respuesta.dataValues.id
                            }
                        }
                    )
                        .then(resp => {
                            Order.findAll()
                                .then(order => {
                                    return res.send(order);
                                })
                        })
                }
            })
            .catch(err => {
                return res.send(err);
            })
    }
})

module.exports= server;