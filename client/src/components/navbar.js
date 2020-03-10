import React from 'react'
import { Link } from 'react-router-dom'
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
          <Link to="/home">Home</Link>
          <Link to="/transactions">Transactions</Link>
          <a href="#" onClick={handleClick}>
            Log Out
          </a>
        </div>
      ) : (
        <div>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
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
