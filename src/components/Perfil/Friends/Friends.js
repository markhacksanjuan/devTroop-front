import React from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
import { Link } from 'react-router-dom'
import './Friends.css'

const Friends = (props) => {

    const renderFriends = () => {
        return props.friends.map((friend, index) => {
            return (
                <Link key={index} to={`/profile/${friend._id}`} onClick={() => props.getProfilePublicIdFromFriends(friend._id)}>
                <div className='card-friend'>

                <img src={friend.imgPath} alt={friend.imgName} />
                <p>
                  {friend.name} {friend.lastName}  
                </p>
                </div>
                </Link>
            )
        })
    }

    return (
        <div className='friends'>
                <h4>Amigos</h4>
                <p>{props.friends.length} amigos</p>
            <Scrollbars style={{ width: 300, height: 300 }}>
                <div className='friends-list'>
                    {renderFriends()}
                </div>

            </Scrollbars>

        </div>
    )
}

export default Friends