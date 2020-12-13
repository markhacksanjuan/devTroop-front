import React, { Component } from 'react'
import './EditProfileForm.css'

import UserService from '../../services/user-service'

class EditProfileForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            lastName: '',
            showAvatarForm: false,
            avatarUrl:'',
            selectedAvatar: null,
        }
        this.userService = new UserService()
    }
    componentDidMount = () => {
        this.setState({
            name: this.props.loggedInUser.name,
            lastName: this.props.loggedInUser.lastName
        })
    }

    handleFormSubmit = (e) => {
        e.preventDefault()
        const { name, lastName } = this.state
        this.userService.editUser(this.props.loggedInUser._id, name, lastName)
        .then((response) => {
            this.props.changeUserInfo(response)
        })
        .catch(err => {
            console.error(err)
        })

    }

    showAvatarFormToggle = () => {
        this.state.showAvatarForm
        ? this.setState({ showAvatarForm: false })
        : this.setState({ showAvatarForm: true })
    }


    renderAvatarForm = () => {
        return (
            <form onSubmit={this.submitAvatar}>
                <input
                type='file'
                name='avatar'
                onChange={(e) => this.handleChangeAvatar(e)} />
                <button type='submit'>Modificar Avatar</button>
            </form>
        )
    }
    handleChangeAvatar = (e) => {
        this.setState({
            selectedAvatar: e.target.files[0]
        })
    }
    submitAvatar = (e) => {
        e.preventDefault()
        const data = new FormData()
        data.append('avatar', this.state.selectedAvatar)
        this.userService.editAvatar(data, this.props.loggedInUser._id)
            .then(response => {
                console.log(response)
                this.props.changeAvatar(response)
            })
    }

    handleChange = (e) => {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }

    render(){
        return(
            <div className='edit-profile'>
                <h2>Edit Profile Form</h2>
                <img src={this.props.loggedInUser.imgPath} />
                <button onClick={this.showAvatarFormToggle}>Modificar foto</button>
                {this.state.showAvatarForm && this.renderAvatarForm()}
                <form onSubmit={this.handleFormSubmit}>
                    <label>Nombre:</label>
                    <input name='name' value={this.state.name} onChange={e => this.handleChange(e)} />
                    <label>Apellido:</label>
                    <input name='lastName' value={this.state.lastName} onChange={e => this.handleChange(e)} />

                    <button type='submit'>Modificar</button>
                </form>
            </div>
        )
    }
}

export default EditProfileForm