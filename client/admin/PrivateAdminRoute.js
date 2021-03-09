import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import checkAdminAuth from './admin-helper';

const PrivateAdminRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    checkAdminAuth() ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/signin',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

export default PrivateAdminRoute
