import React, { Component } from 'react'
import './Message.css'

// --- SERVICES ---
import UserService from '../../services/user-service'

// --- COMPONENTS ---
import Xat from './Xat/Xat'
import XatFriends from './XatFriends/XatFriends'
import Loading from '../Loading/Loading'

class Message extends Component {

    constructor(props){
        super(props)
        this.state = {
            friends: []
        }
        this.service = new UserService()
    }

    componentDidMount = (props) => {
        this.service
        .getFriends(this.props.loggedInUser._id)
        .then(response => {
            this.setState({
                friends: response
            })
        })
    }


    render() {
        return (
            <div className='message'>
                <h1>IronXat</h1>
                {this.state.friends.length === 0 ? <Loading /> : <XatFriends 
                    friends={this.state.friends}
                />}
                <Xat />
    
    
            </div>
        )
    }
}

export default Message