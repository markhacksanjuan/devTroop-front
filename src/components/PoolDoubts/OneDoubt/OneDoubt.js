import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './OneDoubt.css'

const OneDoubt = (props) => {



    return(
        <div className='one-doubt'>
            <h3>{props.selectedDoubt.title}</h3>
            <p>{props.selectedDoubt.doubt}</p>
            <p>Escrita por: {props.selectedDoubt.userId.name} {props.selectedDoubt.userId.lastName}</p>
            { props.selectedDoubt.userId.email !== props.loggedInUser.email ? null :
                <Link to='/editDoubt'>Editar duda</Link>
            }
        </div>
    )

}

export default OneDoubt