import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const Navbar = ({ title, icon }) => {
  return (
    <div className="navbar bg-primary">
      <h1>
        <i className="far fa-address-book" /> Contact Book
      </h1>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/about'>About</Link>
        </li>
      </ul>
    </div>
  )
}

Navbar.propType = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string
}

Navbar.propType = {
  title: 'Contact Book',
  icon: "far fa-address-book"
}

export default Navbar
