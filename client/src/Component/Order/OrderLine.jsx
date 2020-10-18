import React from 'react';
import {Link} from 'react-router-dom'
import {Card, Image,Button, Form} from 'react-bootstrap';
import styles from "./OrderLine.module.css";
import { useDispatch, useSelector, useStore } from 'react-redux';

export default function OrderLine ({producto}){
    const products = useSelector(store=>store.productsCart)
    const dispatch=useDispatch();


    return(
        
            <Card className={styles.container}>
                <div className={styles.descrip}>
                    <Card.Title>{ producto.name}</Card.Title>
                    <Card.Subtitle>{ producto.price }</Card.Subtitle>
                    <Card.Text>{producto.description}</Card.Text>
                    <div className={styles.cantidad}>Cantidad 1</div>
                </div>
               
            </Card>
     
    )
}