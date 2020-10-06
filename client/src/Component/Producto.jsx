import React, { useState } from 'react';

export default function Producto({ id, titulo, descripcion, precio, stock,img }) {

    return (
        <div>
            <h1>{titulo}</h1>
            <p>{descripcion}</p>
            <p>{precio}</p>
            <p>{stock}</p>
            <img src={img}/>
            <button onClick={()=>alert('hola')}>Add to cart</button>
        </div>
    )

}
