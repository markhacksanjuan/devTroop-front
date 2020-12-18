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
            email2: '',
            password: '',
            errorMessage:''

        }
        this.service = new AuthService()
    }

    handleFormSubmit = (event) => {
        event.preventDefault()
        const { name, lastName, email, password, email2 } = this.state
        
        this.service.signup(name, lastName, email, password, email2)
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
                    <input type='text' name='name' value={this.state.name} onChange={ e => this.handleChange(e) } autoComplete='off' placeholder='Nombre' />
                    <input type='text' name='lastName' value={this.state.lastName} onChange={ e => this.handleChange(e) } autoComplete='off' placeholder='Apellido' />
                    <input type='text' name='email' value={this.state.email} onChange={ e => this.handleChange(e) } autoComplete='off' placeholder='Correo electrónico' />
                    <input type='text' name='email2' value={this.state.email2} onChange={ e => this.handleChange(e) } autoComplete='off' placeholder='Repite el correo'  />
                    <input type='password' name='password' value={this.state.password} onChange={ e => this.handleChange(e) } placeholder='Contraseña' />

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