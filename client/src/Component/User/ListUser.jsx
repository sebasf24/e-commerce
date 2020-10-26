import React, { useState, useEffect } from 'react';
import  {listUser, deleteUser} from '../../actions/users'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { Container, Button, Col, Table,Row, InputGroup } from 'react-bootstrap';
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import style from './FormAddUser.module.css'
import EditUser from './EditUser'
import FormAddUser from './FormAddUser'
import Swal from 'sweetalert2';



export default function ListUser() {
    const [show, setShow] = useState(false)
    const [userSeleccionada, setuserSeleccionada] = useState('')
    const [click, setclick] = useState({
        clicked: false
    })

    const dispatch = useDispatch()

    const us = useSelector(store => store.users);
    const users = us.users;
    useEffect(() => {
        dispatch(listUser())
    }, []);


    //EDITAR USUARIO

    const editUser = (us) => {
        setclick({
            clicked: <EditUser user={us} />
        })

    }
    //ELIMINAR USUARIO
    const eliminarU = (usuario) => {
        dispatch(deleteUser(usuario.id))
        Swal.fire({
            position: 'top-center',
            icon: 'success',
            title: 'Categoria Eliminada',
            showConfirmButton: false,
            timer: 1500
          })
        dispatch(listUser())

    }

    //AGREGAR USUARIO
    const openCreate = () => {
        setclick({
            clicked: <FormAddUser />
        })

    }
 
    return (
        <div>
            <Row>
                <Col>
                    <h1 style={{ margin: "20px 0", textAlign: "center" }}>Usuarios</h1>
                    <br />
                </Col>
            </Row>


            <Row>
                <Col sm={1}>
                    {/* <Link to='/addUser'><Button className={style.boton}>NUEVO USUARIO</Button></Link> */}
                    <Button className={style.boton} onClick={() => { openCreate() }}>NUEVO USUARIO</Button>
                    <br />
                </Col>
            </Row>
            <div>
                <Table responsive>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Lastname</th>
                            <th>Dni </th>
                            <th>Username</th>
                            <th>Type_User</th>
                            <th> </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users ? users.map(us => {
                                return (
                                    <tr>
                                        <td><InputGroup.Checkbox className="mb-3" /></td>
                                        <td>{us.name}</td>
                                        <td>{us.lastname}</td>
                                        <td>{us.dni}</td>
                                        <td>{us.username}</td>
                                        <td>{us.typeUser}</td>
                                        <td>
                                            <div style={{ width: "110px" }}>
                                                <Button onClick={() => { editUser(us) }}><FiEdit /></Button>
                                                {'  '}
                                                <Button onClick={() => { eliminarU(us) }}><RiDeleteBin6Line /></Button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                            :
                            <div></div>
                        }
                    </tbody>

                </Table>
            </div>
            <br />
            <Container>
                {click.clicked}
            </Container>

        </div>
    )


};