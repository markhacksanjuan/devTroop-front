import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'
import AuthService from '../../auth/auth-service'

import devTroop from '../../img/devtroopbucle.gif'

class Navbar extends Component {
    constructor(props){
        super(props)
        this.state = {
            loggedInUser: null
        }
        this.service = new AuthService()

    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({...this.state, loggedInUser: nextProps['userInSession']})
    }

    logoutUser = () => {
        this.service.logout()
        .then(() => {
            this.setState({ loggedInUser: null })
            this.props.getUser(null)
        })
    }

    render() {

        if(this.state.loggedInUser){
            return(
                <div className='navbar'>
                    <div className='nav-home'>
                        <Link to='/'><img src={devTroop} /></Link>
                        <Link to='/profile'>Perfil</Link>
                        <Link to='/pool'>Dudas</Link>
                        <Link to='/message'>IronXat</Link>
                    </div>
                    <div>
                        <p>Hola, {this.state.loggedInUser.name}</p>
                    </div>
                    <div>
                        <Link to='/'>
                        <button onClick={() => this.logoutUser()}>Log Out</button>
                        </Link>
                    </div>
                </div>
            )

        }else {
            return(
                <div className='navbar'>
                    <div className='nav-home'>
                        <Link to='/'><img src={devTroop} /></Link>
                        <Link to='/pool'>Dudas</Link>
                    </div>
                    <div>
                    <Link to='/signup'>Sign Up</Link>
                        <Link to='/login'>Log In</Link>
                    </div>
                </div>
            )
        }

    }
}

export default Navbar