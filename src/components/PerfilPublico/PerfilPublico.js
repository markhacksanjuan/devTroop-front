import React, { Component } from 'react'
import UserService from '../../services/user-service'
import './PerfilPublico.css'


class perfilPublico extends Component {
    constructor(props){
        super(props)
        this.state = {
            userProfile: ''
        }
        this.userService = new UserService()
    }

    componentDidMount = () => {
        console.log(this.props)
        this.userService
            .getUser(this.props.publicProfileId)
            .then(response => {
                console.log(response)
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
                <p>email: {this.state.userProfile.email}</p>
                {this.renderButtonFriendship()}
                {this.renderButtonDeleteFriend()}
            </div>
        )
    }
    renderButtonFriendship = () => {
        const friendsArrStr = this.props.loggedInUser.friends.map(friend => {
            return friend.toString()
        })
        if(!friendsArrStr.includes(this.state.userProfile._id.toString()) && this.props.loggedInUser._id.toString() !== this.state.userProfile._id.toString()){
            return(
                <button onClick={(e) => this.addFriend(e)}>Añadir amistad</button>
            )
        }else {
            return null
        }
    }
    renderButtonDeleteFriend = () => {
        const friendsArrStr = this.props.loggedInUser.friends.map(friend => {
            return friend.toString()
        })
        if(friendsArrStr.includes(this.state.userProfile._id.toString()) && this.props.loggedInUser._id.toString() !== this.state.userProfile._id.toString()){
            return(
                <button onClick={(e) => this.deleteFriend(e)}>Eliminar amistad</button>
            )
        }else {
            return null
        }
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