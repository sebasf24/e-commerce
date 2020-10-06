
import React, { useState } from 'react';
import Product from './Product';

export default function ProductCard(Product) {

    return (
        <div>
            <img src={Product.product.img} />
            <h5>{Product.product.title}</h5>
            <h5>${Product.product.price}</h5>    
        </div>
    )

}