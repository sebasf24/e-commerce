import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Form,Col, Row, Button } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import ListCategory from './ListCategory';
import style from './FormCategory.module.css';

export default function homeCategory(){

    return (
        <Container>
          <Row>
            <Col>
              <h1 style={{margin: "20px 0", textAlign: "center"}}>Categorias</h1>
              <br/>
            </Col>
          </Row>
          <Row>
            <Col sm={1}>
            <Link to='/addCategory'> <Button className={style.boton}>AGREGAR CATEGORIA</Button></Link>
            <br/>
            </Col>
          </Row>
          <Row>
            <Col>
              <ListCategory/>
            </Col>
          </Row>
          
        </Container>
      )
}