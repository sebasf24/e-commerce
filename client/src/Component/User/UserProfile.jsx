import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { isLogged } from '../../actions/user';
import { Card, Container} from '@material-ui/core';
import style from './UserProfile.module.css'


export default function UserProfile() {

    const [userLog, setUserlog] = useState('')
    const usuario = useSelector(store => store.user)
   
    const dispatch = useDispatch()
    useEffect(() => {
        console.log('entro')
        dispatch(isLogged())

    }, [])

    return (
        <Container className={style.container}>
            
                <h3>My Info</h3>
                <Card className={style.card}>
                <ul>
                    <li className="list-group-item justify-content-between">
                        <strong>Name: </strong><span>{usuario.user.name}</span>

                    </li>
                    <li className="list-group-item justify-content-between">
                        <strong> Lastname: </strong> <span>{usuario.user.lastname}</span>
                    </li>
                    <li className="list-group-item justify-content-between">
                        <strong>Email: </strong> <span>{usuario.user.email}</span>
                    </li>
                    <li className="list-group-item justify-content-between">
                        <strong> Username: </strong>
                    </li>
                </ul>

            </Card>

        </Container>

    )
}
