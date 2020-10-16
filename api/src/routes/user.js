const server = require('express').Router();
const { User, Order,Order_line, Product }=require('../db');

//Ruta que retorne todos los Usuarios
server.get('/',(req, res)=>{
    User.findAll()
    .then(user=>
        res.send(user))

})
//Ruta que retorne todas las Ordenes de los usuarios
server.get('/:id/orders',(req, res)=>{
    const {id}= req.params;
    Order.findAll(
       { where:{
        userId:id
        }}
    )
    .then(orden=>
        res.send(orden))

})

//Ruta para creación de Usuario
server.post('/',(req, res)=>{
    User.create({
        name:req.body.name,
        lastname:req.body.lastname,
        dni:req.body.dni,
        email:req.body.email,
        username:req.body.username,
        password:req.body.password,
        image:req.body.image,
        typeUser:req.body.typeUser,
    })
    .then((user)=>{
        res.send(user)
    })
    .catch(error=>{
        res.status(500).send("Error: "+ error)
    })

})
//Ruta para modificar Usuario
server.put('/:id',(req, res)=>{
    const {id}= req.params;
    User.update({
        name:req.body.name,
        lastname:req.body.lastname,
        dni:req.body.dni,
        email:req.body.email,
        username:req.body.username,
        password:req.body.password,
        image:req.body.image,
        typeUser:req.body.typeUser,
    },
    {
        where:{id}
    })
    .then((user)=>{
        res.send(user)
    })
    .catch(error=>{
        res.status(500).send("Error: "+ error)
    })

})
//ruta que devuelve todos los items del carrito
server.get('/:idUser/cart', (req,res)=>{
    const {idUser} = req.params;

    Product.findAll({
        attributes: ['id','name'],
		include:[{
			model:Order,
			attributes: ['id','estado'],
			where:{
				userId:idUser
			},
			through: {attributes: ["cantidad"]}
		}]
	})
        .then(respuesta=>{
        return res.send(respuesta)
    })

    
})
//ruta que agrega un item al carrito
server.post('/:idUser/cart', (req, res) => {
    const {idUser} = req.params;
    const {estado,productId,cantidad,price}=req.body


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

//Ruta para eliminar un usuario
server.delete('/:id', (req, res) => {
    const {id} = req.params;
    User.destroy({ where: {id} })
    .then(user=>{
        if (!user){
            //sino lo encuentra un usuario devuelve un error
            return res.status(400).send("El usuario no existe");
        } else {
            //sino, borra usuario
            return res.status(200).send("El usuario fue eliminado")
        }
    })
});


c
