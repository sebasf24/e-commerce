import React, { useEffect } from 'react';
import axios from 'axios'
import { Container, Card, Button, Navbar, Nav } from 'react-bootstrap';
import ItemCart from './ItemCart.jsx';
import styles from './Cart.module.css';
import { Link } from 'react-router-dom';
import { vaciarCarrito, listPorductCart, orderLine,mostraTotal } from "../../actions/cart";
import { useDispatch, useSelector, useStore } from 'react-redux';
import Cookies from 'universal-cookie'


export default function Cart({islog}) {
    const idUser = islog.id
    const cookies = new Cookies();
    const dispatch = useDispatch();

    //obtengo los productos del usuario
    const prodGuardadosCartUser = useSelector(store => store.productsCart).productos
    const cantidadUser = useSelector(store => store.productsCart).stockProduct
    //obtengo los productos de localStorage
    let prodGuardadosLStorage = JSON.parse(localStorage.getItem("carritoLocal"))
    //selecciono la lista de items del carrito
    let listaProductos = prodGuardadosCartUser.length ? prodGuardadosCartUser : prodGuardadosLStorage
    //total
    let total = useSelector(store => store.productsCart).total 

    useEffect(() => {
        actualizarPrecio()
        idUser && dispatch(listPorductCart(idUser))
        idUser && dispatch(orderLine(idUser))
    },[])

    const vaciar = () => {
        dispatch(vaciarCarrito())
        localStorage.setItem("carritoLocal", JSON.stringify([]))
        localStorage.setItem("total", JSON.stringify(0))
    }

    const borrar = (id) => {
        console.log(id)
        localStorage.setItem("carritoLocal", JSON.stringify(
            JSON.parse(localStorage.getItem("carritoLocal"))
                .filter(product => product.id !== id)))
        actualizarPrecio()
    }

    const actualizarPrecio = () => {
        var suma = 0
        let objetoStock = JSON.parse(localStorage.stock) 
        if (objetoStock) {
            for (let obj in objetoStock) {
                suma = suma + objetoStock[obj].precio
            }
            if(!cookies.get('id')){
                localStorage.setItem("total",JSON.stringify(suma))
                dispatch(mostraTotal(JSON.parse(localStorage.total)))
            }
        }
    }

    return (
        <Container className={styles.container}>

            <Container className={styles.list}>
                <Navbar className={styles.heaedr}>
                    <Navbar.Collapse className="justify-content-start">
                        <Navbar.Brand> Lista de productos </Navbar.Brand>
                    </Navbar.Collapse>
                    <Nav className="mr-auto">
                        <Button onClick={vaciar} variant="outline-danger">VACIAR CARRITO</Button>
                    </Nav>
                </Navbar>

                <Container className={styles.lista}>
                    {

                        listaProductos
                            ?
                            listaProductos.map((producto, index) => {
                                var currentProd = {}
                                var arr = cantidadUser.filter(prod => prod.productId == producto.id)
                                if (cantidadUser.length) {
                                    Object.assign(currentProd, arr[0])
                                }
                                return (
                                    <div>
                                        <ItemCart
                                            idUser={idUser ? idUser:''}
                                            currentProd={currentProd}
                                            key={index}
                                            borrar={borrar}
                                            producto={producto}
                                            actualizarPrecio={actualizarPrecio}
                                        />
                                        <hr class="clearfix w-100" />
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
                        <p>{listaProductos.length}</p>
                    </div>

                    <div className={styles.precioFinal}>
                        <Card.Subtitle>TOTAL</Card.Subtitle>

                        <Card.Subtitle>{
                                total?
                                total:
                                JSON.parse(localStorage.total)
                        }</Card.Subtitle>


                    </div>

                    <Card.Footer className={styles.boton}>
                        <Button className={styles.botonCancelar + ' ' + styles.button}>Cancelar</Button>
                        <Link to={`/order`}>
                            <Button className={styles.botonAceptar + ' ' + styles.button}>Finalizar Compra</Button>
                        </Link>
                    </Card.Footer>

                </Card>
            </Container>


        </Container>
    )

} 