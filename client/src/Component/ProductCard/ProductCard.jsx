import React, { useState } from 'react';
import Style from './ProductCard.module.css'
import Product from '../Product/Product.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card } from 'react-bootstrap';
import {Link} from 'react-router-dom'


export default function ProductCard({ Product }) {

    /* const product=()=>{return ()} */

    return (

       <div className={Style.div} >
            <Card style={{ width: '10rem',height: '13rem' }}>
            <Card.Img Style={{
                width: '50px',
                height: '50px'
            }} src={Product.img}/>
            <Card.Body >
                <Card.Title class="row justify-content-center"><Link to={`/product/${Product.id}`}>{Product.name}</Link></Card.Title>                
                <Card.Subtitle class="row justify-content-center">${Product.price}</Card.Subtitle>

            </Card.Body>

        </Card>
       </div>

    )

}

