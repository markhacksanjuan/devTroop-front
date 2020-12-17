import React, { Component } from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
import './Xat.css'

// --- SERVICES ---
import MessageService from '../../../services/message-service'

// --- COMPONENTS ---
import Loading from '../../Loading/Loading'

class Xat extends Component {
    constructor(props){
        super(props)
        this.state = {
            newMessage: '',
            xat: [],
            toUser: '',
        }
        this.messageService = new MessageService()
        this.scrollbars = React.createRef()
    }

    componentDidMount = () => {
        this.setState({
            toUser: this.props.toUser,
            xat: this.props.xat,
            allMessages: this.props.allMessages
        })
        this.timer = setInterval(this.updateXat, 4000)
    }

    updateXat = () => {
        if(this.props.toUser){
            this.messageService
                .getAll(this.props.loggedInUser._id)
                .then((messages) => {
                    const messagesArr = messages.filter(message => {
                        if(!message.toUserId || !message.fromUserId){
                            console.log(message.toUserId)
                            return 
                        }else {
                            return message.toUserId === this.props.toUser._id || message.fromUserId._id === this.props.toUser._id
                        }
                    })
                    this.setState({
                        xat: messagesArr
                    })
                })
        }
    }

    componentDidUpdate = () => {
        this.scrollbars.current.scrollToBottom()
    }
    componentWillUnmount = () => {
        clearInterval(this.timer)
    }

    handleFormSubmit = (event) => {
        event.preventDefault()
        const { newMessage } = this.state
        this.props.createNewMessage(newMessage)
        this.setState({
            newMessage: ''
        })
    }

    handleChange = (event) => {
        const { name, value } = event.target
        this.setState({ [name]: value })
    }


    renderXat = () => {
        const xat = [...this.state.xat]
            return xat.map((message,index) => {
                return <li key={index}><img src={message.fromUserId.imgPath} alt={message.fromUserId.imgName} /> - {message.message}</li>
        })
        
    }

    render() {
        return (
            <div className='xat'>
                <div className='messages'>
                    <Scrollbars 
                    ref={this.scrollbars}
                    style={{ width: 300, height: 250 }}>
    
                        <ul>
                    {this.props.toUser === '' ? <Loading /> : this.renderXat()}
                        </ul>
    
                    </Scrollbars>
                </div>
                <form onSubmit={this.handleFormSubmit}>
                    <input className='input-xat' name='newMessage' value={this.state.newMessage} onChange={ e => this.handleChange(e)} autoComplete='off' placeholder='Escribe tu mensaje' />
                    <button type='submit'>Enviar</button>
    
                </form>
                
    
            </div>
        )
    }
}

export default Xat