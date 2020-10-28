import React from 'react'
import { Link } from 'react-router-dom'
import './estilos.css'


export default function Checkout(props) {
 
  return (
    <div className='checkoutsteps'>
      <div className={props.step1 ? 'active' : ''} ><Link to='/shipping'>Shipping</Link></div>
      <div className={props.step2 ? 'active' : ''} ><Link to='/payment'>Payment</Link></div>
      <div className={props.step3 ? 'active' : ''} ><Link to='/order'>Order</Link></div>
    </div>
  )

}