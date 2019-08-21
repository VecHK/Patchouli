import React, { Component } from 'react'
import { observer } from 'mobx-react'
import store from 'store'

import { fetchPublishes } from 'api/publish'

import PublishList from 'components/PublishList'

@observer
class ArticleManager extends Component {
  state = {
  }

  handleClickLogout = () => {
    store.token = null
    store.isLogin = false
  }

  componentDidMount() {
    fetchPublishes(1).then(res => {
      store.publishList = res.list
    })
  }

  render() {
    return <div className={ `article-manager-wrapper ${ this.props.transitionState }` }>
      <div className="article-manager">
        <PublishList list={ this.props.store.publishList }></PublishList>
      </div>

      <div className="black-mask"></div>

      <style jsx>{`
        .article-manager-wrapper {
          width: 100vw;
          height: 100vh;
          position: relative;
          background-color: #e8e8e8;
        }

        .article-manager {
          width: 100%;
          height: 100%;

          overflow-y: scroll;

          animation-fill-mode: forwards;
          animation-timing-function: ease-out;
          transform-origin: center center;

          background-color: white;
          box-shadow: 0px 10px 20px #CCC;
        }

        .black-mask {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          /* background-color: rgba(0, 0, 0, 0.618); */
        }

        @keyframes maskFadeIn {
          from {
            background-color: rgba(0, 0, 0, 0.3);
          }

          to {
            background-color: rgba(0, 0, 0, 0);
          }
        }

        @keyframes maskFadeOut {
          from {
            background-color: rgba(0, 0, 0, 0);
          }

          to {
            background-color: rgba(0, 0, 0, 0.3);
          }
        }

        .entering .black-mask {
          /* display: none; */
          animation-name: maskFadeIn;
          animation-duration: ${ this.props.transitionTiming }ms;
          transition-timing-function: cubic-bezier(0.4, 0, 0.5, 1);
        }

        .entered .black-mask {
          display: none;
        }

        .exiting .black-mask {
          /* display: none; */
          animation-name: maskFadeOut;
          animation-duration: ${ this.props.transitionTiming }ms;
        }

        .exited .black-mask {
          display: none;
        }

        @keyframes fadeIn {
          from {
            transform: scale(0.8);
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
            transform: scale(0.8);
          }
        }

        .exited .article-manager {
          transform: scale(0.8);
        }

        .entering .article-manager {
          animation-delay: 900ms;
          animation-name: fadeIn;
          animation-duration: ${ this.props.transitionTiming - 900 }ms;
          animation-timing-function: cubic-bezier(.35,.64,.32,1);

          transform: scale(0.8);
        }

        .entered .article-manager {
          /* opacity: 1; */
          transform: scale(1);
        }

        .exiting .article-manager {
          animation-name: fadeOut;
          animation-duration: ${ this.props.transitionTiming }ms;
        }
      `}</style>
    </div>
  }
}

export default ArticleManager
