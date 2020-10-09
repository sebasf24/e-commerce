import {MOSTRAR_PRODUCTOS,MOSTRAR_PRODUCTOID} from "../actions/products.js";

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
        default: return state
    }
}