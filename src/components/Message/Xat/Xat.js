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
        this.MessageService = new MessageService()
        this.scrollbars = React.createRef()
    }

    componentDidMount = () => {
        this.setState({
            toUser: this.props.toUser,
            xat: this.props.xat,
        })
    }

    componentDidUpdate = () => {
        this.scrollbars.current.scrollToBottom()
    }

    handleFormSubmit = (event) => {
        event.preventDefault()
        const { newMessage } = this.state
        console.log(newMessage)
        this.props.createNewMessage(newMessage)
        this.setState({
            newMessage: ''
        })
    }

    handleChange = (event) => {
        const { name, value } = event.target
        this.setState({ [name]: value })
    }
    
    handleToUserId = () => {

    }

    renderXat = () => {
        const xat = [...this.props.xat]
            return xat.map((message,index) => {
                return <li key={index}><img src={message.fromUserId.imgPath} /> - {message.message}</li>
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
                    <textarea name='newMessage' value={this.state.newMessage} onChange={ e => this.handleChange(e) }></textarea>
                    <button type='submit'>Enviar</button>
    
                </form>
                
    
            </div>
        )
    }
}

export default Xat