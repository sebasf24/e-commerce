const server = require('express').Router();
const { Product } = require('../db.js');
const { Sequelize } = require('sequelize');

const Op = Sequelize.Op

//toma el valor query que le pasan por la url, busca productos que tenga esas palabras en el nombre o descripcion
server.get('/',(req,res)=>{
    const search = req.query.query;
    

    if(!search){
        return res.send("Ingrese lo que desea buscar")
    }
    Product.findAll({
        where:{ [Op.or]: {
            name: {
           [Op.like] : '%'+search+'%'}
            ,
            description:{
            [Op.like] : '%'+search+'%'   
            }}
            }
    })
    .then(products => {
        if(products== false){
            return res.send("No hay resultados para: "+ search)
        }
        res.send(products);
    })
    .catch(err=>{ 
        res.send(err)})
})


module.exports = server;