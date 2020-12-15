import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import AuthService from '../../auth/auth-service'

class FormNewPwd extends Component {
    constructor(props) {
        super(props)
        this.state = {
            errorMessage: '',
            newPassword: '',
            email: '',
            token: ''
        }
        this.service = new AuthService()
    }
    componentDidMount = () => {
        const { email, token } = this.props.match.params
        this.setState({
            email,
            token
        })
    }
    handleFormSubmit = (e) => {
        e.preventDefault()
        const { email, newPassword } = this.state
        this.service
        .resetPwdNewPwd(email, newPassword)
        .then(response => {
            if(response.errorMessage){
                this.setState({errorMessage: response.errorMessage})
                return
            }
            this.setState({newPassword: ''})
            this.props.history.push('/login')
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
            <h1>Nueva contraseña</h1>
                <form onSubmit={e => this.handleFormSubmit(e)}>
                    <label name='newPassword'>Nueva contraseña: </label>
                    <input name='newPassword' onChange={e => this.handleChange(e)} value={this.state.newPassword} />
                    {this.state.errorMessage && <p className='errorMessage'>{this.state.errorMessage}</p>}
                    <button type='submit'>Modificar contraseña</button>
                </form>
            </div>
        )
    }
}
export default withRouter(FormNewPwd)