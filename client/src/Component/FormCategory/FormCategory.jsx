import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Form, Button,Col } from 'react-bootstrap';


export default function FormCategory() {
    return (
        <Container fluid>
            <Form>
                <Form.Label>Ingresar Nueva Categoria</Form.Label>
            <Form.Row>
            <Form.Label size="auto" >Nombre:</Form.Label>
            <Form.Group as={Col}>
                <Form.Control size="sm" block type="text" placeholder="Ingrese Nombre Categoria..." />
            </Form.Group>
            </Form.Row>

            <Form.Row>
            <Form.Label size="sm" >Descripcion:</Form.Label>
            <Form.Group as={Col}>
                
                <Form.Control size='sm' block type="text" placeholder="Ingrese descripcion..." />
            </Form.Group>
            </Form.Row>
           
            <Button type="submit" variant="secondary" size='lg' block>Agregar</Button>
        </Form>
        </Container>
    );
} 

