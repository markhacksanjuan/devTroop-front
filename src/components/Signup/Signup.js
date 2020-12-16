import React, { Component } from 'react'
import AuthService from '../../auth/auth-service'
import { Link, withRouter } from 'react-router-dom'
import '../Login/Login.css'

class Signup extends Component {
    constructor(props){
        super(props)
        this.state = {
            name: '',
            lastName: '',
            email: '',
            password: '',
            errorMessage:''

        }
        this.service = new AuthService()
    }

    handleFormSubmit = (event) => {
        event.preventDefault()
        const { name, lastName, email, password } = this.state
        
        this.service.signup(name, lastName, email, password)
        .then( response => {
            if(response){
                if(!response.errorMessage){
                    this.setState({
                        name: '',
                        lastName: '',
                        email: '',
                        password: ''
                    })
                    this.props.history.push('/verification')
                }else {
                    this.setState({ errorMessage: response.errorMessage })
                }
            }
        })
        .catch( err => console.log(err) )
    }

    handleChange = (event) => {
        const { name, value } = event.target
        this.setState({ [name]: value })
    }


    render(){
        return(
            <div className='login'>
                <h1>Regístrate</h1>
                <form onSubmit={this.handleFormSubmit}>
                    <label>Nombre:</label>
                    <input type='text' name='name' value={this.state.name} onChange={ e => this.handleChange(e) } />
                    <label>Apellido:</label>
                    <input type='text' name='lastName' value={this.state.lastName} onChange={ e => this.handleChange(e) } />
                    <label>Email:</label>
                    <input type='text' name='email' value={this.state.email} onChange={ e => this.handleChange(e) } />
                    <label>Contraseña:</label>
                    <input type='password' name='password' value={this.state.password} onChange={ e => this.handleChange(e) } />

                { this.state.errorMessage && <p className='errorMessage'>{this.state.errorMessage}</p> }

                    <button type='submit'>Regístrate</button>
                </form>
                <p>
                    ¿Tienes una cuenta en devTroop? <Link to={'/login'}>Login</Link>
                </p>
            </div>
        )
    }
}

export default withRouter(Signup)