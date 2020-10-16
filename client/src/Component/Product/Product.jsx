import React,{useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector, useStore } from 'react-redux';
import {mostrarProducto_id} from "../../actions/products.js";
import {agregarProductoCarrito} from '../../actions/cart.js';

import styles from './Product.module.css';
import { BiArrowBack,BiCart} from "react-icons/bi";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Image, Col, Row, Container, Button,Form } from 'react-bootstrap';

export default function Product(props) {
    const dispatch=useDispatch();

    const id = props.match.params.id;
//store products
    const productS = useSelector(state=>state.products);

    const {selectedProduct}=productS;
    const { name, description, price, stock, img }=selectedProduct;

    let base64ToString;
    (img) && (base64ToString = Buffer.from(img.data, "base64").toString())

    useEffect(()=>{
        dispatch(mostrarProducto_id(id))
        return ()=>{}},[])

    //store carrito    
    const productoCarrito = useSelector(state=>state.productsCart);
    console.log(productoCarrito)
    const sumarAlCarrito = ()=>{
        if(!localStorage.carritoLocal){
            localStorage.setItem("carritoLocal",JSON.stringify([]))
        }
        localStorage.setItem("carritoLocal",JSON.stringify(
            
            JSON.parse(localStorage.getItem("carritoLocal"))
                .concat(selectedProduct)
            ))
        dispatch(agregarProductoCarrito(selectedProduct))
        
    }
        
    

    return (
        <Container className={styles.container}>
            <Card className={styles.card}>
                    <Link className={styles.botonlink} to={`/products/`}>
                        <BiArrowBack/>
                    </Link>
                    <div className={styles.imagen}>
                        <div className={styles.contenedorImg}>
                            <Image className={styles.img}
                            src={base64ToString} />
                        </div>
                    </div>
                    <Card.Title className={styles.titulo}>
                        {name}

                    </Card.Title>

                    <Card.Subtitle className={styles.stock}>{stock} disponibles
                        <hr class="clearfix w-100"/>
                    </Card.Subtitle>
                    <Card.Text className={styles.descrip}>
                    
                        {description}
                    
                    </Card.Text>
                    <Card.Subtitle className={styles.precio}>
                        <hr class="clearfix w-100"/>
                        {'$'+price}</Card.Subtitle>

                    <Card.Footer className={styles.botones}>
                                 
                        <Form >
                            <Form.Label>Cantidad</Form.Label>
                            <Form.Control placeholder="1" min={1} max={stock} className={styles.cantidad} type="number"/>
                            <Button onClick={sumarAlCarrito} className={styles.boton +' '+ styles.boton1} 
                               ><BiCart/> AGREGAR AL CARRITO</Button>
                            <Button className={styles.boton +' '+ styles.boton2} 
                                >COMPRAR AHORA</Button>
                        </Form>
                        
                    </Card.Footer>
                  
            </Card>
        </Container>
    )

}

