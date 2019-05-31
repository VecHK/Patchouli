import React, { Component } from 'react'

export default class FatalError extends Component {
  render() {
    return (
      <div className={ `fatal-error ${this.props.transitionState}` }>
        发生致命错误: { this.props.error.message }

        <style jsx>{`
          .fatal-error.entered {
            opacity: 1;
          }

          .fatal-error.exited {
            opacity: 0;
          }

          @keyframes fatalErrorFadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          .fatal-error.entering {
            animation-name: fatalErrorFadeIn;
            animation-duration: 500ms;
          }

          .fatal-error {
            font-size: 20px;
            line-height: 1.5em;
            text-align: center;
            padding-top: calc((48px - 1.5em) / 2);
            font-weight: normal;
            color: #696969;
          }
        `}</style>
      </div>
    )
  }
}
