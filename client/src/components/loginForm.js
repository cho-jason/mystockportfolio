import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { login } from '../store'

const LoginForm = ({ errorMessage, login }) => {
  const history = useHistory()

  // STATE
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = evt => {
    evt.preventDefault()
    login(email, password, () => history.push('/'))
  }

  return (
    <div id="login">
      <form onSubmit={handleSubmit}>
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
            autoComplete="on"
            onChange={evt => setPassword(evt.target.value)}
            required
          />
        </div>
        <button type="submit">Sign In</button>
      </form>
      <p className="error">{errorMessage}</p>
    </div>
  )
}

const mapState = state => ({
  errorMessage: state.user.errorMessage
})

const mapDispatch = dispatch => ({
  login: (email, password, push) => {
    dispatch(login(email, password, push))
  }
})

export default connect(mapState, mapDispatch)(LoginForm)
