import React from 'react'
import { Link } from 'react-router-dom'
import './Home.css'

import devTroop from '../../img/devtroopbucle_plus.gif'

const home = () => {
    return(
        <div className='home'>
            <h1>Bienvenido a devTroop</h1>
            <img src={devTroop} />
            <p>La tropa de desarrolladores de Ironhack ha llegado para quedarse!</p>
        </div>
    )
}

export default home