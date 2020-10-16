import  {AGREGAR_PRODUCTO_CARRITO,QUITAR_PRODUCTO_CARRITO,VACIAR_CARRITO} from '../actions/cart.js';

const initialState={
    productos:[]
  }


  export default (state=initialState, actions)=>{
    switch(actions.type){
        case AGREGAR_PRODUCTO_CARRITO:
            return  {
                ...state,
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
        default:
            return state;
    }

}