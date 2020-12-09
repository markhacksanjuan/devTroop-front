import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './PoolDoubts.css'

// --- COMPONENTS ---
import DoubtList from './DoubtList/DoubtList'
import OneDoubt from './OneDoubt/OneDoubt'
import Answers from './Answers/Answers'

const PoolDoubts = () => {
    return(
        <div className='pool-doubts'>
            <h1>¡Hey! ¿Tienes alguna duda?</h1>
            <div className='doubts'>
                <DoubtList />
                <div className='doubt-answers'>
                    <OneDoubt />
                    <Answers />
                </div>
            </div>
        </div>
    )

}

export default PoolDoubts