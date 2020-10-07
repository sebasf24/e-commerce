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
	Product.findByPk(idProducto)

   .then(prod=>{
	console.log(prod)
	//console.log(prod.setCategories(idCategoria))
	Categoryproduct.create({
		categoryId:idCategoria,
		productId:idProducto
	})
	//prod.setCategories(idCategoria)   	
   })
   .then(algo=>{
	res.send(algo)
   })
   .catch(err=>{
	console.log("no anda")   
	res.send(err)})
}) 


server.delete('/:idProducto/category/:idCategoria', (req, res)=>{
	const  {idProducto, idCategoria} = req.params;
	
	Categoryproduct.destroy({
		where: {
			categoryId: idCategoria,
			productId: idProducto
		}
	}).then(nro=>{
		res.send("ANDO")
	})
})

 server.post('/addProd/',(req,res) => {
	 
	 const  {name, description, price, stock} = req.body;
	 Product.create({
		 name:name,
		 description:description,
		 price:price,
		 stock:stock
	 })
	 .then((prod)=>{
		// console.log(prod)
		 res.send("producto agregado")
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

 


