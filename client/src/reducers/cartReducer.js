import  {AGREGAR_PRODUCTO_CARRITO,QUITAR_PRODUCTO_CARRITO,VACIAR_CARRITO,MODIFICAR_STOCK,MOSTRAR_TOTAL} from '../actions/cart.js';

const initialState={
    productos:[],
    stock:{},
    total:0
  }


  export default (state=initialState, actions)=>{
    switch(actions.type){
        case AGREGAR_PRODUCTO_CARRITO:
            let stockProd={} 
            stockProd[actions.producto.id]=1
            return  {
                ...state,
                stock: stockProd,
                productos: state.productos.concat(actions.producto) 
            }
         case QUITAR_PRODUCTO_CARRITO:
            return  {
                ...state,
                productos: state.productos.filter(prod=>prod !== actions.producto) 
            }
        case VACIAR_CARRITO:
            return  {
                ...state,
                productos: actions.producto
            }

        case MODIFICAR_STOCK:
            console.log(actions.id) 
            return  {
                ...state,
                    stock:{
                        ...state.stock,
                    [actions.stock]: actions.id
                    }            
            }
        case MOSTRAR_TOTAL:{
            return{
                ...state,
                total:actions.total
            }
        }   
        default:
            return state;
    }

}