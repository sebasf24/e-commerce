import React  from 'react';
import Avatar from '@material-ui/core/Avatar';
import {Button, CssBaseline, FormControlLabel,Checkbox} from '@material-ui/core';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import { makeStyles, Typography, Container } from '@material-ui/core';
import Checkout from './Checkout'
import Swal from 'sweetalert2';
import './estilos.css'



const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', 
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const alerta=()=>{
  let timerInterval
Swal.fire({
  title: 'Procesando Orden',
  timer: 2000,
  timerProgressBar: true,
  willOpen: () => {
    Swal.showLoading()
    timerInterval = setInterval(() => {
      const content = Swal.getContent()
      if (content) {
        const b = content.querySelector('b')
        if (b) {
          b.textContent = Swal.getTimerLeft()
        }
      }
    }, 100)
  },
  onClose: () => {
    clearInterval(timerInterval)
  }
}).then((result) => {
  /* Read more about handling dismissals below */
  if (result.dismiss === Swal.DismissReason.timer) {
    console.log('I was closed by the timer')
  }
})
}

export default function Payment(props) {
    const classes=useStyles()
    const submitHandler=()=>{
        alerta()
        props.history.push('/order')
    }

  return (
    <div>
    <Checkout step1 step2></Checkout>
    <Container component="main" maxWidth="xs"> 
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className="avatar"><CreditCardIcon/></Avatar>
        <Typography component="h1" variant="h5">Payment</Typography>
        <br/>
        <form className={classes.form} noValidate onSubmit={()=>{submitHandler()}}>
       <FormControlLabel
       label="Mercado Pago"
       control={
        <Checkbox
        color="primary"
        inputProps={{ 'aria-label': 'secondary checkbox' }}
      />
       }
       />
       
      
            <Button
            className="boton"
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Continue
          </Button>
        </form>
      </div>
      
    </Container>

    </div>
    
  );
}