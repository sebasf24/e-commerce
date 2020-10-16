import React, { useState, useEffect } from 'react';
import { Button, Form, Container,Table} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector, useStore } from 'react-redux';
import FormAdd from './formProductAdd';
import FormEdit from './formProducEdit';
import FormDelete from './formProductDelete';
import style from '../Catalogue/Catalogue.module.css';
import {Link} from 'react-router-dom'
import { mostrarProductos,eliminarProducto } from "../../actions/products.js";
import { FiEdit } from "react-icons/fi";
import {RiDeleteBin6Line}  from "react-icons/ri";

const FormProductAdmin = () => {

    const productS1 = useSelector(state => state.products);
    //console.log(productS1);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(mostrarProductos())
        return ()=> {

        }
    })

    const [click, setclick] = useState({
        clicked: ''
    })

    const clickAdd = () => {
        setclick({
            clicked: <FormAdd />
        })
    }

    const clickEdit = (product) => {
        setclick({
            clicked: <FormEdit product={product}/>
        })
    }

    const clickDelete = (id) => {
        dispatch(eliminarProducto(id));
        dispatch(mostrarProductos())
    }
    let items='';
    (productS1.products) && (items =productS1.products.map(product=>{
        return(
           <tr>
           <td>{product.name}</td>
           <td>{product.description}</td>
           <td>{product.price}</td>
           <td>{product.stock}</td>
           <td><img  src={Buffer.from(product.img.data, "base64").toString()} /></td>
           <td>
             <div style={{width:"110px"}}>
             <Button onClick={()=>clickEdit(product)}><FiEdit/></Button>
             {'  '}
             <Button onClick={()=>clickDelete(product.id)}><RiDeleteBin6Line/></Button>
             </div>
           </td>
         </tr>
        )
    }))
   

    return (
        <Container className='container-fluid col-6 mt-4 bg-white p-3'>
                    

                <div id="formPage">
                    {click.clicked}
                </div>
               

                <div style={{borderTop: '1px solid black'}} className={style.productos} id="producto">
                    {
                        (click.clicked=== '') ? 
                        <Container>
                            <Button className='mr-3' variant="primary" type="button" onClick={clickAdd}>Agregar</Button>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Price </th>
                                    <th>Stock </th>
                                    <th>Image </th>
                                    <th>Edit/Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items}
                            </tbody>
            
                        </Table>  
                    </Container>
                        :
                        <div></div> 
                    }
                </div>
            
    
        </Container>
    )
}

export default FormProductAdmin;

