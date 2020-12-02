import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import AuthContext from '../../context/auth/authContext'

// This is the way to create a private route component
const PrivateRoute = ({ component: Component, ...rest }) => {
  const authContext = useContext(AuthContext)

  const { isAuthenticated, loading } = authContext
  return (
    <Route {...rest} render={props => !isAuthenticated && !loading ? (
      <Redirect to='/login' />
    ) : (
      <Component {...props} />
    )} />
  )
}

export default PrivateRoute
