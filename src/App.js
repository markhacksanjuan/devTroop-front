import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import './App.css';

// --- SERVICES ---
import AuthService from './auth/auth-service'

// --- COMPONENTS ---
import Home from './components/Home/Home'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Signup from './components/Signup/Signup'
import Login from './components/Login/Login'
import Verification from './components/Verification/Verification'
import Verificating from './components/Verificating/Verificating'
import PoolDoubts from './components/PoolDoubts/PoolDoubts'
import Message from './components/Message/Message'
import Perfil from './components/Perfil/Perfil'
import PerfilPublico from './components/PerfilPublico/PerfilPublico'
import EditProfileForm from './components/EditProfileForm/EditProfileForm'
import EditDoubtForm from './components/EditDoubtForm/EditDoubtForm'

// --- PROTECTED COMPONENT ---
import ProtectedRoute from './auth/ProtectedRoute'


class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      loggedInUser: null,
      publicProfileId: '',
      selectedDoubt: ''
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

  getProfilePublicId = (id) => {
    this.setState({
      publicProfileId: id
    })
  }
  getDoubtToApp = (doubt) => {
    this.setState({
      selectedDoubt: doubt
    })
  }
  changeAvatar = (avatarUrl) => {
    const copyUser = {...this.state.loggedInUser, imgPath:avatarUrl}
    this.setState({
      loggedInUser: copyUser
    })
  }
  changeUserInfo = (userInfo) => {
    const copyUser = {...this.state.loggedInUser, 
      name: userInfo.name, 
      lastName: userInfo.lastName,
      city: userInfo.city,
      githubUrl: userInfo.githubUrl,
      ironhackCourse: userInfo.ironhackCourse,
      linkedinUrl: userInfo.linkedinUrl
    }
    this.setState({ loggedInUser: copyUser})
  }

  updateFriends = (id) => {
    const copyUser = {...this.state.loggedInUser}
    const newFriendsArr = copyUser.friends.filter(friend => {
      return friend.toString() !== id.toString()
    })
    this.setState({ loggedInUser: copyUser })
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
            <Route exact path='/pool' render={() => {
              return (
                <PoolDoubts 
                loggedInUser={this.state.loggedInUser} 
                  getDoubtToApp={this.getDoubtToApp}
                />
              )
            }} />
              <ProtectedRoute 
              exact 
              path='/message'
              user={this.state.loggedInUser} 
              
              component={Message}

              />
              <ProtectedRoute 
              exact 
              path='/profile' 
              user={this.state.loggedInUser}
              component={Perfil}
              getProfilePublicId={this.getProfilePublicId}
              
              />
              <ProtectedRoute 
              exact 
              path='/profile/:id'
              user={this.state.loggedInUser}
              component={PerfilPublico}
              publicProfileId={this.state.publicProfileId}
              updateFriends={this.updateFriends}
              />
              <ProtectedRoute 
              exact 
              path='/editProfile'
              user={this.state.loggedInUser}
              component={EditProfileForm}
              changeAvatar={this.changeAvatar}
              changeUserInfo={this.changeUserInfo}
              render={() => {
              }} />
              <ProtectedRoute 
              exact 
              path='/editDoubt'
              user={this.state.loggedInUser}
              component={EditDoubtForm}
              changeAvatar={this.changeAvatar}
              selectedDoubt={this.state.selectedDoubt[0]}
               />
          </Switch>
          <Footer
          userInSession={this.state.loggedInUser}
          getUser={this.getTheUser}
          />
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
              <Route exact path='/user/confirmation/:email/:token' component={Verificating} />
              <Route exact path='/pool' render={() => {
              return (
                <PoolDoubts 
                  getDoubtToApp={this.getDoubtToApp}
                />
              )
            }} />


            <ProtectedRoute 
              exact 
              path='/message'
              user={this.state.loggedInUser} 
              render={() => {
                return (
                  <Message loggedInUser={this.state.loggedInUser} />
                )
              }} />
              <ProtectedRoute 
              exact 
              path='/profile' 
              user={this.state.loggedInUser}
              render={() => {
                return (
                  <Perfil 
                    loggedInUser={this.state.loggedInUser} 
                    getProfilePublicId={this.getProfilePublicId}
                  />
                )
              }} />
              <ProtectedRoute 
              exact 
              path='/profile/:id'
              user={this.state.loggedInUser}
              render={() => {
                return (
                  <PerfilPublico 
                  loggedInUser={this.state.loggedInUser}
                  publicProfileId={this.state.publicProfileId}
                  updateFriends={this.updateFriends}
                   />
                )
              }} />
              <ProtectedRoute 
              exact 
              path='/editProfile'
              user={this.state.loggedInUser} 
              render={() => {
                return (
                  <EditProfileForm 
                    loggedInUser={this.state.loggedInUser}
                    changeAvatar={this.changeAvatar}
                    changeUserInfo={this.changeUserInfo}
                  />
                )
              }} />
              <ProtectedRoute 
              exact 
              path='/editDoubt'
              user={this.state.loggedInUser} 
              render={() => {
                        return(
                            <EditDoubtForm 
                              selectedDoubt={this.state.selectedDoubt[0]}
                            />
                        )
                    }} />

          </Switch>
          <Footer
          userInSession={this.state.loggedInUser}
          getUser={this.getTheUser}
          />
        </div>
      )
    }
  }
}

export default App;
