import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { signup } from '../store'

const RegisterForm = ({ signup }) => {
  const history = useHistory()

  // STATE
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = evt => {
    evt.preventDefault()
    signup(name, email, password, () => history.push('/home'))
  }

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
  signup: (name, email, password, push) => {
    dispatch(signup(name, email, password, push))
  }
})

export default connect(null, mapDispatch)(RegisterForm)
