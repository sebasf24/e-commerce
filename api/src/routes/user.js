const server = require('express').Router();
const { User, Order, Order_line, Product, Address, Favorite } = require('../db');
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
        where: {
            username: req.body.username
        }
    }).then((user) => {
        if (!user) {
            User.create({
                name: req.body.name,
                lastname: req.body.lastname,
                dni: req.body.dni,
                email: req.body.email,
                username: req.body.username,
                password: req.body.password,
                image: req.body.image,
                typeUser: req.body.typeUser
            }).then(user => {

                res.send(user)
            })

        } else res.send('usuario existente')
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
//ruta para obtener las Order_Line del usuario 
server.get('/:idUser/orderLines', (req, res) => {
    const { idUser } = req.params;
    Order.findOne({
        atributes: ['id', 'estado'],
        where: {
            userId: idUser,
            estado: 'carrito'
        },
        include: [{
            model: Order_line,
            atributes: ['id', 'price', 'cantidad']
        }]
    })
        .then(prod => {
            return res.send(prod)
        })
})
//ruta que devuelve todos los items del carrito
server.get('/:idUser/cart', (req, res) => {
    const { idUser } = req.params;

    Product.findAll({
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
    const { idUser } = req.params;
    const { productId, cantidad, price, estado } = req.body

    //buscamos el producto para actualizar el stock
    Product.findOne({
        where: { id: productId }
    })
        .then(prod => {
            Product.update(
                { stock: prod.stock - cantidad },
                { where: { id: productId } })
        })

    //Si existe una orden con el estado carrito la usa y si no la crea
    Order.findOrCreate({
        where: { userId: idUser },
        defaults: { estado: estado, userId: idUser },
    })
        .then(respuesta => {
            var idOrden = respuesta[0].dataValues.id
            Order_line.findOne({
                where: { orderId: idOrden, productId: productId }
            })
                .then(resp => {
                    var lineaDeOrden = {
                        cantidad: cantidad,
                        price: price,
                        productId: productId,
                        orderId: idOrden,
                    }
                    if (resp == null) {
                        Order_line.create(lineaDeOrden)
                        return res.send(lineaDeOrden)
                    }
                    console.log(resp)
                    Order_line.update({
                        cantidad: resp.dataValues.cantidad + cantidad
                    },
                        {
                            where: { orderId: idOrden, productId: productId }

                        })
                    return res.send(resp)
                })
                .catch(err => { res.send(err) })

        })
})

//ruta para modificar las cantidades en el carrito
server.put('/:idUser/cart', async (req, res) => {
    const { idUser } = req.params;
    const { productId, cantidad } = req.body;

    try {

        //buscamos la orden con el estado carrito del usuario
        const cartUser = await Order.findOne({
            where: { userId: idUser, estado: 'carrito' },
        })
        //buscamos la orderLine que esta linkeada con el producto
        const orderLine = await Order_line.findOne({
            where: { productId: productId }
        })

        //buscamos el producto que esta linkeado con la orderLine
        const product = await Product.findOne(
            {
                where: { id: productId }
            }
        )
        //verificamos stock
        if (cantidad > product.stock) {
            return res.send('La cantidad sobrepasa al stock');
        }

        //actualizamos stock del producto
        let cantidadActualizada = 0;
        if (orderLine.cantidad > cantidad || cantidad === 0) {

            cantidadActualizada = orderLine.cantidad - cantidad;
            product.stock = product.stock + cantidadActualizada;

        } else if (cantidad > orderLine.cantidad) {

            cantidadActualizada = cantidad - orderLine.cantidad;
            product.stock = product.stock - cantidadActualizada;
        }

        orderLine.cantidad = cantidad;

        await product.save();
        await orderLine.save();
        await cartUser.save();

        //si la cantidad es 0 eliminamos el producto del carrito
        if (cantidad === 0) {
            Order_line.destroy({
                where: { id: orderLine.id }
            })
            return res.send('item eliminado del carrito');
        }

        res.send(orderLine);

    } catch (err) {
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

//RUTA PARA AGREGAR UNA DIRECCION DE ENVIO AL USUARIO
server.post('/:id/address', (req, res) => {
    const { id } = req.params;
    User.findOne({
        where: { id: id }
    }).then((user) => {
        if (user) {
            Address.create({
                name: req.body.name,
                number: req.body.number,
                postalCode: req.body.postalCode,
                city: req.body.city,
                userId: id

            }).then(add => {
                res.send(add)
            })

        }

    })
        .catch(error => res.json(error));

})
//Obtener todos los productos favoritos de un usuario
server.get('/:id/favorite', (req, res) => {
    const userId = req.params.id;

    Favorite.findAll({
        where: { userId: userId }
    }).then(resp => {
        return res.send(resp)
    })


})
//agregar un producto a favoritos
server.post('/:id/favorite', (req, res) => {

    const userId = req.params.id;
    const productId = req.body.productId

    Favorite.create({
        userId: userId,
        productId: productId
    }).then(resp => {
        return res.send(resp);
    }).catch(err => {
        return res.send('ese producto ya esta en favoritos');
    })

})

//borrar un producto favorito

server.delete('/:id/favorite', (req, res) => {
    const userId = req.params.id;
    const productId = req.body.productId

    //buscamos si existe la relacion de Usuario y producto como favorito
    Favorite.findOne({
        where: { userId: userId, productId: productId }
    }).then(favorite => {
        //si existe lo eliminamos
        if (favorite) {
            Favorite.destroy({
                where: { id: favorite.id }
            }).then(dFavorite => {
                return res.status(200).send("El favorito fue eliminado")
            })
        } else {
            return res.status(200).send("Este producto no esta en tus favoritos")
        }

    })
});


module.exports = server;

