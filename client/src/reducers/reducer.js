import {MOSTRAR_PRODUCTOS} from "../actions/products.js";

const initalStore ={
    productos:[]
}

export default (state=initalStore, actions) =>{
    switch(actions.type){
        case MOSTRAR_PRODUCTOS:{
            
            return{
                ...state,
                productos:actions.productos.data
            }
        }
        default: return state
    }
}