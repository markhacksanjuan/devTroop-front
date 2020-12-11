import React, { Component } from 'react'

import DoubtService from '../../../services/doubt-services'

class NewDoubt extends Component {
    constructor(props){
        super(props)
        this.state ={
            title: '',
            doubt: '',
        }
        this.service = new DoubtService()
    }
    handleChange = (e) => {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }   

    createDoubt = (e) => {
        e.preventDefault()
        this.service
            .newDoubt(this.state.title, this.state.doubt, this.props.loggedInUser)
            .then(response => {
                this.setState({
                    title: '',
                    doubt: ''
                })
                return
            })
    }

    render(){
        if(!this.props.show){
            return null
        }
        return (
            <div>
                <form onSubmit={(e) => this.createDoubt(e)}>
                    <label>Título: </label>
                    <input name='title' onChange={this.handleChange} value={this.state.title} />
                    <label>Tu duda:</label>
                    <textarea name='doubt' onChange={this.handleChange} value={this.state.doubt} />
                    <input type='submit' value='enviar duda' />
                </form>
    
            </div>
        )
    }

}

export default NewDoubt