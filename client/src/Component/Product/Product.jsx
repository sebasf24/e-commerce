import React, { useState } from 'react';

export default function Product({ id, name, description, price, stock,img }) {

    return (
        <div>
            <h1>{name}</h1>
            <p>{description}</p>
            <p>{price}</p>
            <p>{stock}</p>
            <img src={img}/>
            <button onClick={()=>alert('hola')}>Add to cart</button>
        </div>
    )

}
