import React, { useState } from 'react';
import { Button, Form, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import FormAdd from './formProductAdd';
import FormEdit from './formProducEdit';
import FormDelete from './formProductDelete';
import axios from 'axios';

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
        <Container>
            <br/>

                <Form.Group controlId="formBasic">
                    <Button className='mr-3' variant="primary" type="button" onClick={clickAdd}>Add</Button>
                    <Button className='mr-3' variant='primary' type="button" onClick={clickEdit}>Edit</Button>
                    <Button variant='danger' type="button" onClick={clickDelete}>Delele</Button>
                </Form.Group><br />

                <div id="formPage">
                    {click.clicked}
                </div>


        </Container>
    )
}

export default FormProductAdmin;

