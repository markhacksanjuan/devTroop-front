import React, { Component } from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
import './XatFriends.css'

const XatFriends = (props) => {

    const renderFriends = () => {
        return props.friends.map((friend, index) => {
            return (
                <li><button>{friend.name} {friend.lastName}</button></li>
            )
        })
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