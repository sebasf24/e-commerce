import React from 'react';
import { Button, FormGroup, Grid, Container } from '@material-ui/core';
import ListUser from './ListUser'
import {Link} from 'react-router-dom';
import style from './HomeUser.module.css'

export default function HomeUser(){
    return(
        <div>
            <FormGroup>
            <h1 style={{margin: "20px 0", textAlign: "center"}}>Users</h1>
            <Container>
            <Grid items>
            <Link to='/addUser'><Button className={style.boton}>New User</Button></Link>
            </Grid>
            <br/>
           
            <Grid>
            
                <ListUser/>
            </Grid>

            </Container>
            

            </FormGroup>
           

        </div>
    )
}