import React, { Component } from 'react'
import { Link, Switch, Route } from 'react-router-dom'
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
            dudas: false,
            friendsList: true,
            info: true,
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

    showToggle = (e) => {
        console.log(e.target.id)
        this.state[e.target.id] ? this.setState({ [e.target.id]:false }) : this.setState({ [e.target.id]:true })
    }
    getProfilePublicIdFromFriends = (id) => {
        return this.props.getProfilePublicId(id)
    }

    render(){

        return (
            <div className='perfil'>
                <div className='perfil-head'>
                    <img src={this.props.loggedInUser.imgPath} />
                    <h1>¡Hola, {this.props.loggedInUser.name}!</h1>
                    
                    
                </div>
                <div className='perfil-body'>
                    
                    {this.state.info &&
                        <Info 
                        loggedInUser={this.props.loggedInUser}
                        />}
                    <div className='friends-profile'>
                        
                        {this.state.friendsList && <Friends
                        friends={this.state.friends}
                        getProfilePublicIdFromFriends={this.getProfilePublicIdFromFriends}
                        />}

                            <SearchFriend
                        search={this.search}
                        searchFriends={this.searchFriends}
                        searchDiv={this.state.searchDiv}
                        />
                        <div>

                            {this.state.searchDiv && this.renderSearchFriends()}
                        </div>

                    </div>
                    <div className='perfil-links'>
                        <Link to='#' id='dudas' onClick={(e) => this.showToggle(e)}>Ver mis dudas</Link>
                        {/* <Link id='friendsList' onClick={(e) => this.showToggle(e)}>Ver mis amigos</Link>
                        <Link id='info' onClick={(e) => this.showToggle(e)}>Ver mi información</Link> */}

                    </div>

                    {this.state.dudas && <Doubts 
                    doubts={this.state.doubts} />
                    }
                 
                        
                </div>



            </div>
        )
    }
}

export default Perfil