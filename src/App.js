import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import './App.css';

// --- SERVICES ---
import AuthService from './auth/auth-service'

// --- COMPONENTS ---
import Home from './components/Home/Home'
import Navbar from './components/Navbar/Navbar'
import Signup from './components/Signup/Signup'
import Login from './components/Login/Login'
import Verification from './components/Verification/Verification'
import PoolDoubt from './components/PoolDoubts/PoolDoubts'
import Message from './components/Message/Message'
import Perfil from './components/Perfil/Perfil'

class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      loggedInUser: null
    }
    this.service = new AuthService()
  }

  fetchUser(){
    if(this.state.loggedInUser === null){
      this.service.loggedin()
      .then(response => {
        this.setState({
          loggedInUser: response
        })
      })
      .catch(err => {
        this.setState({
          loggedInUser: false
        })
      })
    }
  }


  getTheUser = (userObj) => {
    this.setState({
      loggedInUser: userObj
    })
  }

  render(){
    this.fetchUser()
    if(this.state.loggedInUser){
      return (
        <div className="App">
          <Navbar
          userInSession={this.state.loggedInUser}
          getUser={this.getTheUser}
           />
  
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/pool' component={PoolDoubt} />
              <Route exact path='/message' render={() => {
                return (
                  <Message loggedInUser={this.state.loggedInUser} />
                )
              }} />
              <Route exact path='/profile' component={Perfil} />
          </Switch>
        </div>
      )
    }else {
      return (
        <div className="App">
          <Navbar
          userInSession={this.state.loggedInUser}
          getUser={this.getTheUser}
           />
  
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/signup' render={() => {
              return(
                <Signup getUser={this.getTheUser} />
              )
            }} />
            <Route exact path='/login' render={() => {
              return(
                <Login getUser={this.getTheUser} />
              )
              }} />
              <Route exact path='/verification' component={Verification} />
              <Route exact path='/pool' component={PoolDoubt} />
          </Switch>
        </div>
      )
    }
  }
}

export default App;
