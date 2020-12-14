import React, { Component } from 'react'
import './NewAnswer.css'

import DoubtService from '../../../services/doubt-services'

class NewAnswer extends Component {
    constructor(props){
        super(props)
        this.state = {
            answer: '',
        }
        this.doubtService = new DoubtService()
    }

    handleChange = (e) => {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }
    createAnswer = (e) => {
        e.preventDefault()
        this.doubtService
            .createAnswer(this.state.answer,this.props.selectedDoubt._id, this.props.loggedInUser._id)
            .then(() => {
                this.setState({answer: ''})
                this.props.getDoubt(this.props.selectedDoubt._id)
                this.props.showFormAnswerToggle(e)
            })

    }

    render(){
        if(!this.props.show){
            return null
        }
        return(
            <div className='new-answer'>
                <form onSubmit={e => this.createAnswer(e)}>
                    <textarea name='answer' onChange={this.handleChange} value={this.state.answer} />
                    <button type='submit'>Enviar respuesta</button>
                </form>

            </div>
        )
    }
}

export default NewAnswer