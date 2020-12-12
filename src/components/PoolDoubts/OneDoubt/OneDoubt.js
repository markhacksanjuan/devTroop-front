import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './OneDoubt.css'

const OneDoubt = (props) => {
    return(
        <div className='one-doubt'>
            <h3>{props.selectedDoubt.title}</h3>
            <p>{props.selectedDoubt.doubt}</p>
            <p>Escrita por: {props.selectedDoubt.userId.name} {props.selectedDoubt.userId.lastName}</p>
        </div>
    )

}

export default OneDoubt