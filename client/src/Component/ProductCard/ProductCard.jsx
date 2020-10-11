import React from 'react';
import styles from './ProductCard.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card,Button} from 'react-bootstrap';
import {Link} from 'react-router-dom'


export default function ProductCard({ Product }) {

    return (
            <Card className={styles.card}>
            <Card.Title className={styles.title}>
                <Link className={styles.textLink} to={`/products/${Product.id}`}>{Product.name}</Link>
            </Card.Title>
            <div className={styles.imagen }>
                <Card.Img  className={styles.img} 
                src={Product.img}/>
            </div>
                
                <Card.Subtitle 
                className={styles.precio} >
                    ${Product.price}
                </Card.Subtitle>
            
            <Link className={styles.botonlink} to={`/products/${Product.id}`}>
                <Button variant="primary" className={styles.boton}>Ver</Button>
            </Link>
            

        </Card>

    )

}
