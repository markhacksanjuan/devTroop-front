import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'
import AuthService from '../../auth/auth-service'

class Footer extends Component {
    constructor (props){
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
                <div className='footer'>
                        <Link to='/'>
                        <button onClick={() => this.logoutUser()}>Log Out</button>
                        </Link>
                </div>
            )
        }else {
            return(
                <div className='footer'>
                    <Link to='/signup'>Sign Up</Link>
                    <Link to='/login'>Log In</Link>

                </div>
            )
        }

    }
}

export default Footer