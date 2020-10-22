import React from 'react';
import {Button, CssBaseline,TextField,Grid} from '@material-ui/core';
import { Typography, Container } from '@material-ui/core';
import style from '../User/FormAddUser.module.css';


export default function resetPassword() {
  
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div >
        <Typography component="h3" variant="h5">Reset Password</Typography>
        <form  noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required={true}
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoFocus
          /><br/><br/>
          
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={style.boton}
                     >
           Reset
          </Button>         
        </form>
      </div>
    
    </Container>
  );
}