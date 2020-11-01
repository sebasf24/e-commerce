
// import React, { useState, useEffect } from 'react'
// import { editUser,listUser } from '../../actions/users';
// import { Button, Form, Col, Row, Card} from 'react-bootstrap';
// import { useDispatch, useSelector } from 'react-redux';
// import { Link } from 'react-router-dom'
// import style from './FormAddUser.module.css'
// import Swal from 'sweetalert2';


// export default function EditUser(userEd) {
//   console.log(userEd.user)
//     const [edituser, UpdateUser]=useState(userEd.user)
//     const [Open, setOpen]=useState(false)
// //    const storeUser=useSelector(store=>store.users)
//     const dispatch = useDispatch();
//     const hadlerChange=(e)=>{
//         UpdateUser({
//             ...edituser,
//             [e.target.name]: e.target.value
//         })
//     }
//     useEffect(() => {
//         dispatch(listUser())
//         return () => {

//         }
//     }, [])

  
//     return (
//         // <form onSubmit={(e)=>editar(e)}>
       
//         <form>
           
//             <Form.Group as={Row} controlId="formPlaintextEmail">
//                 <Form.Label column sm="2">Name:</Form.Label>
//                 <Col sm="10">
//                     <Form.Control className={style.Label}  name="name" onChange={hadlerChange} defaultValue={edituser.name} />
//                 </Col><br/>
//                 </Form.Group>
//                 <Form.Group as={Row} controlId="formPlaintextEmail"> 
//                 <Form.Label column sm="2">Lastname:</Form.Label>
//                 <Col sm={10}>
//                     <Form.Control className={style.Label} name="lastname"   onChange={hadlerChange} defaultValue={edituser.lastname} />
//                 </Col><br/>
//             </Form.Group>
//             <Form.Group as={Row} controlId="formPlaintextEmail">
//                 <Form.Label column sm="2">DNI:</Form.Label>
//                 <Col sm={10}>
//                     <Form.Control className={style.Label} name="dni"  onChange={hadlerChange} defaultValue={edituser.dni} />
//                 </Col><br/>
//                 </Form.Group>
//                 <Form.Group as={Row} controlId="formPlaintextEmail">
//                 <Form.Label column sm="2"> Email: </Form.Label>
//                 <Col sm={10}>
//                     <Form.Control className={style.Label} name="email"  onChange={hadlerChange} defaultValue={edituser.email} />
//                 </Col><br/>
//             </Form.Group>
//             <Form.Group as={Row} controlId="exampleForm.SelectCustom" >
//                 <Form.Label>Type User:</Form.Label>
//                 <Col>
//                 <Form.Control 
//                controlId="formPlaintextEmail"
//                 as="select" 
//                 name="typeUser"  
//                 onChange={hadlerChange} 
//                 defaultValue={edituser.typeUser}  
//                 className="my-1 mr-sm-2"custom>
//                     <option >Admin</option>
//                     <option >cliente</option>
         
//                 </Form.Control>
//                 </Col>
//             </Form.Group>
//             <Form.Group as={Row}>
//                    <Col sm={{ span: 10, offset: 2 }}>

//             <Button className={style.boton} type='submit'
//                 onClick={(e) => {
//                     e.preventDefault() 
//                     dispatch(editUser(edituser))
//                     Swal.fire({
//                         position: 'top-center',
//                         icon: 'success',
//                         title: 'Registro Actualizado',
//                         showConfirmButton: false,
//                         timer: 1500
//                       })
//                       UpdateUser('')
                   
//                 }} >Actualizar</Button>
//                     </Col>
//            </Form.Group>
        
//         </form>
       
//     )


// }
import React, { useState, useEffect } from 'react'
import { editUser, listUser } from '../../actions/users';
import { Button, Form, Col, Row, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import style from './FormAddUser.module.css'
import Swal from 'sweetalert2';
import { makeStyles, Container, OutlinedInput, Typography, InputAdornment, IconButton, FormControl, FormHelperText, Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(3),
            width: 350,
        },
    },
    margin: {
        margin: theme.spacing(1),
    },
    withoutLabel: {
        marginTop: theme.spacing(3),
    },
    textField: {
        width: '40ch',
        margin: theme.spacing(3),
    },
}));
export default function EditUser(userEd) {
    console.log(userEd.user)
    const classes = useStyles();
    const [edituser, UpdateUser] = useState(userEd.user)
    const [Open, setOpen] = useState(false)
    //    const storeUser=useSelector(store=>store.users)
    const dispatch = useDispatch();
    const hadlerChange = (e) => {
        UpdateUser({
            ...edituser,
            [e.target.name]: e.target.value
        })
    }
    useEffect(() => {
        dispatch(listUser())
        return () => {

        }
    }, [])


    return (
        // <form onSubmit={(e)=>editar(e)}>
        <Container className='container-fluid col-lg-8 col-sm-12 p-3 bg-white' >
            <Card className={style.Card}>
                <form className={classes.root}>
                    <br />
                    <Typography className='ml-1' component="h1" variant="h5">Editar Usuario:</Typography>
                    <Form.Group controlId="formPlaintextEmail">
                        <Form.Label column sm="2">Name:</Form.Label>
                        <Col >
                            <Form.Control name="name" onChange={hadlerChange} defaultValue={edituser.name} />
                        </Col><br />
                    </Form.Group>
                    <Form.Group controlId="formPlaintextEmail">
                        <Form.Label column sm="2">Lastname:</Form.Label>
                        <Col >
                            <Form.Control name="lastname" onChange={hadlerChange} defaultValue={edituser.lastname} />
                        </Col><br />
                    </Form.Group>
                    <Form.Group controlId="formPlaintextEmail">
                        <Form.Label column sm="2">DNI:</Form.Label>
                        <Col >
                            <Form.Control name="dni" onChange={hadlerChange} defaultValue={edituser.dni} />
                        </Col><br />
                    </Form.Group>
                    <Form.Group controlId="formPlaintextEmail">
                        <Form.Label column sm="2" > Email: </Form.Label>
                        <Col >
                            <Form.Control name="email" onChange={hadlerChange} defaultValue={edituser.email} />
                        </Col><br />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.SelectCustom" >
                        <Form.Label column sm="3">Type User:</Form.Label>
                        <Col><br />
                            <Form.Control
                                controlId="formPlaintextEmail"
                                as="select"
                                name="typeUser"
                                onChange={hadlerChange}
                                defaultValue={edituser.typeUser}
                                custom>
                                <option >Admin</option>
                                <option >cliente</option>

                            </Form.Control>
                        </Col>
                    </Form.Group>
                    <Form.Group >
                        <Col>

                            <Button type='submit'
                                onClick={(e) => {
                                    e.preventDefault()
                                    dispatch(editUser(edituser))
                                    Swal.fire({
                                        position: 'top-center',
                                        icon: 'success',
                                        title: 'Registro Actualizado',
                                        showConfirmButton: false,
                                        timer: 1500
                                    })
                                    UpdateUser('')

                                }} >Actualizar</Button>
                        </Col>
                    </Form.Group>

                </form>
            </Card>
        </Container >
    )


}