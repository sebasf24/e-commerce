export const AGREGAR_PRODUCTO_CARRITO = "AGREGAR_PRODUCTO_CARRITO";
export const QUITAR_PRODUCTO_CARRITO = "QUITAR_PRODUCTO_CARRITO";
export const VACIAR_CARRITO ="VACIAR_CARRITO";


export function agregarProductoCarrito(producto){
    return{
        type: AGREGAR_PRODUCTO_CARRITO,
        producto
    } 
}

export function quitarProdCarrito(producto){
    return{
        type: QUITAR_PRODUCTO_CARRITO,
        producto
    } 
}

export function vaciarCarrito(){
    return{
        type: VACIAR_CARRITO,
        producto:[]
    } 
}