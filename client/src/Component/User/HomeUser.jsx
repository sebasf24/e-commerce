import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Form, Col, Row, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import style from './FormAddUser.module.css';
import ListUser from './ListUser';
import EditUser from './EditUser'
import FormAddUser from './FormAddUser'
import  { listUser } from '../../actions/user'
import { useDispatch } from 'react-redux';


//crear en el pradre q actualize y pasar por props
export default function HomeUser() {
    const [click, setclick]=useState({
        clicked: false
    })
    const dispatch=useDispatch()
    const openCreate=()=>{
    
        setclick({
            clicked:<FormAddUser/>
        })
       
    }
    // const propsaLista=()=>{
    //     dispatch(listUser())
    // }

    useEffect(() => {
        dispatch(listUser())
    }, []);

    return (
        <div>
            <Container fluid>
               
                <Row>
                    <Col>
                        <h1 style={{ margin: "20px 0", textAlign: "center" }}>Usuarios</h1>
                        <br />
                    </Col>
                </Row>
                <Card col={1}>

                    <Row>
                        <Col sm={1}>
                            {/* <Link to='/addUser'><Button className={style.boton}>NUEVO USUARIO</Button></Link> */}
                            <Button className={style.boton} onClick={()=>{openCreate()}}>NUEVO USUARIO</Button>
                            <br />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <ListUser />
                        </Col>
                    </Row>
                </Card>
            </Container>
            <Container>
            {click.clicked}
            </Container>
 

        </div>
    )
}