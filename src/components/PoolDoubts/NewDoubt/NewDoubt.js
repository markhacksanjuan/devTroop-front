import React, { Component } from 'react'
import './NewDoubt.css'

import DoubtService from '../../../services/doubt-services'

class NewDoubt extends Component {
    constructor(props){
        super(props)
        this.state ={
            title: '',
            doubt: '',
            errorMessage: '',
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
                if(response.errorMessage){
                    this.setState({errorMessage: response.errorMessage})
                    return
                }
                this.setState({
                    title: '',
                    doubt: ''
                })
                this.props.showFormToggle(e)
                this.props.updateDoubts(response)
                return
            })
    }

    render(){
        if(!this.props.show){
            return null
        }
        return (
            <div className='new-doubt'>
                <form onSubmit={(e) => this.createDoubt(e)}>
                    <label>Título: </label>
                    <input name='title' onChange={this.handleChange} value={this.state.title} />
                    <label>Tu duda:</label>
                    <textarea name='doubt' onChange={this.handleChange} value={this.state.doubt} />
                    {this.state.errorMessage && <p className='errorMessage'>{this.state.errorMessage}</p>}
                    <button type='submit'>enviar duda</button>
                </form>
    
            </div>
        )
    }

}

export default NewDoubt