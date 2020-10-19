import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import Avatar from '@material-ui/core/Avatar';
import {Button, CssBaseline,TextField, FormControlLabel,Checkbox,Grid} from '@material-ui/core';
import { makeStyles, Typography, Container,Box } from '@material-ui/core';
import style from '../User/FormAddUser.module.css';
import {Link} from 'react-router-dom';
import {loginUser} from '../../actions/user';
import { useLocation } from 'react-router-dom'; //permitira al usuario mantener la sesion despues de loguearse
import { RiCreativeCommonsZeroLine } from 'react-icons/ri';
import Cookies from 'universal-cookie';
import axios from 'axios';
// import useUser from './useUser';

import md5 from 'md5';



 
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary .main,
  },
  form: {
    width: '100%', 
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Loginuser(onLogin) {

  const classes = useStyles();
  const [login, setLogin]=useState({
    username: '',
    password:''
  })
  const cookies = new Cookies();
  const userLogged=useSelector(store=>store.user)
  const userlog={userLogged}
 

const handlerOnchange=(e)=>{
  setLogin({
    ...login,
    [e.target.name]: e.target.value
  })
}
 const Session=(e)=>{
  e.preventDefault();
   console.log(login)
  
    axios.get(`http://localhost:3000/user/login?username=${login.username}&password=${login.password}`)
   .then(response=>{
     console.log(response)
     return response.data;
   })
   .then(response=>{
     console.log(response.id)
     if(response){
       var user=response;
       cookies.set('id',user.id, {path:"/"});
       cookies.set('username',user.username, {path:"/"});
       cookies.set('typeUser', user.typeUser, {path:"/"});
      alert(`${user.username} logged`) ;
       cookies.set('username',user.unsername, {path:"/"});
      alert(`Bienvenid ${user.username}`) ;
      window.location.href='./products'
     }
   })
   .catch(error=>{
    console.log(error);
})
 }



  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}/>
        <Typography component="h1" variant="h5">Login</Typography>
        <form className={classes.form} noValidate onSubmit={(e)=>Session(e)}>
          <TextField
            variant="outlined"
            margin="normal"
            required={true}
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            onChange={handlerOnchange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required={true}
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handlerOnchange}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Recordar"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={style.boton}
          >
            Sign In
          </Button>
          <br/><br/>        
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Olvidaste el password?
              </Link>
            </Grid>
            <Grid item>
              <Link to='/addUser' variant="body2">
                {"Crear cuenta de Usuario"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}