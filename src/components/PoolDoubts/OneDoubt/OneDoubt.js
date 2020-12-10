import React, { Component } from 'react'
import { Link } from 'react-router-dom'

const OneDoubt = (props) => {
    return(
        <div>
            <h3>{props.selectedDoubt[0].title}</h3>
            <p>{props.selectedDoubt[0].doubt}</p>
            <p>Escrita por alguien</p>
        </div>
    )

}

export default OneDoubt