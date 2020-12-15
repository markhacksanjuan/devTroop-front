import React, { Component } from 'react'
import UserService from '../../services/user-service'
import './PerfilPublico.css'


class perfilPublico extends Component {
    constructor(props){
        super(props)
        this.state = {
            userProfile: '',
            isFriend: true,
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
                this.isFriendToggle(this.props.loggedInUser.friends, response._id)
            })
    }
    renderProfile = () => {
        return (
            <div>
                <img src={this.state.userProfile.imgPath} />
                <h1>{this.state.userProfile.name} {this.state.userProfile.lastName}</h1>
                <p><span>Email: </span> {this.state.userProfile.email}</p>
                <p><span>Ciudad: </span> {this.state.userProfile.city}</p>
                <p><span>Curso de Ironhack: </span>{this.state.userProfile.ironhackCourse}</p>
                <p><span>GitHub: </span>{this.state.userProfile.githubUrl && <a href={this.state.userProfile.githubUrl} target='_blank'>Ver perfil</a>}</p>
                <p><span>Linkedin: </span>{this.state.userProfile.linkedinUrl && <a href={this.state.userProfile.linkedinUrl} target='_blank'>Ver perfil</a>}</p>
                {
                    this.state.isFriend
                    ? this.renderButtonDeleteFriend()
                    : this.renderButtonFriendship()
                }
            </div>
        )
    }
    isFriendToggle = (arr, profileId) => {

        const isFriend = arr.filter(friend => {
            return friend._id === profileId
        })
        if(isFriend.length > 0){
            this.setState({isFriend: true})
            return
        }else {
            this.setState({isFriend: false})
            return
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