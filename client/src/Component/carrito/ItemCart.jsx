import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom'
import {Card, Image,Button, Form} from 'react-bootstrap';
import { BiTrash} from "react-icons/bi";
import styles from "./ItemCart.module.css";
import {mostraTotal} from '../../actions/cart.js';
import { useDispatch, useSelector, useStore } from 'react-redux';

export default function Items({producto,borrar,actualizarPrecio}){
const dispatch = useDispatch();
const products = useSelector(store=>store.productsCart)

    let base64ToString;
    let prodStock = JSON.parse(localStorage.stock)[producto.id]
//quito productos del estado local y el localStorage

const [cantidad, setCantidad] = useState({}) 
useEffect(()=>{ 
    setCantidad(prodStock.cantidad)
},[])

const cambiarCantidad=(e)=>{
    setCantidad(prodStock.cantidad)
    if(e.target.value>producto.stock){
        alert("no hay estock suficiente")
        return
    }
    let cant= e.target.value
    let cantidadActualizada = cantidad - cant
console.log(cantidadActualizada)

    if(prodStock.stock && cant<=producto.stock && cantidadActualizada<0){
        
        localStorage.setItem("stock",JSON.stringify(
            Object.assign(JSON.parse(localStorage.stock),
            {[producto.id]:{ cantidad:parseInt(cant),
                            stock:parseInt(producto.stock)-cant,
                            precio:producto.price * cant
                        }
                        })))
    }

     if(cant<=producto.stock && cantidadActualizada>0){
        localStorage.setItem("stock",JSON.stringify(
            Object.assign(JSON.parse(localStorage.stock),
            {[producto.id]:{ cantidad:parseInt(cant),
                            stock:parseInt(prodStock.stock*1)+1,
                            precio:producto.price*cant
                        }
                        })))
    }

    setCantidad(e.target.value)
    actualizarPrecio()
}
const eliminarItems = ()=>{
    var obj=JSON.parse(localStorage.stock)
    var precioProd=prodStock.precio
    var precioTotal=JSON.parse(localStorage.total)
    console.log(precioTotal-precioProd);

    localStorage.setItem("total",JSON.stringify(precioTotal-precioProd))
    delete obj[producto.id]
    dispatch(mostraTotal(precioTotal-precioProd))
    localStorage.setItem("stock",JSON.stringify(obj))
    borrar(producto.id)
    
    
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
                        value={cantidad}
                        className={styles.inputCantidad} 
                        type="number"/>
                </Form>
                            
                <div className={styles.boton}>
                    <Button
                    onClick={eliminarItems}
                    className={styles.tachito}><BiTrash/></Button>
                </div>
                
            </Card>
     
    )
}