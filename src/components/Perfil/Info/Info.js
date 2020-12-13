import React, { Component } from 'react'
import  { Link } from 'react-router-dom'
import './Info.css'

const info = (props) => {
    return (
        <div className='profile-info'>
            <p>Nombre: {props.loggedInUser.name}</p>
            <p>Apellido: {props.loggedInUser.lastName}</p>
            <p>Email: {props.loggedInUser.email}</p>
            <Link to='/editProfile'>Modificar información</Link>
        </div>
    )
}

export default info