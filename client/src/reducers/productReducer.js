import {MOSTRAR_PRODUCTOS,MOSTRAR_PRODUCTOID, MOSTRAR_PRODUCTO_CATEGORY} from "../actions/products.js";

const initalStore ={
    products:[],
    selectedProduct:[]
}

export default (state=initalStore, actions) =>{
    switch(actions.type){
        case MOSTRAR_PRODUCTOS:{
            
            return{
                ...state,
                products:actions.productos.data
            }
        }

        case MOSTRAR_PRODUCTOID:{
            return{
                selectedProduct:actions.producto.data
            }
        }

        case MOSTRAR_PRODUCTO_CATEGORY:{
            return{
                ...state,
                products:actions.productos.data
            }
        }

        default: return state
    }
}