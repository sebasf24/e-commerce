import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import Avatar from '@material-ui/core/Avatar';
import {Button, CssBaseline,TextField, FormControlLabel,Checkbox,Grid} from '@material-ui/core';
import { makeStyles, Typography, Container,Box } from '@material-ui/core';
import style from '../User/FormAddUser.module.css';
import {Link} from 'react-router-dom';
import {loginUser,loginGoogle} from '../../actions/user';
import Cookies from 'universal-cookie';
import axios from 'axios';
import {FcGoogle} from 'react-icons/fc'
// import useUser from './useUser';


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
  //const user= useSelector(store=>store.user);

  const classes = useStyles();
  const [login, setLogin]=useState({
    username: '',
    password:''
  })
  const dispatch=useDispatch();
  
 

const handlerOnchange=(e)=>{
  setLogin({
    ...login,
    [e.target.name]: e.target.value
  })
}
 const Session=(e)=>{
  e.preventDefault();
  const {username, password}=login
  dispatch(loginUser(username, password))
 
 }


 const popup = e => {
  e.preventDefault();

  var googleLogin = window.open(`http://localhost:3000/auth/google`, 'googleLogin', 'height=500, width=500');
  googleLogin.moveTo(100,100)
  //setTimeout(()=>{dispatch(loginGoogle())},5000);

};

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

          <br></br>
          <br></br>
          <br></br>
          <Button
            onClick={popup}
            fullWidth
            variant="contained"
            color="primary"
            className={style.boton}
          >
           <FcGoogle/>
          </Button>
          <br/><br/>        
          <Grid container>
            <Grid item xs>
              <Link to='/resetPass' variant="body2">
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