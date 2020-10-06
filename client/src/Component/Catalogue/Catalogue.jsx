import React from 'react';
import ProductCard from '../ProductCard/ProductCard.jsx';
import style from './Catalogue.module.css'

export default function Cagalogue({ Products }) {
    return (
        <div className={style.grid}>
            
                {Products.map(product => {
                    return <div className={style.productCard}><ProductCard Product={product} /></div>
                })
                }
            
        </div>
    )
}