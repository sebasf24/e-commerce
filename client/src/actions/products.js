import axios from 'axios';
export const MOSTRAR_PRODUCTOS = "MOSTRAR_PRODUCTOS";

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
