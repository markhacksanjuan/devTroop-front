import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Scrollbars } from 'react-custom-scrollbars'
import './Answers.css'

import DoubtService from '../../../services/doubt-services'

class Answers extends Component{

    constructor(props){
        super(props)
        this.state = {
            answer: ''
        }
        this.doubtService = new DoubtService()
    }

    renderDeleteLink = (id, userId) => {
       return this.props.loggedInUser && this.renderLink(id, userId)  
    }
    renderLink = (id, userId) => {
        return(
            this.props.loggedInUser._id.toString() !== userId.toString()
            ? console.log('hola')
            : <Link onClick={() => this.deleteAnswer(id)}>eliminar</Link>
            )
    }
    deleteAnswer = (id) => {
        this.doubtService
            .deleteAnswer(id)
            .then(() => {
                this.props.getDoubt(this.props.selectedDoubt._id)
            })
    }


    renderAnswers = () => {
        return this.props.doubtAnswers.map((answer, index) => {
            return(
                <li key={index}>{answer.answer}  {this.renderDeleteLink(answer._id, answer.userId)}</li>
            )
        })
    }

    render(){
        return(
            <div class="answers">
                <h3>Respuestas</h3>
                <Scrollbars style={{ width: 300, heigth: 50}} autoHeight>
                    <ul>
                        {this.renderAnswers()}
                    </ul>
    
                </Scrollbars>
            </div>
        )
    }

}

export default Answers