import React, { Fragment } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ContactState from './context/contact/ContactState'
import AuthState from './context/auth/AuthState'
import AlertState from './context/alert/AlertState'
import setAuthToken from './utils/setAuthToken'

import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import Alerts from './components/Alerts'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import PrivateRoute from './components/routing/PrivateRoute'

// Load user
if(localStorage.token) {
  setAuthToken(localStorage.token)
}

const App = () => {
  return (
    <AuthState>
      <ContactState>
        <AlertState>
          <Router>
            <Fragment className='App'>
              <Navbar />
              <div className='container'>
              <Alerts />
                <Switch>
                  <PrivateRoute exact path='/' component={Home} />
                  <Route exact path='/about' component={About} />
                  <Route exact path='/register' component={Register} />
                  <Route exact path='/login' component={Login} />
                </Switch>
              </div>
            </Fragment>
          </Router>
        </AlertState>
      </ContactState>
    </AuthState>
  )
}

export default App
