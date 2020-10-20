import React, {useEffect, useState} from 'react';
import styles from './menuCategories.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav } from 'react-bootstrap';
import {Link} from 'react-router-dom'
import { useDispatch,useSelector} from 'react-redux';
import {mostrarProducto_category} from '../../actions/products.js';
import {listCategory} from '../../actions/category.js';

export default function MenuCategories() {
    const dispatch=useDispatch();
    const prod=useSelector(store=>store.products);
    const categ=useSelector(store=>store.category);
    const categories=categ.category;
    useEffect(()=>{
         dispatch(listCategory())
     },[]);
     console.log(categories);    

    return (
            <Nav  className={`flex-column ${styles.main_menu}`}>
                <Nav.Link className={styles.text + ' ' + styles.centrar }
                eventKey="disabled" 
                disabled>CATEGORIAS</Nav.Link>
                <hr class="clearfix w-100"/>
                    <Nav.Link href='/products'
                    className={styles.text}>Todos</Nav.Link>
                {   
                    categories 
                    ?
                    categories.map(cat=>{
                        return(
                          
                            <Nav.Link  href={`/products/category/${cat.id}`}
                                    className={`text-decoration-none ${styles.text}`}>
                                {cat.name}
                            </Nav.Link>
                        
                           
                        )
                    })
                    :
                    <div></div>
                }
               
            </Nav>
        

 

    )

}

