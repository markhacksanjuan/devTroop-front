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
            xat: []
        }
        this.MessageService = new MessageService()
        this.scrollbars = React.createRef()
    }

    componentDidMount = () => {
        this.setState({
            toUserId: this.props.toUserId,
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
    }

    handleChange = (event) => {
        const { name, value } = event.target
        this.setState({ [name]: value })
    }
    
    handleToUserId = () => {

    }

    renderXat = () => {
        const xat = [...this.props.xat]
        return (
            xat.map((message,index) => {
                return <li key={index}>{this.props.loggedInUser.name}: {message.message}</li>
        })
        ) 
    }

    render() {
        return (
            <div className='xat'>
                <div>
                    <Scrollbars 
                    ref={this.scrollbars}
                    style={{ width: 300, height: 300 }}>
    
                        <ul>
                    {this.state.xat.length === 0 ? <Loading /> : this.renderXat()}
                        </ul>
    
                    </Scrollbars>
                </div>
                <form onSubmit={this.handleFormSubmit}>
                    <textarea name='newMessage' value={this.state.message} onChange={ e => this.handleChange(e) }></textarea>
                    <input type='submit' value='enviar' />
    
                </form>
                
    
            </div>
        )
    }
}

export default Xat