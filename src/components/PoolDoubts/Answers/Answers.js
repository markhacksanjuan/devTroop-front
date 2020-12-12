import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Scrollbars } from 'react-custom-scrollbars'
import './Answers.css'

const Answers = (props) => {

    const renderAnswers = () => {
        return props.doubtAnswers.map((answer, index) => {
            return(
                <li>{answer.answer}</li>
            )
        })
    }

    return(
        <div class="answers">
            <h3>Respuestas</h3>
            <Scrollbars style={{ width: 300, heigth: 50 }}>
                <ul>
                    {renderAnswers()}
                </ul>

            </Scrollbars>
        </div>
    )

}

export default Answers