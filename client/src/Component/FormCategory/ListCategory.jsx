import React, {useEffect, useState} from 'react';
import {listCategory} from '../../actions/category';
import { useDispatch,useSelector} from 'react-redux';
import { Container, Button,Col, Table } from 'react-bootstrap';
import style from './FormCategory.module.css';
import { FiEdit } from "react-icons/fi";
import {RiDeleteBin6Line}  from "react-icons/ri";


export default function ListCategory() {
    const dispatch=useDispatch()
    const categ=useSelector(store=>store.category);
    const categories=categ.category;
    useEffect(()=>{
         dispatch(listCategory())
     },[]);

     const items= categories.map(item=>{
         return(
            <tr>
            <td>{item.name}</td>
            <td>{item.description}</td>
            <td>
              <div style={{width:"110px"}}>
              <Button><FiEdit/></Button>
              {'  '}
              <Button><RiDeleteBin6Line/></Button>
              </div>
            </td>
          </tr>
         )
     })

    return(
        <Container>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th> </th>
                    </tr>
                </thead>
                <tbody>
                    {items}
                </tbody>

            </Table>  
        </Container>
    )


};