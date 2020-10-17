import React,{useEffect} from 'react';
import {Container,Card,Button,Navbar,Nav} from 'react-bootstrap';
import ItemCart from './ItemCart.jsx';
import styles from './Cart.module.css';
import {agregarProductoCarrito,vaciarCarrito} from "../../actions/cart";
import { useDispatch, useSelector, useStore } from 'react-redux';

export default function Cart(){
const dispatch = useDispatch();
// const products = useSelector(store=>store.productsCart)
// let productosCarrito = products.productos
//obtengo los productos de localStorage
if(!localStorage.carritoLocal){
    localStorage.setItem("carritoLocal",JSON.stringify([]))
}
var prodGuardados = JSON.parse(localStorage.getItem("carritoLocal"))

const vaciar=()=>{
    dispatch(vaciarCarrito())
    localStorage.setItem("carritoLocal",JSON.stringify([]))
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
                   prodGuardados.map(producto=>{
                        return(
                            <div>
                                <ItemCart producto={producto}/>
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
                     <p>{
                         prodGuardados.length 
                            ?
                            prodGuardados.reduce((acc,curr)=>{
                             return acc+=curr.price*curr.stock
                        },0)
                            : 
                            0
                        }
                    </p>
                    </div>
                    
                    <Card.Footer className={styles.boton}>
                        <Button className={styles.botonCancelar+' '+styles.button}>Cancelar</Button>
                        <Button className={styles.botonAceptar+' '+styles.button}>Finalizar Compra</Button>
                    </Card.Footer>
                    
                </Card>
            </Container>
         

        </Container>
    )

} 