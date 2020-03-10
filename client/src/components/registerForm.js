import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { signup } from '../store'

const RegisterForm = ({ errorMessage, signup }) => {
  const history = useHistory()

  // STATE
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = evt => {
    evt.preventDefault()
    signup(name, email.toLowerCase(), password, () => history.push('/'))
  }

  return (
    <div id="register">
      <form onSubmit={handleSubmit}>
        <div className="input">
          <label htmlFor="name">Name</label>
          <input
            name="name"
            type="text"
            value={name}
            onChange={evt => setName(evt.target.value)}
            required
          />
        </div>
        <div className="input">
          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="text"
            value={email}
            onChange={evt => setEmail(evt.target.value)}
            required
          />
        </div>
        <div className="input">
          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            value={password}
            onChange={evt => setPassword(evt.target.value)}
            required
          />
        </div>
        <button type="submit" className="button">
          Register
        </button>
      </form>
      <p className="error">{errorMessage}</p>
    </div>
  )
}

const mapState = state => ({
  errorMessage: state.user.errorMessage
})

const mapDispatch = dispatch => ({
  signup: (name, email, password, push) => {
    dispatch(signup(name, email, password, push))
  }
})

export default connect(mapState, mapDispatch)(RegisterForm)
