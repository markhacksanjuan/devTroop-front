import React, { Component } from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
import { Link } from 'react-router-dom'

const Friends = (props) => {

    const renderFriends = () => {
        return props.friends.map((friend, index) => {
            return (
                <Link key={index} to={`/profile/${friend._id}`} onClick={() => props.getProfilePublicId(friend._id)}>{friend.name} {friend.lastName}</Link>
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