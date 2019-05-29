import React, { Component } from 'react'
import { TransitionGroup, Transition } from "react-transition-group"
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom"

import { observer } from 'mobx-react'

import LoginBox from './layouts/LoginBox'
import ArticleManager from './layouts/ArticleManager'

import './App.css'
import qs from 'qs'

const LoginInArticleManagerTiming = 2200
const LoginInLoginBoxTiming = 1000
const LoginInTiming = Math.max(LoginInArticleManagerTiming, LoginInLoginBoxTiming)

function RedirectToLogin(callback) {
  return <Redirect to={{
    pathname: '/login',
    search: `?callback=${encodeURIComponent(callback)}`
  }} />
}

@observer class App extends Component {
  constructor() {
    super()

    this.renderCount = 0
  }

  handleLoginSuccess = token => {
    const { store } = this.props

    console.warn('token', token)
    store.token = token
    store.isLogin = true
  }

  render() {
    const { store } = this.props
    ++this.renderCount
    // console.warn('store.isLogin', this.props, count)

    return (
      <div className="app">
        <Router>
          <Route key={ 'up' + store.isLogin } render={({ location }) => {
            const isNotLogin = !store.isLogin && (location.pathname !== '/login')
            // 未登录跳转到登录页
            if (isNotLogin) {
              return RedirectToLogin(`${location.pathname}${location.search}`)
            }
          }} />

          <Route
            render={({ location }) => {
              const isFirstRender = this.renderCount === 1
              const isNotLogin = !store.isLogin && (location.pathname !== '/login')

              // 未登录跳转到登录页
              if (isFirstRender && isNotLogin) {
                return RedirectToLogin(`${location.pathname}${location.search}`)
              }

              return <div className="app-route">
                <TransitionGroup>
                  <Transition key={ location.pathname } timeout={ LoginInTiming }>
                    {state => (
                      <Switch location={ location }>
                        <Route
                          path="/home"
                          exact
                          render={route => (
                            <ArticleManager
                              isLogin={ store.isLogin }
                              route={ route }
                              transitionState={ state }
                              transitionTiming={ LoginInArticleManagerTiming }
                            />
                          )}
                        />

                        <Route
                          exact
                          path="/login"
                          render={route => (
                            <LoginBox
                              store={ this.props.store }
                              route={ route }
                              transitionState={ state }
                              transitionTiming={ LoginInLoginBoxTiming }
                              onLoginSuccess={ this.handleLoginSuccess }
                            />
                          )}
                        />
                      </Switch>
                    )}
                  </Transition>
                </TransitionGroup>
              </div>
            }}
          />

          <Route key={ 'down' + store.isLogin } render={({ location }) => {
            if (store.isLogin && (location.pathname === '/login')) {
              const splited = location.search.split('?')
              if (splited.length > 1) {
                const query = qs.parse(splited.pop())
                console.warn('query.callback', query, location)
                return <Redirect to={ query.callback } />
              } else {
                return <Redirect to={ '/home' } />
              }
            }
          }} />
        </Router>
      </div>
    )
  }
}

export default App
