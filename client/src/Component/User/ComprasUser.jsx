import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card,Button, Form} from 'react-bootstrap';
import { Container} from '@material-ui/core';
import style from './UserProfile.module.css'
import NavbarUser from './NavBarUser/NavbarUser'
import Tooggle from './NavBarUser/toogle'
import * as IoIcons from 'react-icons/io';



export default function ComprasUser() {
   
 
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
               <Tooggle onClick={openHandler}/>
            </div>
            <Container component="main" maxWidth="md"   background-color=" #fff">
            <Card className={style.compras} >
                <Card.Header  className={style.comprasHeader}>
                    Entregado el 12/12/12
                    <Button className={style.comprasBotones}>Devolver</Button>
                    <Button className={style.comprasBotones}>Volver a comprar</Button>
                </Card.Header>
                <Card.Body>
                <Card.Title>Prueba Compras </Card.Title>
                    <Button  className={style.comprasDetalle}>ver detalle <IoIcons.IoMdMore/></Button>

                </Card.Body>
               
            </Card>
            </Container>
            </>
 
       
    )
}
