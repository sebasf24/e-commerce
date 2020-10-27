import React,{ useState} from 'react';
import {Container,Form,Button} from 'react-bootstrap';
import { useDispatch} from 'react-redux';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import { Rating } from '@material-ui/lab';
import style from './FormReview.module.css'
import Box from '@material-ui/core/Box';
import {enviarReview} from "../../actions/products.js";

const labels = {
  1: 'Malo',
  2: 'Regular',
  3: 'Normal',
  4: 'Muy bueno',
  5: 'Excelente',
};

const useStyles = makeStyles({
  root: {
    width: 200,
  },
});
const StyledRating = withStyles({
    root: {
      color: "#4280ff",
    },
    iconFilled: {
      color: '#4280ff',
    },
    iconHover:{
        color: '#4280ff'
    },
  })(Rating);  


export default function FormReview({id}){
    const dispatch=useDispatch();

    const [value, setValue] = React.useState(1);
    const [hover, setHover] = React.useState(-1);
    const classes = useStyles();
    const [description,setDescription]=useState('');
    
    const handleDescription= (e)=>{
        console.log(e.target.value)
        setDescription(e.target.value)
        }

    const handleSubmit = (event)=>{
        event.preventDefault()
        const review={
            calificacion:value,
            descripcion:description,
            userId:1
        }
     
        dispatch(enviarReview(id,review))
        setDescription(" ")
        setValue(1)
    }

    return(
        <Container className={style.Container}>
            <Form onSubmit={(e) => handleSubmit(e)}>
                <Form.Group className={style.starContainer} ><StyledRating className={classes.star}
                    value={value}
                    precision={1}
                    defaultValue={1}
                    onChange={(event, newValue) => {
                        if(newValue!== null){
                            setValue(newValue);
                        }else{
                            setValue(1);
                        }
                    }}
                    onChangeActive={(event, newHover) => {
                        setHover(newHover);
                    }}
                    size="large"
                />
                    {value !== null && <Box ml={2}>{labels[hover !== -1 ? hover : value]}</Box>}</Form.Group>
                <Form.Group className={style.groupDescription}>
                    <textarea value={description} className={style.textDescription} placeholder='Descripcion...' onChange={handleDescription}></textarea>
                </Form.Group>
                <Form.Group className={style.reviewbutton}>
                    <Button  type='submit' variant="primary" >Enviar Review</Button>
                </Form.Group>
            </Form>
        </Container>
    )
}