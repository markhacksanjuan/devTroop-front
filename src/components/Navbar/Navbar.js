import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

const navbar = () => {
    return(
        <div className='navbar'>
            <div>
                <Link to='/'>HOME</Link>
                <Link to='/pool'>Dudas</Link>
            </div>
            <div>
                <Link to='/signup'>Sign Up</Link>
                <Link to='/login'>Log In</Link>
            </div>
        </div>
    )
}

export default navbar