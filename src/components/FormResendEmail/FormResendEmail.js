import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import AuthService from '../../auth/auth-service'

class FormResendEmail extends Component {
    constructor(props){
        super(props)
        this.state = {
            email: '',
            errorMessage: ''
        }
        this.service = new AuthService()
    }

    handleFormSubmit = (e) => {
        e.preventDefault()
        const { email } = this.state
        this.service
            .resendToken(email)
            .then(response => {
                if(response.errorMessage){
                    this.setState({errorMessage: response.errorMessage})
                    return
                }
                this.setState({email: ''})
                this.props.history.push('/verification')
            })
            .catch(err => console.log(err))

    }

    handleChange = (e) => {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }

    render = () => {
        return (
            <div>
            <h1>Resend token</h1>
            <form onSubmit={e => this.handleFormSubmit(e)} >
                <label name='email'>Email: </label>
                <input name='email' onChange={e => this.handleChange(e)} value={this.state.email} />
                    {this.state.errorMessage && <p className='errorMessage'>{this.state.errorMessage}</p>}
                <button type='submit'>Enviar</button>
            </form>

            </div>
        )
    }
}
export default withRouter(FormResendEmail)