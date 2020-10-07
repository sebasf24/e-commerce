import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Form, Button,Col, Card } from 'react-bootstrap';


export default function FormCategory() {
    const initialFormData = Object.freeze({
        name: "",
        description: ""
      });
    const [formData, updateFormData] = useState(initialFormData);

    const handleChange = (e) => {
        updateFormData({
          ...formData,
          [e.target.name]: e.target.value.trim()
        }); 
    
      };

    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log(formData);
        
    }
    return (
        <Container fluid>
            <Card>
            <Form onSubmit={(e)=>handleSubmit(e)}>
                <Form.Label>Ingresar Nueva Categoria</Form.Label>
            <Form.Row>
            <Form.Label size="auto" >Nombre:</Form.Label>
            <Form.Group as={Col}>
                <Form.Control name='name' onChange={handleChange} size="sm" block type="text" placeholder="Ingrese Nombre Categoria..." />
            </Form.Group>
            </Form.Row>

            <Form.Row>
            <Form.Label size="sm" >Descripcion:</Form.Label>
            <Form.Group as={Col}>
                
                <Form.Control name='description' onChange={handleChange} size='sm' block type="text" placeholder="Ingrese descripcion..." />
            </Form.Group>
            </Form.Row>
           
            <Button type="submit" variant="secondary" size='lg' block>Agregar</Button>
        </Form>
        </Card>
        </Container>
    );
} 

