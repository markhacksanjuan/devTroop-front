import React, { Component } from 'react'
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
import NewAnswer from './NewAnswer/NewAnswer'

class PoolDoubts extends Component {

    constructor(props){
        super(props)
        this.state = {
            doubts: [],
            selectedDoubt: '',
            doubtUser: '',
            doubtAnswers: '',
            showForm: false,
            showFormAnswer: false,
            doubtsSearch: []

        }
        this.service = new DoubtService()
    }

    componentDidMount = () => {
        this.service
        .getAllDoubts()
        .then(response => {
            this.setState({
                doubts: response,
                doubtsSearch: response,
            })
        })
    }

    getDoubt = (id) => {
        const selectedDoubt = this.state.doubts.filter(doubt => {
            return doubt._id === id
        })
        this.service.getAllAnswersOfDoubt(selectedDoubt[0]._id)
        .then(answers => {
            this.setState({
                selectedDoubt,
                doubtAnswers: answers
            })
            
        })
        this.props.getDoubtToApp(selectedDoubt)
    }

    showFormToggle = (e) => {
        e.preventDefault()
        this.state.showForm ? this.setState({showForm: false}) : this.setState({showForm: true})
    }
    showFormAnswerToggle = (e) => {
        e.preventDefault()
        this.state.showFormAnswer ? this.setState({showFormAnswer: false}) : this.setState({showFormAnswer: true})
    }

    search = (value) => {
        const copyDoubts = [...this.state.doubtsSearch]
        const valueLower = value.toLowerCase()
        const newArr = copyDoubts.filter(item => {
            const newName = item.title.toLowerCase()
            return newName.includes(valueLower)
        })
        this.setState({
            doubts: newArr
        })
        if(value === ''){
            this.setState({ doubts: copyDoubts })
        }
    }
    updateDoubts = (doubt) => {
        const copyDoubts = [...this.state.doubts]
        const copyNewDoubt = {...doubt, userId:this.props.loggedInUser}
        copyDoubts.unshift(copyNewDoubt)
        this.setState({
            doubts: copyDoubts
        })
    }



    render = () => {
        return(
            <div className='pool-doubts'>
                <h1>¡Hey! ¿Tienes alguna duda?</h1>
                {this.props.loggedInUser && 
                <button className='pool-button' onClick={(e) => this.showFormToggle(e)}>Crea tu duda</button>
                }
                    <NewDoubt
                        show={this.state.showForm}
                        loggedInUser={this.props.loggedInUser}
                        showFormToggle={this.showFormToggle}
                        updateDoubts={this.updateDoubts}
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
                                loggedInUser={this.props.loggedInUser}
                                getDoubt={this.getDoubt}
                                selectedDoubt={this.state.selectedDoubt[0]}
                            />}
                <NewAnswer 
                    show={this.state.showFormAnswer}
                    loggedInUser={this.props.loggedInUser}
                    selectedDoubt={this.state.selectedDoubt[0]}
                    getDoubt={this.getDoubt}
                    showFormAnswerToggle={this.showFormAnswerToggle}
                />
                            {(this.props.loggedInUser && this.state.doubtAnswers !== '') &&
                <button className='pool-button' onClick={(e) => this.showFormAnswerToggle(e)}>Responde a la duda</button>
                }
                        </div>


                    </div>

                    
            </div>
        )
    }

}

export default PoolDoubts