import React, { Component } from 'react'
import './SearchDoubt.css'

const searchDoubt = (props) => {

    const onInputChange = (e) => {
        props.search(e.target.value)
    }
    return(
        <div>
            <label>Buscar duda:</label>
            <input
            type='search'
            onChange={(e) => onInputChange(e)}
            />
        </div>
    )
}

export default searchDoubt