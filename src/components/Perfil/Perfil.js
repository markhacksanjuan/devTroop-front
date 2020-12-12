import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Perfil.css'

// --- SERVICES ---
import UserService from '../../services/user-service'
import MessageService from '../../services/message-service'
import DoubtService from '../../services/doubt-services'


// --- COMPONENTS ---
import Friends from './Friends/Friends'
import Doubts from './Doubts/Doubts'
import SearchFriend from './SearchFriend/SearchFriend'
import Info from './Info/Info'
import Loading from '../Loading/Loading'


class Perfil extends Component {
    constructor(props){
        super(props)
        this.state = {
            friends: [],
            doubts: [],
            searchFriends: [],
            newSearch: [],
            searchDiv: false,
        }
        this.service = new UserService()
        this.messageService = new MessageService()
        this.doubtService = new DoubtService()

    }
    componentDidMount = (props) => {
        const userId = this.props.loggedInUser._id
        this.service
        .getFriends(userId)
        .then(result => {
            this.doubtService.getDoubtsOfUser(userId)
                .then(response => {
                    this.setState({
                        friends: result,
                        doubts: response
                    })

                })
        })
        this.service
            .getAllUsers()
            .then(response => {
                this.setState({
                    searchFriends: response,
                    newSearch: response
                })
            })
    }

    search = (value) => {
        value !== '' ? this.setState({searchDiv: true}) : this.setState({searchDiv: false})
        const copyFriends = [...this.state.newSearch]
        const valueLower = value.toLowerCase()
        const newArr = copyFriends.filter(item => {
            const newName = item.name.toLowerCase()
            return newName.includes(valueLower)
        })
        this.setState({
            searchFriends: newArr
        })
        if(value === ''){
            this.setState({searchFriends: copyFriends})
        }
    }
    renderSearchFriends = () => {
            return this.state.searchFriends.map((friend, index) => {
                return (
                    <Link key={index} to={`/profile/${friend._id}`} onClick={() => this.props.getProfilePublicId(friend._id)}>{friend.name} {friend.lastName}</Link>
                )
            })
    }

    render(){

        return (
            <div className='perfil'>
                <h1>¡Hola, {this.props.loggedInUser.name}!</h1>
                <Info 
                    loggedInUser={this.props.loggedInUser}
                    />
                {this.state.doubts.length === 0 ? null : <Doubts 
                doubts={this.state.doubts} />
                }
                <SearchFriend
                search={this.search}
                searchFriends={this.searchFriends}
                searchDiv={this.state.searchDiv}
                />
                {this.state.searchDiv && this.renderSearchFriends()}
                <div>
                    {this.search}
                </div>
                {this.state.friends.length === 0 ? null : <Friends
                friends={this.state.friends}
                 />}
            </div>
        )
    }
}

export default Perfil