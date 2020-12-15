import React, { Component } from 'react'
import UserService from '../../services/user-service'
import './PerfilPublico.css'


class perfilPublico extends Component {
    constructor(props){
        super(props)
        this.state = {
            userProfile: '',
            isFriend: false,
        }
        this.userService = new UserService()
    }

    componentDidMount = () => {
        this.userService
            .getUser(this.props.publicProfileId)
            .then(response => {
                this.setState({
                    userProfile: response
                })
            })
    }
    renderProfile = () => {
        return (
            <div>
                <img src={this.state.userProfile.imgPath} />
                <h1>{this.state.userProfile.name} {this.state.userProfile.lastName}</h1>
                <p>Email: {this.state.userProfile.email}</p>
                <p>Ciudad: {this.state.userProfile.city}</p>
                <p>Curso de Ironhack: {this.state.userProfile.ironhackCourse}</p>
                <p>GitHub: {this.state.userProfile.githubUrl && <a href={this.state.userProfile.githubUrl} target='_blank'>Ver perfil</a>}</p>
                <p>Linkedin: {this.state.userProfile.linkedinUrl && <a href={this.state.userProfile.linkedinUrl} target='_blank'>Ver perfil</a>}</p>
                {
                    this.state.isFriend
                    ? this.renderButtonDeleteFriend()
                    : this.renderButtonFriendship()
                }
            </div>
        )
    }
    isFriendToggle = () => {
        const friendsArrStr = this.props.loggedInUser.friends
        
        if(friendsArrStr.includes(this.state.userProfile._id) && this.props.loggedInUser._id !== this.state.userProfile._id){
            this.setState({isFriend: false})
        }else {
            this.setState({isFriend: true})
        }
    }
    renderButtonFriendship = () => {
        
            return(
                <button onClick={(e) => this.addFriend(e)}>Añadir amistad</button>
            )

    }
    renderButtonDeleteFriend = () => {
            return(
                <button onClick={(e) => this.deleteFriend(e)}>Eliminar amistad</button>
            )
        
    }

    addFriend = (e) => {
        e.preventDefault()
        this.userService
            .addFriend(this.props.loggedInUser._id, this.state.userProfile._id)
            .then(response => {
                this.setState({addedFriend: true})
            })
    }
    deleteFriend = (e) => {
        e.preventDefault()
        this.userService
            .deleteFriend(this.props.loggedInUser._id, this.state.userProfile._id)
            .then(response => {
                this.props.updateFriends(response)
                this.setState({deletedFriend: true})
            })

    }


    render() {
        return(
            <div className='perfil-publico'>
                {this.state.userProfile && this.renderProfile()}
            </div>
        )

    }
}

export default perfilPublico