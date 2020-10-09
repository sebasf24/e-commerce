import React from 'react';
import ProductCard from '../ProductCard/ProductCard.jsx';
import style from './Catalogue.module.css'
import MenuCategories from '../menuCategories/MenuCategories.jsx'

export default function Cagalogue({ Products }) {
    
    return (
        <div className={style.container}>

            <MenuCategories className={style.menuCategories}/>
            <div className={style.productos}>
                { Products ? 
                Products.map(product => {
                    return (<ProductCard Product={product} />)
                })
                :
                <div></div> 
                }
            </div>
               
            
        </div>
    )
}

