import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from 'react-router-dom'
import { Card, Button, Col, Row} from 'react-bootstrap';
import {Container} from '@material-ui/core';
import style from './UserProfile.module.css'
import NavbarUser from './NavBarUser/NavbarUser'
import Tooggle from './NavBarUser/toogle'



export default function FavoriteProducts() {
   
 
    const [sidebarOpen, setSidebarOpen]=useState(false)
 
   
    const openHandler=()=>{
        if(!sidebarOpen){
            setSidebarOpen(true)
        }else{
            setSidebarOpen(false)
        }
    }
    const sidebarCloseHandler=()=>{
        setSidebarOpen(false)

    }
    let sidebar
    if(sidebarOpen){
        sidebar=<NavbarUser close={sidebarCloseHandler} sidebar={"sidebar"} />
        console.log(sidebar)
    }

    return (

        <>
            <div>
                {sidebar}
                <Tooggle onClick={openHandler} />
            </div>
            <Container component="main" maxWidth="md"   background-color=" #fff">
            <Card className={style.compras} >
                <Card.Header  className={style.comprasHeader} style={{textAlign: "center"}}>
                   Nombre del Producto
                </Card.Header>
                <Card.Body>
                <Card.Title >Img </Card.Title>
                <Row>
                <Col>
                <img className="card-img"/>
                </Col>
                <Col>
                <figcaption className="itemDesc">
                    <h3 className="itemTitle">Prueba</h3>
                    <div className="itemsSecondaryInfo">
                        <p className="price-info">$44353</p>
                    </div>
                </figcaption>
                </Col>
                <Col>
                <Link to='/products/:id'> <Button  className={style.comprasDetalle}>ver detalle</Button></Link>
                </Col>
                </Row>
                </Card.Body>
               
            </Card>
            </Container>
      
        </>


    )
}
