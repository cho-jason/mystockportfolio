import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../store'

const Navbar = ({ isLoggedIn, logout }) => {
  const handleClick = evt => {
    evt.preventDefault()
    logout()
  }

  return (
    <nav>
      <h1>My Stock Portfolio</h1>
      {isLoggedIn ? (
        <div>
          <NavLink to="/" activeClassName="selected">
            Home
          </NavLink>
          <NavLink to="/transactions" activeClassName="selected">
            Transactions
          </NavLink>
          <a href="#" onClick={handleClick}>
            Log Out
          </a>
        </div>
      ) : (
        <div>
          <NavLink to="/login" activeClassName="selected">
            Login
          </NavLink>
          <NavLink to="/register" activeClassName="selected">
            Register
          </NavLink>
        </div>
      )}
    </nav>
  )
}

const mapState = state => ({
  isLoggedIn: state.user.id ? true : false
})

const mapDispatch = dispatch => ({
  logout: () => dispatch(logout())
})

export default connect(mapState, mapDispatch)(Navbar)
