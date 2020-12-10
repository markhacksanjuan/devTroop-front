import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom'
import { Scrollbars } from 'react-custom-scrollbars'
import './DoubtList.css'

const DoubtList = (props) => {

    const handleClick = (e, id) => {
        e.preventDefault()
        props.getDoubt(id)

    }

    const renderList = () => {
        return props.doubts.map((doubt, index) => {
            return (
                <button key={index} onClick={(e) => handleClick(e, doubt._id)} >
                    <li>{doubt.title}</li>
                </button>
                 
            )
        })
    }

    return(
        <div className='doubt-list'>
            <Scrollbars style={{ width: 300, heigth: 500 }}>
                <ul>
                    {renderList()}
                </ul>

            </Scrollbars>
        </div>
    )

}

export default DoubtList