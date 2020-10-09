import axios from 'axios';
export const MOSTRAR_PRODUCTOS = "MOSTRAR_PRODUCTOS";
export const MOSTRAR_PRODUCTOID= "MOSTRAR_PRODUCTOID";

//const fetch = require('node-fetch');

 export function mostrarProductos(){
    return function(dispatch){
        return axios.get('http://localhost:3000/products')

                .then(json=>{
                    dispatch({
                        type:MOSTRAR_PRODUCTOS,
                        productos:json
                    })
                })
                .catch(err=>{console.log(err)})

    }
}

export function mostrarProducto_id(id){
    return function(dispatch){
        return axios.get(`http://localhost:3000/products/${id}`)

                .then(json=>{
                    dispatch({
                        type:MOSTRAR_PRODUCTOID,
                        producto:json
                    })
                })
                .catch(err=>{console.log(err)})

    }
}
