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
                        <Link to='/profile'>
                        <img id="img-user" src={this.props.userInSession.imgPath} alt={this.props.userInSession.imgName} />
                        </Link>
                        <Link to='/pool'>Dudas</Link>
                        <Link to='/message'>IronXat</Link>

                </div>
            )

        }else {
            return(
                <div className='navbar'>
                        <Link to='/'><img id='img-devtroop' src={devTroop} alt='devTroop-logo' /></Link>
                        <Link to='/pool'>Dudas</Link>
                </div>
            )
        }

    }
}

export default Navbar