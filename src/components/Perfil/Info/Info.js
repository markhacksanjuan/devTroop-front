import React from 'react'
import  { Link } from 'react-router-dom'
import './Info.css'

const info = (props) => {
    return (
        <div className='profile-info'>
            <p><span>Nombre: </span>{props.loggedInUser.name}</p>
            <p><span>Apellido: </span>{props.loggedInUser.lastName}</p>
            <p><span>Email: </span>{props.loggedInUser.email}</p>
            <p><span>Ciudad: </span>{props.loggedInUser.city}</p>
            <p><span>Curso de Ironhack: </span>{props.loggedInUser.ironhackCourse}</p>
            <a href={props.loggedInUser.githubUrl} target='_blank' rel='noreferrer'>Ver mi perfil de GitHub</a>
            <a href={props.loggedInUser.linkedinUrl} target='_blank' rel='noreferrer'>Ver mi perfil de Linkedin</a>
            <Link to='/editProfile'>Modificar información</Link>
        </div>
    )
}

export default info