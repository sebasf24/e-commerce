const server = require('express').Router();
const { Product , Category, Categoryproduct } = require('../db.js');

server.get('/', (req, res, next) => {
	Product.findAll()
		.then(products => {
			res.send(products);
		})
		.catch(next);
});

server.post('/:idProducto/category/:idCategoria',(req,res) => {
	 
	const  {idProducto, idCategoria} = req.params;

	 if(!idProducto || !idCategoria){
	   res.status(400).send("Faltan parametros !!!")
	} 
	
	//console.log(prod.setCategories(idCategoria))
	Categoryproduct.create({
		categoryId:idCategoria,
		productId:idProducto
	})
	//prod.setCategories(idCategoria)   	
   
   .then(algo=>{
	res.send(algo)
   })
   .catch(err=>{
	console.log("no anda")   
	res.send(err)})
}) 
//ELIMINAR PRODUCTO
server.delete('/:idProducto/category/:idCategoria', (req, res)=>{
	const  {idProducto, idCategoria} = req.params;

	 if(!idProducto || !idCategoria){
	   res.status(400).send("Faltan parametros !!!")
	} 

	Categoryproduct.destroy({
		where:{
			productId:idProducto,
			categoryId:idCategoria
		}
	})
	.then(() => {
		res.send("ando!!");

	})

})
// AGREGAR PRODUCTOS 
 server.post('/',(req,res) => {
//SE  CONTROLAN CAMPOS 
	const  {name, description, price, stock, img} = req.body;

	if(!name || !description || !price || !stock){
		res.status(400).send("Los campos enviados no son correctos.")
	 }
	
	 Product.create({
		 name:name,
		 description:description,
		 price:price,
		 stock:stock
	 })
	 .then((prod)=>{

		 res.json( res.status(200).json({
			name:name,
			description:description,
			price:price,
			stock:stock,
			img:img
	}))
	 })

}) 
//MODIFICAR PROD
server.put('/:idProducto',(req,res)=>{
	const  {idProducto} = req.params;
	const	{name, description, price, stock, img} = req.body

	if(!idProducto){
		res.status(400).send("Faltan parametros !!!")
	}
	if(!name || !description || !price || !stock){
		res.status(400).send("Los campos enviados no son correctos.")
	 }
	
	 Product.update(
		{
			name:name,
			description:description,
			price:price,
			stock:stock,
			img:img
		},
		{where:
			{id:idProducto}}
        )
        .then((r)=>{
            res.status(200).json({
					name:name,
					description:description,
					price:price,
					stock:stock,
					img:img
			})
        })
})

server.post('/category/',(req,res) => {
	 
	const  {name, description} = req.body;
	//console.log(req.body)
	Category.create({
		name:name,
		description:description,
	})
	.then((cat)=>{
		//console.log(cat)
		res.send("Categoria agregada")
	})
}) 

module.exports = server;

 


