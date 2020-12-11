import React, { Component } from 'react'
import './Message.css'

// --- SERVICES ---
import UserService from '../../services/user-service'
import MessageService from '../../services/message-service'

// --- COMPONENTS ---
import Xat from './Xat/Xat'
import XatFriends from './XatFriends/XatFriends'
import Loading from '../Loading/Loading'

class Message extends Component {

    constructor(props){
        super(props)
        this.state = {
            friends: [],
            toUserId: '',
            xat: [],
            newMessage: '',
        }
        this.service = new UserService()
        this.messageService = new MessageService()
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

    getXatById = (id) => {
        const toUser = this.state.friends.filter(item => {
            return item._id === id
        })
        this.messageService
            .getAllMessages(toUser[0]._id, this.props.loggedInUser._id)
            .then(response => {
                this.setState({
                    toUserId: toUser[0]._id,
                    xat: response
                })
            })
        
    }

    createNewMessage = (newMessage) => {
        this.messageService
        .sendMessage(newMessage, this.state.toUserId, this.props.loggedInUser._id)
        .then(response => {
            this.getXatById(this.state.toUserId)
        })
        .catch(err => console.error(err))
    }



    render() {
        return (
            <div className='message-container'>
                <h1>IronXat</h1>
                <div className='message'>
                    <div>
                        {this.state.friends.length === 0 ? <Loading /> : <XatFriends 
                            friends={this.state.friends}
                            getXatById={this.getXatById}
                        />}
                    </div>
                    <div>
                            {this.state.toUserId === '' ? <Loading /> : <Xat 
                            toUserId={this.state.toUserId}
                            loggedInUser={this.props.loggedInUser}
                            createNewMessage={this.createNewMessage}
                            xat={this.state.xat}
                        />}
                        
                    </div>
                </div>
    
    
            </div>
        )
    }
}

export default Message