import {MOSTRAR_PRODUCTOS,MOSTRAR_PRODUCTOID,AGREGAR_PRODUCTOID,EDITAR_PRODUCTOID,ELIMINAR_PRODUCTOID} from "../actions/products.js";

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

        case AGREGAR_PRODUCTOID:{
            return{
                product:actions.producto.data
            }
        }

        case EDITAR_PRODUCTOID:{
            return{
                ...state,
                product:actions.producto.data,
                selectedProduct: []
            }
        }

        case ELIMINAR_PRODUCTOID:{
            return{
               product:actions.producto.data,
               selectedProduct: []
            }
        }
        
        default: return state
    }
}