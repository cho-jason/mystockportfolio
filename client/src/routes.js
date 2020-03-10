import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Route, Switch, withRouter } from 'react-router-dom'
import {
  LoginForm,
  RegisterForm,
  Home,
  Transactions,
  PageNotFound
} from './components'
import { getUser } from './store'

const Routes = ({ isLoggedIn, loadInitialData }) => {
  // EFFECTS
  useEffect(() => {
    loadInitialData()
  })

  return (
    <Switch>
      <Route exact path="/">
        {isLoggedIn ? <Home /> : <Route component={LoginForm} />}
      </Route>
      <Route exact path="/transactions">
        {isLoggedIn ? <Transactions /> : <Route component={LoginForm} />}
      </Route>
      <Route exact path="/login" component={LoginForm} />
      <Route exact path="/register" component={RegisterForm} />
      <Route component={PageNotFound} />
    </Switch>
  )
}

const mapState = state => ({
  isLoggedIn: state.user.id ? true : false
})

const mapDispatch = dispatch => ({
  loadInitialData: () => {
    dispatch(getUser())
  }
})

export default withRouter(connect(mapState, mapDispatch)(Routes))
