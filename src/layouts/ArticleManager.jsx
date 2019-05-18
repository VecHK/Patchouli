import React, { Component } from 'react'

export default class ArticleManager extends Component {
  state = {
  }

  render() {
    return <div className={ `article-manager ${this.props.transitionState}` }>
      <div>
        <div className="title">Patchouli</div>
        <div className="summary">next Generation Blog Manager</div>
      </div>

      <style jsx>{`
        .article-manager {
          display: flex;
          align-items: center;
          align-content: center;
          justify-content: center;

          width: 100vw;
          height: 100vh;

          text-align: center;
          color: #3a3a45;

          animation-fill-mode: forwards;
          animation-timing-function: ease-out;
          transform-origin: center center;

          background-color: white;
          box-shadow: 0px 10px 20px #CCC;

          /* box-shadow: 0 0 2px #999; */
        }

        .title {
          font-size: 96px;
          font-family: Botera TFE;

          -webkit-text-stroke: 0.5px #CCC;
          color: #EEE;
          text-shadow: 0px -1px 0.5px #AAA;
        }

        .summary {
          font-size: 20px;
          color: slategray;
          font-family: fantasy;
        }

        @keyframes fadeIn {
          from {
            transform: scale(0.618);
          }

          to {
            transform: scale(1);
          }
        }

        @keyframes fadeOut {
          from {
            transform: scale(1);
          }

          to {
            transform: scale(0.618);
          }
        }

        .article-manager.exited {
          transform: scale(0.618);
        }

        .article-manager.entering {
          animation-name: fadeIn;
          animation-duration: ${ this.props.transitionTiming }ms;
          transition-timing-function: cubic-bezier(0.4, 0, 0.5, 1);
        }
        .article-manager.entered {
          /* opacity: 1; */
          transform: scale(1);
        }
        .article-manager.exiting {
          animation-name: fadeOut;
          animation-duration: ${ this.props.transitionTiming }ms;
        }
      `}</style>
    </div>
  }
}
