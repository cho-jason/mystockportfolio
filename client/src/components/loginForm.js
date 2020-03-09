import React, { useState } from 'react'
import { connect } from 'react-redux'
import { login } from '../store'

const LoginForm = ({ handleSubmit }) => {
  // STATE
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div>
      <h2>Log In</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="text"
            value={email}
            onChange={evt => setEmail(evt.target.value)}
            required
          />
        </div>
        <div>
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
        <button type="submit">Log In</button>
      </form>
    </div>
  )
}

const mapDispatch = dispatch => ({
  handleSubmit: evt => {
    evt.preventDefault()
    const email = evt.target.email.value
    const password = evt.target.password.value
    dispatch(login(email, password))
  }
})

export default connect(null, mapDispatch)(LoginForm)
