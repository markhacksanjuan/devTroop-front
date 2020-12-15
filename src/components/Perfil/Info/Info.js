import React, { Component } from 'react'
import  { Link } from 'react-router-dom'
import './Info.css'

const info = (props) => {
    return (
        <div className='profile-info'>
            <p>Nombre: {props.loggedInUser.name}</p>
            <p>Apellido: {props.loggedInUser.lastName}</p>
            <p>Email: {props.loggedInUser.email}</p>
            <p>Ciudad: {props.loggedInUser.city}</p>
            <p>Curso de Ironhack: {props.loggedInUser.ironhackCourse}</p>
            <a href={props.loggedInUser.githubUrl} target='_blank'>Ver mi perfil de GitHub</a>
            <a href={props.loggedInUser.linkedinUrl} target='_blank'>Ver mi perfil de Linkedin</a>
            <Link to='/editProfile'>Modificar información</Link>
        </div>
    )
}

export default info