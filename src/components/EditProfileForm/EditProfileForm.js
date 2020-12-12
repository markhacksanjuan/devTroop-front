import React, { Component } from 'react'
import './EditProfileForm.css'

import UserService from '../../services/user-service'

class EditProfileForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            lastName: '',
        }
        this.userService = new UserService()
    }

    handleFormSubmit = (e) => {
        e.preventDefault()

    }

    handleChange = (e) => {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }

    render(){
        return(
            <div>
                <h2>Edit Profile Form</h2>
                <form onSubmit={this.handleFormSubmit}>
                    <label>Nombre:</label>
                    <input name='name' value={this.state.name} />
                    <label>Apellido:</label>
                    <input name='lastName' value={this.state.lastName} />

                    <button type='submit'>Modificar</button>
                </form>
            </div>
        )
    }
}

export default EditProfileForm