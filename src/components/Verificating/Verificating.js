import React, { Component } from 'react'
import './Verificating.css'
import { withRouter } from 'react-router-dom'

import UserService from '../../services/user-service'

class Verificating extends Component {
    constructor(props){
        super(props)
        this.state = {
            verificated: false,
            errorMessage: ''
        }
        this.userService = new UserService()
    }

    componentDidMount = () => {
        const { email, token } = this.props.match.params
        this.userService
            .verificateUser(email, token)
            .then(response => {
                if(!response.errorMessage){
                    this.setState({ verificated: true })
                    this.props.history.push('/login')
                }else {
                    this.setState({ errorMessage: response.errorMessage })
                }
                
            })
    }


    render = () => {
        return (
            <div>
                <p>Estamos verificando tu usuario...</p>
                {this.state.errorMessage && <p>{this.state.errorMessage}</p>}
            </div>
        )
    }
}
export default withRouter(Verificating)