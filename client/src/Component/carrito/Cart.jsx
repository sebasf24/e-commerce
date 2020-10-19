import React,{useEffect} from 'react';
import {Container,Card,Button,Navbar,Nav} from 'react-bootstrap';
import ItemCart from './ItemCart.jsx';
import styles from './Cart.module.css';
import {Link} from 'react-router-dom';
import {agregarProductoCarrito,vaciarCarrito,quitarProdCarrito,modificarStock,mostraTotal} from "../../actions/cart";
import { useDispatch, useSelector, useStore } from 'react-redux';

export default function Cart(){
const dispatch = useDispatch();
const products = useSelector(store=>store.productsCart)

//obtengo los productos de localStorage

var prodGuardados = JSON.parse(localStorage.getItem("carritoLocal"))
let prodStock = JSON.parse(localStorage.stock)

useEffect(()=>{ 
    actualizarPrecio()
},[])

const vaciar=()=>{
    dispatch(vaciarCarrito())
    localStorage.setItem("carritoLocal",JSON.stringify([]))
}

const borrar = (id)=>{
    dispatch(quitarProdCarrito(id))
    localStorage.setItem("carritoLocal",JSON.stringify(
        JSON.parse(localStorage.getItem("carritoLocal"))
        .filter(product=> product.id !== id)))
     actualizarPrecio()   
}   


const modStock=(id,stock)=>{
    //modificar stock localStorage
    dispatch(modificarStock(id,stock))
}

const actualizarPrecio=()=>{
   let objetoStock=JSON.parse(localStorage.stock)
    var suma=0
    var obj;
    for(obj in objetoStock){
   suma = suma + objetoStock[obj].precio
}
    localStorage.setItem("total",JSON.stringify(suma))
    dispatch(mostraTotal(suma))

}

    return(
        <Container className={styles.container}>
            
            <Container className={styles.list}>
                <Navbar className={styles.heaedr}>
                    <Navbar.Collapse className="justify-content-start">
                        <Navbar.Brand> Lista de productos </Navbar.Brand>
                    </Navbar.Collapse>
                    <Nav className="mr-auto">
                    <Button  onClick={vaciar} variant="outline-danger">VACIAR CARRITO</Button>
                    </Nav>
                </Navbar>
                <Container className={styles.lista}>
                {
                   
                   prodGuardados
                   ?
                   prodGuardados.map((producto,index)=>{
                        return(
                            <div>
                                <ItemCart 
                                key={index}
                                borrar={borrar} 
                                producto={producto}
                                modStock={modStock}
                                actualizarPrecio={actualizarPrecio}
                                />
                                <hr class="clearfix w-100"/>
                            </div>
                        )
                    })
                    :
                    <div></div>
                }
                </Container>
           
            </Container>

            <Container className={styles.totales}>

                <Navbar className={styles.heaedr}>
                        <Navbar.Collapse className="justify-content-start">
                            <Navbar.Brand> Resumen </Navbar.Brand>
                        </Navbar.Collapse>
                </Navbar>

                <Card className={styles.total}>
                    <div className={styles.items}> 
                        <Card.Subtitle>Items</Card.Subtitle>
                        <p>{prodGuardados.length}</p>
                    </div>

                    <div className={styles.precioFinal}>
                        <Card.Subtitle>TOTAL</Card.Subtitle>
                       
                        <Card.Subtitle>{
                            prodGuardados
                            ?
                            products.total
                            :
                            0
                        }</Card.Subtitle> 
                        
                    
                    </div>
                    
                    <Card.Footer className={styles.boton}>
                        <Button className={styles.botonCancelar+' '+styles.button}>Cancelar</Button>
                        <Link to={`/order`}>
                        <Button className={styles.botonAceptar+' '+styles.button}>Finalizar Compra</Button>
                        </Link>
                    </Card.Footer>
                    
                </Card>
            </Container>
         

        </Container>
    )

} 