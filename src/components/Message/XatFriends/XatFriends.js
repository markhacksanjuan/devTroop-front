import React, { Component } from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
import './XatFriends.css'

const XatFriends = (props) => {

    const renderFriends = () => {
        return props.friends.map((friend, index) => {
            return (
                <button onClick={(e) => handleClick(e, friend._id)}><li key={index}>{friend.name} {friend.lastName}</li></button>
            )
        })
    }

    const handleClick = (e, id) => {
        e.preventDefault()
        props.getXatById(id)
    }

    

    return (
        <div>
            <Scrollbars style={{ width: 300, height: 300 }}>
                <ul>
                    {renderFriends()}
                </ul>
            </Scrollbars>

        </div>
    )
}

export default XatFriends