import React, {useState, useEffect} from 'react';
import {listUser} from '../../actions/user'
import { useDispatch,useSelector} from 'react-redux';
import { Container, Button,Col, Table } from 'react-bootstrap';
import { FiEdit } from "react-icons/fi";
import {RiDeleteBin6Line}  from "react-icons/ri";
import { DialogTitle, DialogContentText, DialogContent, DialogActions, Dialog } from '@material-ui/core';


export default function ListUser() {
    const dispatch=useDispatch()
    const user=useSelector(store=>store.user);
    const users=user.user;
    useEffect(()=>{
         dispatch(listUser())
     },[]);
     const [state, setState] = useState(false);
     const handlerOpen = () => {
         setState(true)
     }
     const handlerClose = () => {
         setState(false)
     }

    return(
        <Container>
            <Table striped bordered hover>
                <thead>
                    <tr>
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
                        users && users.map(us=>{
                            return(
                               <tr>
                               <td>{us.name}</td>
                               <td>{us.lastname}</td>
                               <td>{us.dni}</td>
                               <td>{us.username}</td>
                               <td>{us.password}</td>
                               <td>{us.typeUser}</td>
                               <td>
                                 <div style={{width:"110px"}}>
                                 <Button><FiEdit/></Button>
                                 {'  '}
                                 <Button onClick={handlerOpen}><RiDeleteBin6Line/></Button>
                                 </div>
                               </td>
                             </tr>
                            )
                        })
                    }
                </tbody>

            </Table>  
            <Dialog
            open={state}
            onClose={handlerClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle>Eliminar Usuario</DialogTitle>
            <DialogContent>
                Esta seguro de elimar este usuario?
            </DialogContent>
            <DialogActions>
                <Button onClick={handlerClose} color="primary">
                    Rechazar
          </Button>
                <Button onClick={handlerClose} color="primary" autoFocus>
                    Aceptar
          </Button>

            </DialogActions>

        </Dialog>
        </Container>
    )


};