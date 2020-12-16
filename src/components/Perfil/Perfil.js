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
import Answers from '../PoolDoubts/Answers/Answers'
import OneDoubt from '../PoolDoubts/OneDoubt/OneDoubt'


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
            selectedDoubt: '',
            doubtAnswers: ''
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
                    <Link key={index} to={`/profile/${friend._id}`} onClick={() => this.props.getProfilePublicId(friend._id)}><img src={friend.imgPath} alt={friend.imgName} /> {friend.name} {friend.lastName}</Link>
                )
            })
    }
    showToggle = (e) => {
        this.state[e.target.id] ? this.setState({ [e.target.id]:false }) : this.setState({ [e.target.id]:true })
    }
    getProfilePublicIdFromFriends = (id) => {
        return this.props.getProfilePublicId(id)
    }
    getDoubt = (id) => {
        const selectedDoubt = this.state.doubts.filter(doubt => {
            return doubt._id === id
        })
        this.doubtService
            .getAllAnswersOfDoubt(selectedDoubt[0]._id)
            .then(answers => {
                this.setState({
                    selectedDoubt,
                    doubtAnswers: answers
                })
            })
    }


    render(){

        return (
            <div className='perfil'>
                <div className='perfil-head'>
                    <img src={this.props.loggedInUser.imgPath} alt={this.props.loggedInUser.imgName} />
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

                        <div className='search-friends'>
                            {this.state.searchDiv && this.renderSearchFriends()}
                        </div>

                    </div>

                    <div className='perfil-links'>
                        <Link to='#' id='dudas' onClick={(e) => this.showToggle(e)}>Ver mis dudas</Link>

                    {this.state.dudas && <Doubts
                    getDoubt={this.getDoubt} 
                    doubts={this.state.doubts} />
                    }
                    </div>
                    <div>
                    {(this.state.selectedDoubt && this.state.dudas) && <OneDoubt 
                        selectedDoubt={this.state.selectedDoubt[0]}
                        loggedInUser={this.props.loggedInUser}
                    />}
                    {(this.state.doubtAnswers && this.state.dudas) && <Answers 
                        loggedInUser={this.props.loggedInUser}
                        doubtAnswers={this.state.doubtAnswers}
                        getDoubt={this.getDoubt}
                        selectedDoubt={this.state.selectedDoubt[0]}
                    />}
                    </div>
                 
                        
                </div>



            </div>
        )
    }
}

export default Perfil