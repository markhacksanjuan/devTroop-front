import React, { Component } from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
import './XatFriends.css'

const XatFriends = (props) => {

    const renderFriends = () => {
        return props.friends.map((friend, index) => {
            return (
                <li key={index}><button onClick={(e) => handleClick(e, friend._id)}>{friend.name} {friend.lastName}</button></li>
            )
        })
    }

    const handleClick = (e, id) => {
        e.preventDefault()
        props.getXatById(id)
    }

    

    return (
        <div className='xat-friend'>
            <Scrollbars style={{ width: 300, height: 300 }}>
                <ul>
                    {renderFriends()}
                </ul>
            </Scrollbars>

        </div>
    )
}

export default XatFriends