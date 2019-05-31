import vait from 'vait'
import React, { Component } from 'react'
import { TransitionGroup, Transition } from "react-transition-group"

import LoginInputFrame from './LoginInputFrame'
import FatalError from './FatalError'

import { Login as LoginRequest, checkLoginStatus } from 'api/auth'

const channelLightAnimateTiming = 1500
const channelLightAnimateCount = 1
const channelLightAnimateTimingTotal = channelLightAnimateTiming * channelLightAnimateCount

const Login = function() {
  const v = vait()
  LoginRequest(...arguments).then(v.pass).catch(v.fail)
  return v
}

export default class LoginBox extends Component {
  state = {
    error: null,
    logining: false,
    disableInput: false
  }

  // loginV 得是由 vait 创建的 Promise 实例
  startLoginEffect = loginV => {
    this.setState({
      disableInput: true,
      logining: true
    })

    const callbackV = vait()

    const checkLoginIsFinally = () => {
      console.log('checkLoginIsFinally', loginV.__finally__)
      if (loginV.__finally__) {
        loginV.then(callbackV.pass)
        loginV.catch(callbackV.fail)

        return loginV.__finally__
        // return true
      }
    }

    const minAnimatePlayCount = 2
    let animatePlayCount = 0
    const isIteralToMinCount = () => {
      return animatePlayCount >= minAnimatePlayCount
    }
    let animateV = null
    const setAnimateV = () => {
      animatePlayCount += 1
      animateV = vait.timeout(channelLightAnimateTimingTotal, 'animateDone')
      return animateV
    }
    setAnimateV()

    const retryShuttleAnimate = () => {
      this.setState({
        logining: false
      })

      vait.nextTick().then(() => {
        if (isIteralToMinCount() && checkLoginIsFinally()) {
          // 检查光有没有穿梭足够的次数，有则检查登录请求的情况
          return
        }

        this.setState({
          logining: true
        })

        setAnimateV()
        detectLoginState()
      })
    }

    const detectLoginState = () => {
      Promise.race([loginV, animateV]).catch(err => {
        // loginV 抛出的错误
        return Object.assign(err, { fatal: true })
      }).then(async (vResult) => {
        if (!isIteralToMinCount()) {
          // 检查光有没有穿梭足够的次数，没有则继续重复穿梭
          await animateV
          return retryShuttleAnimate()
        // } else if ((typeof vResult === 'boolean') && loginV.__finally__) {
        } else if (loginV.__finally__) {
          // 检查 loginV 是否有结果，有的话就等待动画播放完再做进一步操作
          await animateV
          return checkLoginIsFinally() // 检查登录请求的情况
        } else if (vResult === 'animateDone') {
          // 光已穿梭完
          retryShuttleAnimate()
        }
      })
    }

    detectLoginState()

    return callbackV
  }

  detectPassword = async (password) => {
    const loginV = Login(password)
    try {
      console.log('startLoginEffect')
      const resultV = this.startLoginEffect(loginV)
      resultV.catch(err => {
        console.error('errrrrrrr', err)
      })
      const token = await resultV
      if (token) {
        this.props.onLoginSuccess && this.props.onLoginSuccess(token)
      } else {
        console.warn('invliad password')
        this.setState({
          error: Error('密码错误'),
          logining: false,
          disableInput: false
        })
      }
    } catch (error) {
      console.error('login fail', error)
      this.setState({
        error,
        logining: false,
        disableInput: false
      })
    }
  }

  // 自动登录
  async autoLogin() {
    const { state, props: { store } } = this
    if (state.logining) {
      return
    }

    if (!store.token) {
      // 没有 token 的话退出
      return
    }

    try {
      const checkLoginStatusV = vait()
      checkLoginStatus()
        .then(checkLoginStatusV.pass)
        .catch(checkLoginStatusV.fail)

      const loginStatus = await this.startLoginEffect(checkLoginStatusV)

      if (loginStatus) {
        // token 还可用
        this.props.onLoginSuccess && this.props.onLoginSuccess(store.token)
      } else {
        // token 不可用
        store.token = null
        this.setState({
          logining: false,
          disableInput: false
        })
      }
    } catch (error) {
      console.error('detectLogin fail', error)
      this.setState({
        error,
        logining: false,
        disableInput: false
      })
    }
  }

  componentDidMount() {
    if (this.props.transitionState === 'entered') {
      this.autoLogin()
    }
  }

