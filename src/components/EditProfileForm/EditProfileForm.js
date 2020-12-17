import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import './EditProfileForm.css'

import UserService from '../../services/user-service'

class EditProfileForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
                name: '',
                lastName: '',
                city: '',
                ironhackCourse: '',
                githubUrl: '',
                linkedinUrl: '',

            showAvatarForm: false,
            avatarUrl:'',
            selectedAvatar: null,
        }
        this.userService = new UserService()
    }
    componentDidMount = () => {
        this.setState({
       
                name: this.props.loggedInUser.name,
                lastName: this.props.loggedInUser.lastName,
                city: this.props.loggedInUser.city,
                ironhackCourse: this.props.loggedInUser.ironhackCourse,
                githubUrl: this.props.loggedInUser.githubUrl,
                linkedinUrl: this.props.loggedInUser.linkedinUrl
            
        })
    }

    handleFormSubmit = (e) => {
        e.preventDefault()
        const { name, lastName, city, ironhackCourse, githubUrl, linkedinUrl } = this.state
        const editedUser = { name, lastName, city, ironhackCourse, githubUrl, linkedinUrl}
        this.userService.editUser(this.props.loggedInUser._id, editedUser)
        .then((response) => {
            this.props.changeUserInfo(response)
            this.props.history.push('/profile')

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
                this.props.changeAvatar(response)
            })
    }

    handleChange = (e) => {
        const { name, value } = e.target
        this.setState({[name]: value })
    }

    render(){
        return(
            <div className='edit-profile'>
                <h2>Edit Profile Form</h2>
                <img src={this.props.loggedInUser.imgPath} alt={this.props.loggedInUser.imgName} />
                <button onClick={this.showAvatarFormToggle}>Modificar foto</button>
                <div className='edit-avatar'>
                {this.state.showAvatarForm && this.renderAvatarForm()}
                </div>

                <form className='edit-info-profile' onSubmit={this.handleFormSubmit}>
                    <label>Nombre:</label>
                    <input name='name' value={this.state.name} onChange={e => this.handleChange(e)} />
                    <label>Apellido:</label>
                    <input name='lastName' value={this.state.lastName} onChange={e => this.handleChange(e)} />
                    <label>Ciudad:</label>
                    <input name='city' value={this.state.city} onChange={e => this.handleChange(e)} />
                    <label>Curso de Ironhack:</label>
                    <input name='ironhackCourse' value={this.state.ironhackCourse} onChange={e => this.handleChange(e)} />
                    <label>Perfil de GitHub:</label>
                    <input name='githubUrl' value={this.state.githubUrl} onChange={e => this.handleChange(e)} />
                    <label>Perfil de Linkedin:</label>
                    <input name='linkedinUrl' value={this.state.linkedinUrl} onChange={e => this.handleChange(e)} />


                    <button type='submit'>Modificar</button>
                </form>
            </div>
        )
    }
}

export default withRouter(EditProfileForm)