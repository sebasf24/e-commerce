import React, {useEffect, useState} from 'react';
import { useDispatch,useSelector} from 'react-redux';
import { Container, Button,Col, Table,Navbar,Nav } from 'react-bootstrap';
import { FiEdit } from "react-icons/fi";
import {RiDeleteBin6Line}  from "react-icons/ri";
import styles from './tablaOrdenes.module.css';
import listOrders from '../../actions/order'
import findbyId from '../../actions/order'
import axios from 'axios'

export default function OrdersAdmin() {
    const dispatch=useDispatch()
    const orders=useSelector(store=>store.order)
    const list_orders=orders.order
    
    const [detalle, setDetalle]=useState(false)

    useEffect(()=>{
        dispatch(listOrders())

    },[])
    const verDetalle=(id)=>{
      
    
        axios.get(`http://localhost:3000/orders/${id}`)
        .then((resp)=>{
          
          const aux=resp.data
           console.log(aux)
        })
    
    
  

    }

   
     const items= list_orders.map(item=>{
         return(
            <tr>
            <td>{item.id}</td>
            <td>{item.user}</td>
            <td>{item.estado}</td>
            <td>{item.createdAt}</td>
            <td>{item.updatedAt}</td>
            <td>
              <div style={{width:"110px"}}>
              <Button onClick={()=>{verDetalle(item.id)}}>Ver detalles</Button>
              </div>
            </td>
          </tr>
         )
     })

    return(
        <Container>
                <Navbar className={styles.heaedr}>
                    <Navbar.Collapse className="justify-content-center">
                        <Navbar.Brand> Lista de ordenes  </Navbar.Brand>
                    </Navbar.Collapse>
                </Navbar>

            <Table responsive>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Usuario ID</th>
                        <th>estado</th>
                        <th>Fecha de creacion</th>
                        <th>Fecha de Actuliazacion</th>
                        <th>Detalles</th>
                    </tr>
                </thead>
                <tbody>
                    {items}
                </tbody>

            </Table>  
        </Container>
    )


};