import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import { LoginForm, Home, Transactions } from './components'
import { getUser } from './store'

const Routes = ({ isLoggedIn, loadInitialData }) => {
  // EFFECTS
  useEffect(() => {
    loadInitialData()
  }, [loadInitialData])

  return (
    <Switch>
      <Route path="/login" component={LoginForm} />
      {isLoggedIn ? (
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/transactions" component={Transactions} />
          <Route component={Home} />
        </Switch>
      ) : (
        <Route component={LoginForm} />
      )}
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
