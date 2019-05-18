import React, { Component } from 'react'

export default class LoginBox extends Component {
  state = {
  }

  render() {
    return <div className={ `box ${this.props.transitionState}` }>
      <div className="up-side-wrapper">
        <div className="up-side">up-side</div>
      </div>
      <div className="down-side-wrapper">
        <div className="down-side">down-side</div>
      </div>

      <style jsx>{`
        .box {
          transition: color 618ms, background-color 618ms;
          position: fixed;
          left: 0;
          top: 0;
          width: 100vw;
          height: 100vw;

          z-index: 1;
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
        }

        .exited .up-side {
          transform: rotateX(-90deg);
        }

        .exiting .up-side {
          animation-name: up_side_exit;
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
        }

        .exited .down-side {
          transform: rotateX(90deg);
        }

        .exiting .down-side {
          animation-name: down_side_exit;
        }

        .up-side, .down-side {
          animation-fill-mode: forwards;
          animation-timing-function: ease-out;
          animation-duration: ${ this.props.transitionTiming }ms;

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
