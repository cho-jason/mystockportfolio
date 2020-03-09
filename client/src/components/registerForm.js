import React, { useState } from 'react'
import { connect } from 'react-redux'
import { signup } from '../store'

const RegisterForm = ({ handleSubmit }) => {
  // STATE
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            name="name"
            type="text"
            value={name}
            onChange={evt => setName(evt.target.value)}
            required
          />
        </div>
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
            onChange={evt => setPassword(evt.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  )
}

const mapDispatch = dispatch => ({
  handleSubmit(evt) {
    evt.preventDefault()
    const name = evt.target.name.value
    const email = evt.target.email.value
    const password = evt.target.password.value
    dispatch(signup(name, email, password))
  }
})

export default connect(null, mapDispatch)(RegisterForm)
