import React, { useState } from 'react';
import { Button, Form, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import FormAdd from './formProductAdd';
import FormEdit from './formProducEdit';
import FormDelete from './formProductDelete';

const FormProductAdmin = () => {
    const [click, setclick] = useState({
        clicked: <FormAdd />
    })

    const clickAdd = () => {
        setclick({
            clicked: <FormAdd />
        })
    }

    const clickEdit = () => {
        setclick({
            clicked: <FormEdit />
        })
    }

    const clickDelete = () => {
        setclick({
            clicked: <FormDelete />
        })
    }
   

    return (
        <Container className='container-fluid col-6 mt-4 bg-white p-3'>
            <Form>
                <Form.Group className='container-fluid col-6 mt-4 bg-white p-3' controlId="formBasic ">
                    <Button className='mr-3' variant="primary" type="button" onClick={clickAdd}>Agregar</Button>
                    <Button className='mr-3' variant='primary' type="button" onClick={clickEdit}>Editar</Button>
                    <Button variant='danger' type="button" onClick={clickDelete}>Eliminar</Button>
                </Form.Group>

                <div id="formPage">
                    {click.clicked}
                </div>
                </Form>
        </Container>
    )
}

export default FormProductAdmin;

