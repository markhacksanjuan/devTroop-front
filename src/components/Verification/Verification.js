import React from 'react'
import { Link } from 'react-router-dom'

const verification = () => {
    return (
        <div>
            <h1>VERIFICATION PAGE</h1>
            <p>Vamos a verificar tu cuenta; por favor, revisa tu correo.</p>
            <p>Si no has recibido ningún correo y quieres que te reenviemos el correo, haz click <Link to='/resendEmail' >aquí</Link></p>
        </div>
    )
}

export default verification