import React, { Component } from 'react'
import { Scrollbars } from 'react-custom-scrollbars'

const Friends = (props) => {

    const renderFriends = () => {
        return props.friends.map((friend, index) => {
            return (
                <li key={index}>{friend.name} {friend.lastName}</li>
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

export default Friends