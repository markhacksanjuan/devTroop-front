import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import './EditDoubtForm.css'

import DoubtService from '../../services/doubt-services'

class EditDoubtForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            selectedDoubt: '',
            title: '',
            doubt: '',
        }
        this.doubtService = new DoubtService()
    }

    componentDidMount = (props) => {
        this.setState({
            selectedDoubt: this.props.selectedDoubt,
            title: this.props.selectedDoubt.title,
            doubt: this.props.selectedDoubt.doubt,
        })
    }

    handleOnSubmit = (e) => {
        e.preventDefault()
        const { title, doubt } = this.state
        this.doubtService.editOneDoubt(this.state.selectedDoubt._id, title, doubt)
        .then(response => {
            this.setState({
                title: response.title,
                doubt: response.doubt
            })
            this.props.history.push('/pool')
        })
    }

    handleOnChange = (e) => {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }

    render(){
        return(
            <div className='edit-doubt-form'>
                <h3>Editar Duda</h3>
                <form onSubmit={(e) => this.handleOnSubmit(e)} >
                    {
                    this.state.title
                    ? <input name='title' onChange={(e) => this.handleOnChange(e)} value={this.state.title} placeholder='Titulo de la duda' />
                    : null
                    }
                    <label>Duda: </label>
                    {
                    this.state.doubt
                    ? <textarea name='doubt' onChange={(e) => this.handleOnChange(e)} value={this.state.doubt}></textarea>
                    : null
                    }

                    <button type='submit'>Modificar duda</button>
                </form>

            </div>
        )
    }
}

export default withRouter(EditDoubtForm)