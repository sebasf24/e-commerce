import {MOSTRAR_PRODUCTOS,MOSTRAR_PRODUCTOID,AGREGAR_PRODUCTOID,EDITAR_PRODUCTOID,MOSTRAR_PRODUCTO_CATEGORY,ELIMINAR_PRODUCTOID,BUSCAR_PRODUCTOIDS} from "../actions/products.js";

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
                products:actions.producto.data
            }
        }

        case ELIMINAR_PRODUCTOID:{
            return{
               products: state.products.filter( product=> product.id !== actions.data.id)
            }
        }
        

        case MOSTRAR_PRODUCTO_CATEGORY:{
            return{
                ...state,
                products:actions.productos.data
            }
        }

        case BUSCAR_PRODUCTOIDS:{
            return{
               products:actions.producto.data,
               selectedProduct:[]
            }
        }

        default: return state
    }
}