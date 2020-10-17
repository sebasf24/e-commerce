import React from 'react';
import {Link} from 'react-router-dom'
import {Card, Image,Button, Form} from 'react-bootstrap';
import { BiTrash} from "react-icons/bi";
import styles from "./ItemCart.module.css";
import {quitarProdCarrito} from '../../actions/cart.js';
import { useDispatch, useSelector, useStore } from 'react-redux';

export default function Items({producto}){
    const products = useSelector(store=>store.productsCart)
    const dispatch=useDispatch();

    let base64ToString;
//quito productos del estado local y el localStorage
    const borrar = (id)=>{
    dispatch(quitarProdCarrito(id))
    localStorage.setItem("carritoLocal",JSON.stringify(
        JSON.parse(localStorage.getItem("carritoLocal"))
        .filter(product=> product.id !== id)))
        
    }
    (producto.img) && (base64ToString = Buffer.from(producto.img.data, "base64").toString())

    let descripcion = producto.description.substring(0, 70)
    if(descripcion.length == 70){ descripcion = descripcion+"(...)" }

    return(
        
            <Card className={styles.container}>
                <div className={styles.imagen}>
                    <img className={styles.imagen} src={base64ToString}/>
                </div>
                <div className={styles.descrip}>
                <Link to={`/products/${producto.id}`}>   
                    <Card.Title>{ producto.name}</Card.Title>
                </Link>    
                    <Card.Subtitle>{ producto.price }</Card.Subtitle>
                    <Card.Text>{descripcion}</Card.Text>
                
                </div>

                <Form className={styles.cantidad}>
                    <Form.Label>Cantidad</Form.Label>
                    <Form.Control placeholder="1" min={1} max={producto.stock} className={styles.inputCantidad} type="number"/>
                </Form>
                            
                <div className={styles.boton}>
                    <Button
                    onClick={()=>borrar(producto.id)} 
                    className={styles.tachito}><BiTrash/></Button>
                </div>
                
            </Card>
     
    )
}