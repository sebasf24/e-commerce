import React, { useState, useEffect } from 'react';
import { listUser, deleteUser } from '../../actions/user'
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { Container, Button, Col, Table, InputGroup, Modal, ModalFooter, ModalBody, Alert } from 'react-bootstrap';
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import style from './FormAddUser.module.css'
import EditUser from './EditUser'


export default function ListUser() {
    const [show,setShow] =useState(false)
    const [userSeleccionada, setuserSeleccionada]=useState('')
    const [click, setclick]=useState({
        clicked: false
    })
   
    const dispatch = useDispatch()
    const us = useSelector(store => store.user);
    const users = us.user;
    

    const editUser=(us)=>{
        setclick({
            
            clicked:<EditUser user={us}/>
        })

    }
    const eliminarU=(usuario)=>{
        dispatch(deleteUser(usuario.id))
        alert('usuario eliminado')
        dispatch(listUser())
    
    }  
  
    useEffect(() => {
         dispatch(listUser())
    }, []);

    return (
        <div>
            <Table responsive>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Lastname</th>
                        <th>Dni </th>
                        <th>Username</th>
                        <th>Password</th>
                        <th>Type_User</th>
                        <th> </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users && users.map(us => {
                            return (
                                <tr>
                                    <td><InputGroup.Checkbox className="mb-3" /></td>
                                    <td>{us.name}</td>
                                    <td>{us.lastname}</td>
                                    <td>{us.dni}</td>
                                    <td>{us.username}</td>
                                    <td>{us.password}</td>
                                    <td>{us.typeUser}</td>
                                    <td>
                                        <div style={{ width: "110px" }}>
                                          <Button onClick={()=>{editUser(us)}}><FiEdit /></Button>
                                            {'  '}
                                            <Button onClick={()=>{eliminarU(us)}}><RiDeleteBin6Line /></Button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        }) 
                    }
                </tbody>

            </Table>
            <Container>
                {click.clicked}
            </Container> 
        </div>
    )


};