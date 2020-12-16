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
            toUser: '',
            xat: [],
            newMessage: '',
            allMessages: ''
        }
        this.service = new UserService()
        this.messageService = new MessageService()
    }

    componentDidMount = () => {
        this.service
        .getFriends(this.props.loggedInUser._id)
        .then(response => {
            this.messageService.getAll(this.props.loggedInUser._id)
            .then(result => {
                this.setState({
                    friends: response,
                    allMessages: result
                })
            })
        })
    }
    getXat = (id) => {
        this.messageService
            .getAll(id)
            .then(result => {
                // this.getXatById(this.state.toUser)
            })
    }
    getXatById = (id) => {
        const toUser = this.state.friends.filter(item => {
            return item._id === id
        })
        const copyAllMessages = [...this.state.allMessages]
        const messagesArr = copyAllMessages.filter(message => {
            return message.toUserId.toString() === toUser[0]._id.toString() || message.fromUserId._id.toString() === toUser[0]._id.toString()
        })
        this.setState({
            xat: messagesArr,
            toUser: toUser[0]
        })        
    }
    createNewMessage = (newMessage) => {
        this.messageService
        .sendMessage(newMessage, this.state.toUser._id, this.props.loggedInUser._id)
        .then(() => {
            this.messageService.getAll(this.props.loggedInUser._id)
            .then(response => {
                this.setState({
                    allMessages: response
                })
                this.getXatById(this.state.toUser._id)
            })
        })
        .catch(err => console.error(err))
    }
    updateXat = () => {
        setInterval(() => {
            this.messageService.getAll(this.props.loggedInUser._id)
            .then(result => {
                this.setState({
                    allMessages: result
                })
            })
        }, 1000);
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
                            toUser={this.state.toUser}
                            loggedInUser={this.props.loggedInUser}
                            createNewMessage={this.createNewMessage}
                            xat={this.state.xat}
                            getXat={this.getXat}
                            getXatById={this.getXatById}
                            allMessages={this.state.allMessages}
                        />}
                        
                    </div>
                </div>
    
    
            </div>
        )
    }
}

export default Message