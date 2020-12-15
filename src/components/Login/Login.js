import React, { Component } from 'react'
import AuthService from '../../auth/auth-service'
import { Link, withRouter } from 'react-router-dom'
import './Login.css'

class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            email: '',
            password: '',
            message: ''
        }
        this.service = new AuthService()
    }

    handleFormSubmit = (event) => {
        event.preventDefault()
        const { email, password } = this.state
        
        this.service.login(email, password)
        .then( response => {
            if(response){
                console.log(response)
                if(!response.message){
                    this.setState({
                        email: '',
                        password: ''
                    })
                    this.props.getUser(response)
                    this.props.history.push('/profile')
                }else {
                    this.setState({ message: response.message })
                }
            }
        })
        .catch( err => console.error(err) )
    }

    handleChange = (event) => {
        const { name, value } = event.target
        this.setState({ [name]: value })
    }


    render(){
        return(
            <div className='login'>
                <h1>Login</h1>
                <form onSubmit={this.handleFormSubmit}>
                    <label>Email:</label>
                    <input type='text' name='email' value={this.state.email} onChange={ e => this.handleChange(e) } />
                    <label>Contraseña:</label>
                    <input type='password' name='password' value={this.state.password} onChange={ e => this.handleChange(e) } />

                    { this.state.message && <p className='errorMessage'>{this.state.message}</p> }

                    <button type='submit'>Login</button>
                </form>
                <p>
                    ¿Aún no formas parte de devTroop? <Link to={'/signup'}>¡Regístrate!</Link>
                </p>
            </div>
        )
    }
}

export default withRouter(Login)