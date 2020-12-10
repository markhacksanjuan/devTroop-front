import React, { Component } from 'react'
import './Message.css'

// --- COMPONENTS ---
import Xat from './Xat/Xat'
import XatFriends from './XatFriends/XatFriends'

const Message = () => {
    return (
        <div className='message'>
            <h1>IronXat</h1>
            <XatFriends />
            <Xat />


        </div>
    )
}

export default Message