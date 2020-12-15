import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import AuthService from '../../auth/auth-service'

class FormResetPwd extends Component {
    constructor (props){
        super(props)
        this.state = {
            email: '',
            errorMessage: '',
            showForm: true,
        }
        this.service = new AuthService()
    }
    handleFormSubmit = (e) => {
        e.preventDefault()
        const { email } = this.state
        this.service
            .resetPwdToken(email)
            .then(response => {
                if(response.errorMessage){
                    this.setState({errorMessage: response.errorMessage})
                    return
                }
                this.setState({email: '', showForm: false})
            })
            .catch(err => console.log(err))
    }
    handleChange = (e) => {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }

    renderForm = () => {
        return (
                <form onSubmit={e => this.handleFormSubmit(e)}>
                    <label name='email'>Email:</label>
                    <input name='email' onChange={e => this.handleChange(e)} value={this.state.email} />
                    {this.state.errorMessage && <p className='errorMessage'>{this.state.errorMessage}</p>}
                    <button type='submit'>Enviar</button>
                </form>
        )
    }
    renderFormSent = () => {
        return (
            <div>
                <p>¡Te hemos enviado un correo!</p>
                <p>Revisa tu correo para poder seguir.</p>
            </div>
        )
    }

    render = () => {
        return (
            <div>
                <h1>Obtener nueva contraseña</h1>
                {this.state.showForm
                    ? this.renderForm()
                    : this.renderFormSent()
                }

            </div>
        )
    }
}
export default withRouter(FormResetPwd)