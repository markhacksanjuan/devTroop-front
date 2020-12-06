import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import './App.css';

// --- COMPONENTS ---
import Home from './components/Home/Home'
import Navbar from './components/Navbar/Navbar'
import Signup from './components/Signup/Signup'
import Login from './components/Login/Login'

class App extends Component {

  state = {

  }

  render(){

    return (
      <div className="App">
        <Navbar />
        <Route exact path='/' component={Home} />
        <Route exact path='/signup' component={Signup} />
        <Route exact path='/login' component={Login} />
      </div>
    );
  }
}

export default App;
