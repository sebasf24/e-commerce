import {SumarRestarCantidad,eliminarItems} from '../carrito/localStorage'
import axios from 'axios'
import Cookies from 'universal-cookie'
import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom'
import {Card, Image,Button, Form} from 'react-bootstrap';
import { BiTrash} from "react-icons/bi";
import styles from "./ItemCart.module.css";
import { useDispatch, useSelector, useStore } from 'react-redux';
import {modificarStock,quitarProdCarrito} from '../../actions/cart'


export default function Items({idUser,currentProd,producto,borrar,actualizarPrecio}){
console.log(idUser)
    let base64ToString;
    
    const dispatch = useDispatch();
    let prodStock = JSON.parse(localStorage.stock)[producto.id]


const [cantidad, setCantidad] = useState(currentProd.cantidad) 

const cambiarCantidad=(e)=>{

    if(!idUser){
        if(e.target.value>producto.stock){
            alert("no hay stock suficiente")
            return
        }
        let cant= parseInt(e.target.value)
        SumarRestarCantidad(prodStock,cant,producto,producto.id)
        setCantidad(e.target.value)

        return
    }
    if(idUser){
        setCantidad(parseInt(e.target.value))
        let obj={
           productId: producto.id,
           cantidad:parseInt(e.target.value)
        }
        dispatch(modificarStock(idUser,obj))
    }
}

const borrarItems=()=>{
    let prodStock = JSON.parse(localStorage.stock)[producto.id]
    if(prodStock){
        eliminarItems(prodStock,producto.id,borrar)
        borrar(producto.id)
    } 
    if(idUser){
        var prodEliminar={
            productId: producto.id,
            cantidad:0
        }
        dispatch(modificarStock(idUser,prodEliminar))
        dispatch(quitarProdCarrito(currentProd.productId,currentProd.id))
    }
        
}

    (producto.img) && (base64ToString = Buffer.from(producto.img.data, "base64").toString())
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
                   
                
                </div>

                <Form className={styles.cantidad}>
                    <Form.Label>Cantidad</Form.Label>
                    <Form.Control
                        onClick={actualizarPrecio} 
                        onChange={cambiarCantidad} 
                        placeholder="1" min={1} max={producto.stock} 
                        value={currentProd ? currentProd.cantidad : cantidad}
                        className={styles.inputCantidad} 
                        type="number"/>
                </Form>
                            
                <div className={styles.boton}>
                    <Button
                    onClick={borrarItems}
                    className={styles.tachito}><BiTrash/></Button>
                </div>
                
            </Card>
     
    )
}