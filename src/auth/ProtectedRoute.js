import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'

const protectedRoute = ({
    component: Component, 
    user,
    getProfilePublicId,
    publicProfileId,
    updateFriends,
    changeAvatar,
    changeUserInfo,
    selectedDoubt,

     ...rest}) => {
    return (
        <Route
        {...rest}
        render={ props => {
            if(user){
                return <Component {...props} loggedInUser={user} 
                getProfilePublicId={getProfilePublicId}
                publicProfileId={publicProfileId}
                updateFriends={updateFriends}
                changeAvatar={changeAvatar}
                changeUserInfo={changeUserInfo}
                selectedDoubt={selectedDoubt}
                />
            }else {
                return <Redirect to={{pathname: '/', state: {from: props.location}}} />
            }
        }}
        />
    )
}
export default protectedRoute