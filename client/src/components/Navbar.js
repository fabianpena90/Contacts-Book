import React, { Fragment, useContext } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import AuthContext from '../context/auth/authContext'

const Navbar = ({ title, icon }) => {
  const authContext = useContext(AuthContext)

  const { isAuthenticated, logout, user } = authContext

  const onLogout = () => {
    logout()
  }

  const authLinks = (
    <Fragment>
      <li>Hello {user && user.name}</li>
      <li>
        <a onClick={onLogout} href='#!'>
          <i className='fas fa-sign-out-alt'></i>{' '}
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </Fragment>
  )

  const guestsLinks = (
    <Fragment>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </Fragment>
  )

  return (
    <div className='navbar bg-primary'>
      <h1>
        <i className='far fa-address-book' /> Contact Book
      </h1>
      <ul>
        {isAuthenticated ? authLinks : guestsLinks}
      </ul>
    </div>
  )
}

Navbar.propType = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
}

Navbar.propType = {
  title: 'Contact Book',
  icon: 'far fa-address-book',
}

export default Navbar
