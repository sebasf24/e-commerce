
import React, { useState } from 'react'
import { editUser,listUser } from '../../actions/user';
import { Button, Form, Col, Row, Card} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import style from './FormAddUser.module.css'


export default function EditUser(userEd) {
  console.log(userEd.user)
    const [edituser, UpdateUser]=useState(userEd.user)
    const [Open, setOpen]=useState(false)
   const storeUser=useSelector(store=>store.user)
    const dispatch = useDispatch();
    const hadlerChange=(e)=>{
        UpdateUser({
            ...edituser,
            [e.target.name]: e.target.value
        })
    }

  

    return (
        // <form onSubmit={(e)=>editar(e)}>
       
        <form>
           
            <Form.Group as={Row} controlId="formPlaintextEmail">
                <Form.Label column sm="2">Name:</Form.Label>
                <Col sm="10">
                    <Form.Control className={style.Label}  name="name" onChange={hadlerChange} defaultValue={edituser.name} />
                </Col><br/>
                </Form.Group>
                <Form.Group as={Row} controlId="formPlaintextEmail"> 
                <Form.Label column sm="2">Lastname:</Form.Label>
                <Col sm={10}>
                    <Form.Control className={style.Label} name="lastname"   onChange={hadlerChange} defaultValue={edituser.lastname} />
                </Col><br/>
            </Form.Group>
            <Form.Group as={Row} controlId="formPlaintextEmail">
                <Form.Label column sm="2">DNI:</Form.Label>
                <Col sm={10}>
                    <Form.Control className={style.Label} name="dni"  onChange={hadlerChange} defaultValue={edituser.dni} />
                </Col><br/>
                </Form.Group>
                <Form.Group as={Row} controlId="formPlaintextEmail">
                <Form.Label column sm="2"> Email: </Form.Label>
                <Col sm={10}>
                    <Form.Control className={style.Label} name="email"  onChange={hadlerChange} defaultValue={edituser.email} />
                </Col><br/>
            </Form.Group>
            <Form.Group as={Row} controlId="exampleForm.SelectCustom" >
                <Form.Label>Type User:</Form.Label>
                <Col>
                <Form.Control 
               controlId="formPlaintextEmail"
                as="select" 
                name="typeUser"  
                onChange={hadlerChange} 
                defaultValue={edituser.typeUser}  
                className="my-1 mr-sm-2"custom>
                    <option >Admin</option>
                    <option >cliente</option>
         
                </Form.Control>
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                   <Col sm={{ span: 10, offset: 2 }}>

            <Button className={style.boton} type='submit'
                onClick={() => { 
                    dispatch(editUser(edituser))
                    dispatch(listUser())
                }} >Actualizar</Button>
                    </Col>
           </Form.Group>
           
            {/* <Button type='submit' onClick={()=>{setOpen(false)}}>Cerrar</Button> */}

        </form>
       
    )


}