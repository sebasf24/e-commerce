const server = require('express').Router();
const { User, Order, Order_line, Product } = require('../db');

//Ruta que retorne todos los Usuarios
server.get('/', (req, res) => {
    User.findAll()
        .then(user =>
            res.send(user))

})
//Ruta que retorne todas las Ordenes de los usuarios
server.get('/:id/orders', (req, res) => {
    const { id } = req.params;
    Order.findAll(
        {
            where: {
                userId: id
            }
        }
    )
        .then(orden =>
            res.send(orden))

})

//Ruta para creación de Usuario
server.post('/', (req, res) => {
    User.create({
        name: req.body.name,
        lastname: req.body.lastname,
        dni: req.body.dni,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        image: req.body.image,
        typeUser: req.body.typeUser,
    })
        .then((user) => {
            res.send(user)
        })
        .catch(error => {
            res.status(500).send("Error: " + error)
        })

})
//Ruta para modificar Usuario
server.put('/:id', (req, res) => {
    const { id } = req.params;
    User.update({
        name: req.body.name,
        lastname: req.body.lastname,
        dni: req.body.dni,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        image: req.body.image,
        typeUser: req.body.typeUser,
    },
        {
            where: { id }
        })
        .then((user) => {
            res.send(user)
        })
        .catch(error => {
            res.status(500).send("Error: " + error)
        })

})
//ruta que devuelve todos los items del carrito
server.get('/:idUser/cart', (req, res) => {
    const { idUser } = req.params;

    Product.findAll({
        attributes: ['id', 'name'],
        include: [{
            model: Order,
            attributes: ['id', 'estado'],
            where: {
                userId: idUser
            },
            through: { attributes: ["cantidad"] }
        }]
    })
        .then(respuesta => {
            return res.send(respuesta)
        })


})
//ruta que agrega un item al carrito
server.post('/:idUser/cart', (req, res) => {
    const {idUser} = req.params;
    const {estado,productId,cantidad,price}=req.body

    Product.findOne({
        where:{id:productId}
    }).then(product=>{
        let stockUpdate=product.stock-cantidad
        Product.update(
            {stock:stockUpdate},{where:{id:productId}}
        )
    })

     Order.findOrCreate({
       where:{userId:idUser},
       defaults: {estado:estado,userId:idUser}
    }).then(respuesta=>{

        Order_line.create({
            orderId:respuesta[0].id,
            productId:productId,
            cantidad:cantidad,
            price: price
        })

        

        return res.status(200).send(respuesta);
    }).catch(err=>{
        return res.send(err);
    })


});

//ruta para modificar las cantidades en el carrito
server.put('/:idUser/cart',async(req,res)=>{
    const {idUser} = req.params;
    const {productId,cantidad} =req.body;

try{

    //buscamos la orden con el estado carrito del usuario
    const cartUser= await Order.findOne({
        where:{userId:idUser,estado:'carrito'},
    })
    //buscamos la orderLine que esta linkeada con el producto
    const orderLine= await Order_line.findOne({
        where:{productId:productId}
    })

    //buscamos el producto que esta linkeado con la orderLine
    const product= await Product.findOne(
        {
            where:{id:productId}
        }
    )
    if(cantidad>product.stock){
        return res.send('La cantidad sobrepasa al stock');
    }
    
    let cantidadActualizada = 0;
    if (orderLine.cantidad > cantidad || cantidad === 0) {

        cantidadActualizada = orderLine.cantidad - cantidad;
        product.stock = product.stock + cantidadActualizada;

    } else if (cantidad > orderLine.cantidad) {

        cantidadActualizada = cantidad - orderLine.cantidad;
        product.stock = product.stock - cantidadActualizada;
    }

    orderLine.cantidad=cantidad;

    await product.save();
    await orderLine.save();
    await cartUser.save();

    if(cantidad === 0){
        Order_line.destroy({
            where:{id:orderLine.id}
        })
        return res.send('item eliminado del carrito');
    }

    res.send(orderLine);

}catch(err){
    return res.send(err)
}

});
server.delete('/:idUser/cart', (req, res) => {
    const { idUser } = req.params;

    Order.destroy({
        where: {
            userId: idUser
        }
    })
    .then(respuesta => {
        return res.send('Se vacio el carrito')
    })
    .catch(err => {
        res.send("algo salio mal")
    })

});
//Loggin de usuario
server.get('/login', (req, res, next) => {
        const username = req.query.username
        const password = req.query.password
        console.log(username, password)
    
        if (username && password) {
            User.findOne({
                where: {
                    username: username,
                    password: password
                }
            })
                .then(user =>
                    res.send(user)
                )
                .catch((err) => {
                    res.status(404).send('Usuario Invalido')
                })
    
        } else {
            res.send('Usuario Invalido')
        }
 })


//Ruta para eliminar un usuario
server.delete('/:id', (req, res) => {
    const { id } = req.params;
    User.destroy({ where: { id } })
        .then(user => {
            if (!user) {
                //sino lo encuentra un usuario devuelve un error
                return res.status(400).send("El usuario no existe");
            } else {
                //sino, borra usuario
                return res.status(200).send("El usuario fue eliminado")
            }
        })
        .catch(err => {
            res.send('Esto es un error: ' + err);
        })
});


module.exports = server;

