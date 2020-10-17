import React, {useState} from 'react';
import {useDispatch} from 'react-redux'
import Avatar from '@material-ui/core/Avatar';
import {Button, CssBaseline,TextField, FormControlLabel,Checkbox,Grid} from '@material-ui/core';
import { makeStyles, Typography, Container,Box } from '@material-ui/core';
import style from '../User/FormAddUser.module.css';
import {Link} from 'react-router-dom';
// import {loginUser} from '../../actions/user';
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

//Logueo de usuario
export default function Loginuser(onLogin) {

  const classes = useStyles();
  const [login, setLogin]=useState({
    username: '',
    password:''
  })

const handlerOnchange=(e)=>{
  setLogin({
    ...login,
    [e.target.name]: e.target.value
  })
}

const dispatch=useDispatch();

  const handlerSubmit=(e)=>{
      e.preventDefault();

      // const user=dispatch(loginUser(login.username, md5(login.password)))
      // console.log(user)

  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}/>
        <Typography component="h1" variant="h5">Login</Typography>
        <form className={classes.form} noValidate onSubmit={(e)=>{handlerSubmit(e)}}>
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
            className={style.boton}>
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