import React, { useState } from 'react';
import Product from '../Product/Product';
import Style from './ProductCard.module.css'

export default function ProductCard({Product}) {

    return (
        <div classname={Style.product}>
            {console.log(Product)}
            <img className={Style.img} src={Product.img} />
            <h5>{Product.title}</h5>
            <h5>${Product.price}</h5>    
        </div>
    )

}