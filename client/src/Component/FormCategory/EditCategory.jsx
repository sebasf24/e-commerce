import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Form, Button, Col, Card } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { editCategory, listCategory } from '../../actions/category';
import style from './FormCategory.module.css';
import { BiArrowBack } from "react-icons/bi";
import {Link} from 'react-router-dom'
import Swal from 'sweetalert2';



export default function EditCategory(category) {

    const dispatch = useDispatch();
    console.log(category.data)
  
    const [formData, updateFormData] = useState(category.data);

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        });

    };

    function limpiarFormulario() {
        document.getElementById("form").reset();
    }

    useEffect(() => {
        dispatch(listCategory())
        return () => {

        }
    }, [])
  
    return (
        <div>
            <Container>
                <br />
            <Card className={style.card}>
            <Link className={style.botonlink} to={`./admin`}>
                        <BiArrowBack onClose={true}/>
                    </Link>

                <Form id="form"  className="card-boy">
                    <Form.Label className={style.h3}><h3>Editar Categoria</h3></Form.Label>
                    <br /><br /><br />
                    <Form.Row>
                        <Form.Label className={style.input}><h5>Nombre:</h5></Form.Label>
                        <Form.Group as={Col}>
                            <Form.Control
                                name='name'
                                defaultValue= {formData.name}
                                onChange={handleChange}
                                type='text'
                                placeholder="Ingrese Nombre Categoria..."
                                required="true" />
                        </Form.Group>
                    </Form.Row>
                    <br />

                    <Form.Row>
                        <Form.Label size="sm" ><h5>Descripcion:</h5></Form.Label>
                        <Form.Group as={Col}>
                            <Form.Control
                                name='description'
                                defaultValue={formData.description}
                                onChange={handleChange} block
                                type='text'
                                placeholder="Ingrese descripcion..."
                                required="true" />
                        </Form.Group>

                    </Form.Row>
                    <br />

                    <Button className={style.button} onClick={(e) => {  
                        e.preventDefault();                     
                     dispatch(editCategory(category.data.id, formData.name, formData.description))
                           Swal.fire({
                            position: 'top-center',
                            icon: 'success',
                            title: 'Categoria Actualizada',
                            showConfirmButton: false,
                            timer: 1500
                          })
                          limpiarFormulario()
                           updateFormData('')
                    }} >Editar</Button>
                </Form>
                </Card>
            </Container>
            
        </div>

    );
}
