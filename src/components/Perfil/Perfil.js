import React, { Component } from 'react'

// --- COMPONENTS ---
import Friends from './Friends/Friends'
import Doubts from './Doubts/Doubts'

const Perfil = () => {
    return (
        <div>
            <h1>PERFIL</h1>
            <Doubts />
            <Friends />
        </div>
    )
}

export default Perfil