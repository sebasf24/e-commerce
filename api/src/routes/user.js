const server = require('express').Router();
const { User, Order, Order_line, Product } = require('../db');
const nodemailer = require('nodemailer');

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
    User.findOne({
        where:{
            username: req.body.username
        }
    }).then((user)=>{
        if(!user){
            User.create({
                name:req.body.name,
                lastname:req.body.lastname,
                dni:req.body.dni,
                email:req.body.email,
                username:req.body.username,
                password:req.body.password,
                image:req.body.image,
                typeUser:req.body.typeUser
            }).then(user=>{
                console.log(user)
                res.send('Usuario creado')
            })
    
        }else res.send('usuario existente')
    })
    .catch(error => res.json(error));
  
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
//ruta que agrega un item al carrito
server.post('/:idUser/cart', (req, res) => {
    const {idUser} = req.params;
    const estado=req.body[0]
   // productId,cantidad,price
    const producto=req.body[1]
    console.log(producto)
   /*  Product.findOne({
        where:{id:producto.productId}
    }).then(product=>{
        //let stockUpdate=product.stock-cantidad
        Product.update(
            {stock:producto.cantidad},{where:{id:producto.productId}}
        )
    }) */

     Order.findOrCreate({
       where:{userId:idUser},
       defaults: {estado:estado,userId:idUser}
    }).then(respuesta=>{
        var objOrder_line=[]
        for(let i=0 ; i<producto.length;i++){
          var {productId,cantidad,price}=producto[i]
            objOrder_line.push({
                orderId:respuesta[0].id,
                productId:productId,
                cantidad:cantidad,
                price:price
            })
        console.log(objOrder_line)
        }
        Order_line.bulkCreate(
            objOrder_line
        )

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


//resetPassword
server.post('/:idUser/passwordReset', (req, res) => {
    const { idUser } = req.params;
    const { password } = req.body;

    const { email } = req.body;

    if (idUser === "0") {
        User.findOne({
            where: {
                email: email
            }
        })
            .then(user => {

                var transporter = nodemailer.createTransport({
                    service: 'Gmail',
                    auth: {
                        user: 'ecomerceft1@gmail.com',
                        pass: 'ecomerce1547'
                    }
                });


                var mailOptions = {
                    from: 'Remitente',
                    to: user.email,
                    subject: 'ResetPassword',
                    text: `Cambiar contraseña http://localhost:3006/newPass?id=${user.id}`
                };

                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                        res.status(500);
                        res.send(error);
                        return
                    } else {
                        console.log("Email sent");
                        res.status(200).jsonp(req.body);
                        return
                    }
                });
            })
            .catch(err => {
                return res.send('Esto es un error: ' + err);
            })

    } else if (password) {
        
                User.update(
                    {
                        password: password
                    },
                    {
                        where: {
                            id: idUser
                        }
                    })
                    .then(user => {
                        return res.status(200);
                    })
                    .catch(err => {
                        return res.send(err);
                    })
    }
});


module.exports = server;

