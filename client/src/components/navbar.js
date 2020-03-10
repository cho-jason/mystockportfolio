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
          <NavLink exact to="/" activeClassName="selected">
            Home
          </NavLink>
          <NavLink exact to="/transactions" activeClassName="selected">
            Transactions
          </NavLink>
          <button className="link-button" onClick={handleClick}>
            Log Out
          </button>
        </div>
      ) : (
        <div>
          <NavLink exact to="/login" activeClassName="selected">
            Login
          </NavLink>
          <NavLink exact to="/register" activeClassName="selected">
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
