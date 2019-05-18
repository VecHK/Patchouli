import React, { Component } from 'react'
import { TransitionGroup, Transition } from "react-transition-group"
import { HashRouter as Router, Route, Switch } from "react-router-dom"

import LoginBox from './layouts/LoginBox'
import ArticleManager from './layouts/ArticleManager'

import './App.css'

const LoginInArticleManagerTiming = 1618
const LoginInLoginBoxTiming = LoginInArticleManagerTiming - 618
const LoginInTiming = Math.max(LoginInArticleManagerTiming, LoginInLoginBoxTiming)

class App extends Component {
  render() {
    return (
      <div className="app">
        <Router>
          <Route
            render={({ location }) => (
              <div className="app-route">
                <TransitionGroup>
                  <Transition key={ location.pathname } timeout={ LoginInTiming }>
                    {state => (
                      <Switch location={ location }>
                        <Route
                          path="/home"
                          exact
                          render={() => (
                            <ArticleManager transitionState={ state } transitionTiming={ LoginInArticleManagerTiming } />
                          )}
                        />

                        <Route
                          exact
                          path="/login"
                          render={route => (
                            <LoginBox transitionState={ state } transitionTiming={ LoginInLoginBoxTiming } />
                          )}
                        />
                      </Switch>
                    )}
                  </Transition>
                </TransitionGroup>
              </div>
            )}
          />
        </Router>
      </div>
    )
  }
}

export default App
