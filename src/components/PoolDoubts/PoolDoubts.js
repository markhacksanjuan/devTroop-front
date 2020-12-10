import React, { Component } from 'react'
import { Link, Switch, Route } from 'react-router-dom'
import './PoolDoubts.css'

// --- SERVICES ---
import DoubtService from '../../services/doubt-services'

// --- COMPONENTS ---
import DoubtList from './DoubtList/DoubtList'
import OneDoubt from './OneDoubt/OneDoubt'
import Answers from './Answers/Answers'
import Loading from '../Loading/Loading'

class PoolDoubts extends Component {

    constructor(props){
        super(props)
        this.state = {
            doubts: [],
            selectedDoubt: '',
            doubtUser: '',
            doubtAnswers: ''
        }
        this.service = new DoubtService()
    }

    componentDidMount = () => {
        this.service
        .getAllDoubts()
        .then(response => {
            this.setState({
                doubts: response
            })
        })
    }

    getDoubt = (id) => {
        const selectedDoubt = this.state.doubts.filter(doubt => {
            return doubt._id === id
        })
        this.service.getAllAnswersOfDoubt(selectedDoubt[0]._id)
            .then(answers => {
                console.log(answers)
                this.setState({
                    selectedDoubt,
                    doubtAnswers: answers
                })

            })
    }



    render = () => {
        return(
            <div className='pool-doubts'>
                <h1>¡Hey! ¿Tienes alguna duda?</h1>
                <div className='doubts'>
                {this.state.doubts.length === 0 ? <Loading /> : <DoubtList 
                                        getDoubt={this.getDoubt}
                                        doubts={this.state.doubts} />}
                    <div className='doubt-answers'>
                    {this.state.selectedDoubt === '' ? null : <OneDoubt 
                            selectedDoubt={this.state.selectedDoubt}
                        />}
                    {this.state.doubtAnswers === '' ? null : <Answers 
                            doubtAnswers={this.state.doubtAnswers}
                        />}
                        
                    </div>
                </div>
            </div>
        )
    }

}

export default PoolDoubts