  render() {
    const { error, disableInput } = this.state

    return <div className={ `box ${this.props.transitionState} ${ error ? 'error' : '' }` }>
      <div className="up-side-wrapper">
        <div className="up-side">
          <div className={ `login-frame` }>
            <LoginInputFrame
              isFailure={ error }
              disabled={ disableInput }
              handleInputChange={ () => {
                this.setState({
                  error: null
                })
              } }
              handlePasswordDetect={ this.detectPassword }
            />
          </div>
        </div>
      </div>

      <div className="down-side-wrapper">
        <div className="down-side">
          <TransitionGroup className="transition-group">
            <Transition key={ error ? error.message: 'null' } timeout={ 500 }>
              {state => (
                (error && error.fatal) && <FatalError transitionTiming={ 500 } transitionState={ state } error={ error } />
              )}
            </Transition>
          </TransitionGroup>
        </div>

        <div className={ `light-channel ${this.state.logining ? 'logining' : ''}` }>
          <div className="light"></div>
        </div>
      </div>

      <style jsx>{`
        .login-frame {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
        }

        .exiting .light-channel,
        .exited .light-channel {
          display: none;
        }

        .light-channel {
          position: absolute;
          left: 0;
          width: 100%;
          height: 8px;
          top: -4px;
          /* top: calc(50%); */
        }

        @keyframes shuttle {
          from {
            margin-left: -300px;
          }
          to {
            margin-left: 100%;
          }
        }

        .light-channel.logining .light {
          animation-name: shuttle;
          animation-duration: ${channelLightAnimateTiming}ms;
          animation-iteration-count: ${channelLightAnimateCount};
        }

        .light-channel .light {
          width: 300px;
          height: 100%;
          margin-left: -300px;
          background: linear-gradient(to right, #acacb8, white, #acacb8);
        }

        .box {
          transition: color 618ms, background-color 618ms;
          position: fixed;
          left: 0;
          top: 0;
          width: 100vw;
          height: 100vw;

          z-index: 1;
        }

        .box.error .up-side,
        .box.error .down-side {
          border-color: rgb(241, 56, 56);
        }

        .up-side-wrapper, .down-side-wrapper {
          position: relative;
          perspective: 300vw;

          width: 100vw;
          height: 50vh;
        }

        .up-side-wrapper {
          perspective-origin: center top;
        }

        .down-side-wrapper {
          perspective-origin: center bottom;
        }

        @keyframes up_side_enter {
          from {
            transform: rotateX(-90deg);
          }
          to {
            transform: rotateX(0deg);
          }
        }

        @keyframes up_side_exit {
          from {
            transform: rotateX(0deg);
          }
          to {
            transform: rotateX(-90deg);
          }
        }

        .up-side {
          border-bottom: solid 4px hsl(240, 9%, 70%);
          transform-origin: top center;
        }

        .entered .up-side {
          transform: rotateX(0deg);
        }

        .entering .up-side {
          animation-name: up_side_enter;
          transform: rotateX(-90deg);
        }

        .exited .up-side {
          transform: rotateX(-90deg);
        }

        .exiting .up-side {
          animation-name: up_side_exit;
          transform: rotateX(0deg);
          animation-delay: 200ms;
        }

        @keyframes down_side_enter {
          from {
            transform: rotateX(90deg);
          }
          to {
            transform: rotateX(0deg);
          }
        }

        @keyframes down_side_exit {
          from {
            transform: rotateX(0deg);
          }
          to {
            transform: rotateX(90deg);
          }
        }

        .down-side {
          border-top: solid 4px hsl(240, 9%, 70%);
          transform-origin: bottom center;
        }

        .entered .down-side {
          transform: rotateX(0deg);
        }

        .entering .down-side {
          animation-name: down_side_enter;
          transform: rotateX(90deg);
        }

        .exited .down-side {
          transform: rotateX(90deg);
        }

        .exiting .down-side {
          animation-delay: 200ms;
          animation-name: down_side_exit;
          transform: rotateX(0deg);
        }

        .down-side :global(.transition-group){
          height: 100%;
          width: 100%;

          transform: translateZ(0);
        }

        .up-side, .down-side {
          animation-fill-mode: forwards;
          animation-timing-function: ease-out;
          animation-duration: ${ this.props.transitionTiming }ms;

          animation-timing-function: cubic-bezier(.59,-0.45,.65,.98);

          transition: border-color 500ms;

          position: absolute;
          left: -4px;
          top: 0;
          height: 100%;
          width: calc(100% + 4px * 2);

          box-sizing: border-box;

          border-left: solid 4px hsl(240, 9%, 70%);
          border-right: solid 4px hsl(240, 9%, 70%);

          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 96px;
          font-weight: 200;
          color: #3a3a45;

          background-color: white;
        }
      `}</style>
    </div>
  }
}
