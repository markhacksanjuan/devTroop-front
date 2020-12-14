import React from 'react'
import { Link } from 'react-router-dom'
import './Home.css'

import devTroop from '../../img/devtroop_solidstroke.gif'

const home = () => {
    return(
        <div className='home'>
            <img src={devTroop} />
            <h1>Bienvenido a devTroop</h1>
            <h4>La tropa de desarrolladores de Ironhack ha llegado para quedarse!</h4>
            <div className='home-links'>
                <Link to='/signup'>Regístrate</Link>
                <Link to='/login'>Log In</Link>
            </div>
        </div>
    )
}

export default home