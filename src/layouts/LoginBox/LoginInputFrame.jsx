import React, { Component } from 'react'

import LoginInput from 'components/LoginInput'

export default class LoginInputFrame extends Component {
  state = {
    loading: false,
    latestInputTimeStamp: 0,
    status: 'none'
  }

  setQuickTriggerEvent(action, handler) {
    window[`${action}EventListener`]('mousemove', handler)
    window[`${action}EventListener`]('touchstart', handler)
  }

  handleInputChange = password => {
    this.props.handleInputChange && this.props.handleInputChange()

    this.setState({
      latestInputTimeStamp: Date.now()
    })

    clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      this.setQuickTriggerEvent('remove', this.quickTriggerHandler)

      this.passwordDetect(password)
    }, 800)

    this.setQuickTriggerEvent('remove', this.quickTriggerHandler)
    this.quickTriggerHandler = () => {
      console.log('quickTriggerHandler')

      const { latestInputTimeStamp } = this.state
      if (!latestInputTimeStamp) {
        return
      }

      const diff = Date.now() - latestInputTimeStamp
      if ((diff > 500) && (diff < 800)) {
        clearTimeout(this.timer)
        this.setQuickTriggerEvent('remove', this.quickTriggerHandler)

        console.log('(diff > 500) && (diff < 800)')
        this.passwordDetect(password)
      }
    }
    this.setQuickTriggerEvent('add', this.quickTriggerHandler)
  }

  passwordDetect(password) {
    if (password.length) {
      // 空密码不会跳转的
      this.props.handlePasswordDetect && this.props.handlePasswordDetect(password)
    }
  }

  render() {
    return (
      <div className="body">
        <div className={ `input-frame ${this.state.loading ? 'input-frame-loading' : ''}` }>
          <LoginInput
            isFailure={ this.props.isFailure }
            disabled={ this.props.disabled }
            status={ this.state.status }
            onInputChange={ this.handleInputChange }
          />
        </div>

        <style jsx>{`
          .body {
            overflow: hidden;

            display: flex;
            align-items: center;
            align-content: center;
            justify-content: flex-end;
            flex-direction: column;

            height: 100%;
            width: 100%;
          }

          .input-frame {
            /* padding: 1em 0; */
          }

          .input-frame-loading {
            padding-top: calc(1em + 1.5em);
          }
        `}</style>
      </div>
    )
  }
}
