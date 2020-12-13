import React, { Component } from 'react'
import { Link, Switch, Route } from 'react-router-dom'
import './PoolDoubts.css'

// --- SERVICES ---
import DoubtService from '../../services/doubt-services'

// --- COMPONENTS ---
import DoubtList from './DoubtList/DoubtList'
import OneDoubt from './OneDoubt/OneDoubt'
import Answers from './Answers/Answers'
import NewDoubt from './NewDoubt/NewDoubt'
import Loading from '../Loading/Loading'
import SearchDoubt from './SearchDoubt/SearchDoubt'

class PoolDoubts extends Component {

    constructor(props){
        super(props)
        this.state = {
            doubts: [],
            selectedDoubt: '',
            doubtUser: '',
            doubtAnswers: '',
            showForm: false,
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

    showFormToggle = (e) => {
        e.preventDefault()
        this.state.showForm ? this.setState({showForm: false}) : this.setState({showForm: true})
    }

    search = (value) => {

    }



    render = () => {
        return(
            <div className='pool-doubts'>
                <h1>¡Hey! ¿Tienes alguna duda?</h1>
                {this.props.loggedInUser && 
                <button onClick={(e) => this.showFormToggle(e)}>Crea tu duda</button>
                }
                    <NewDoubt
                        show={this.state.showForm}
                        loggedInUser={this.props.loggedInUser}
                    />
                    <div className='container-doubt-answer'>
                        <div className='doubts'>
                        <SearchDoubt
                            search={this.search}
                            />
                        {this.state.doubts.length === 0 ? <Loading /> : <DoubtList 
                                                getDoubt={this.getDoubt}
                                                doubts={this.state.doubts} />}
                        </div>
                        <div className='doubt-answers'>
                        {this.state.selectedDoubt === '' ? null : <OneDoubt 
                                selectedDoubt={this.state.selectedDoubt[0]}
                                loggedInUser={this.props.loggedInUser}
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