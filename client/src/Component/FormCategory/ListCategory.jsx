import React, {useEffect, useState} from 'react';
import {listCategory, deleteCategory} from '../../actions/category';
import { useDispatch,useSelector} from 'react-redux';
import { Container, Button,Col, Table, Row } from 'react-bootstrap';
import style from './FormCategory.module.css';
import { FiEdit } from "react-icons/fi";
import {RiDeleteBin6Line}  from "react-icons/ri";
import FormCategory from './FormCategory'
import EditCategory from './EditCategory';
import Swal from 'sweetalert2';



export default function ListCategory() {
    const dispatch=useDispatch();
    const [click, setClick]=useState({
        clicked:''
    });
    
    const categ=useSelector(store=>store.category);
    const categories=categ.category;
  
    useEffect(()=>{
         dispatch(listCategory())
     }, []);

     const editarCategory=(item)=>{
       
         setClick({
             clicked: <EditCategory data={item} />
         })
      
     }
     const nuevaCategoria=()=>{
        setClick({
            clicked: <FormCategory />
        })
       
        
     }

     const eliminarCategory=(item)=>{
         dispatch(deleteCategory(item.id))
         Swal.fire({
            position: 'top-center',
            icon: 'success',
            title: 'Categoria Eliminada',
            showConfirmButton: false,
            timer: 1500
          })
         dispatch(listCategory())
     }

     const items=categories.map(item=>{
         return(
            <tr>
            <td>{item.name}</td>
            <td>{item.description}</td>
            <td>
              <div style={{width:"110px"}}>
              <Button onClick={()=>{editarCategory(item)}}><FiEdit/></Button>
              {'  '}
              <Button onClick={()=>{eliminarCategory(item)}}><RiDeleteBin6Line/></Button>
              </div>
            </td>
          </tr>
         )
     }) 

    return(
       <div>
            <Row>
        <Col>
          <h1 style={{margin: "10px 0", textAlign: "center"}}>Categorias</h1>
          <br/>
        </Col>
      </Row>
      <Row>
        <Col sm={1}>
           <Button className={style.boton} onClick={()=>nuevaCategoria()}>AGREGAR CATEGORIA</Button>
        <br/>
        </Col>
      </Row>
       
            <Table responsive>
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
            <Container>
                {click.clicked}
            </Container>
       </div>
    
    )


};