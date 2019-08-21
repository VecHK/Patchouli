import React from 'react'

import CheckoutBlockStyle from './CheckoutBlock.module.css'
import CheckoutBlock from './CheckoutBlock'

function formatTime(jsonDate) {
  const date = new Date(jsonDate)
  return date.toLocaleDateString()
}

export default class PublishItem extends React.Component {
  componentDidMount() {
    console.warn('componentDidMount', this.rootRef)
  }

  componentWillUnmount() {

  }

  getBoundingClientRect() {
    return this.rootRef.current ? this.rootRef.current.getBoundingClientRect() : {}
  }

  constructor(props) {
    super(props)

    this.rootRef = React.createRef()
  }

  render() {
    const { publish:pub, openSide, pageY } = this.props

    const { y, height } = this.getBoundingClientRect()

    let high = ''

    if (openSide) {
      if ((pageY >= y) && pageY < (y + height)) {
        high = 'open'
      }
    }

    return <li
      className={`publish-item-wrapper ${high}`}
      ref={this.rootRef}
    >
      <div className="publish-item-slider">
        <div className="publish-item" style={{ 'borderColor': pub.fusion_color }}>
          <div className="title">
            <span>{pub.title}</span>
          </div>

          <ul className="tag-list">
            {
              pub.tags.map((tag, idx) => {
                return <li key={idx}>{tag}</li>
              })
            }
          </ul>

          <time className="time">{formatTime(pub.date)}</time>
        </div>

        <CheckoutBlock />
      </div>

      <style jsx>{`
        .publish-item-wrapper {
          box-sizing: border-box;
          border-top: solid 1px transparent;
          border-bottom: solid 1px transparent;
          transition: border-color 382ms;
        }

        .publish-item-wrapper.open {
          border-color: rgb(208, 208, 208);
        }

        .publish-item-slider {
          position: relative;

          transform: translateX(0px);
          transition: transform 382ms;
        }

        .publish-item-wrapper.open .publish-item-slider {
          transform: translateX(${CheckoutBlockStyle.width});
        }

        .publish-item {
          padding: 1.25em 0;
          text-align: center;
          flex-grow: 2;

          border-left: solid 5px;
          padding-right: 5px;
        }

        .publish-item.open {
          background-color: blue;
        }

        .title {
          font-size: 1.75em;
          font-family: "Segoe UI", "Noto Sans CJK SC", "Source Han Sans", "Source Han Sans CN", "Microsoft JhengHei", DengXian, "微软雅黑", "黑体", sans-serif;
          text-decoration: blink;
          color: #464653;
        }

        .title span {
          cursor: pointer;
        }

        .time {
          font-size: 16px;
          font-family: "Segoe UI", "华文细黑", consolas, courier, Arial;
          color: rgba(70, 70, 83, 0.5);
        }

        .tag-list {
          display: flex;
          justify-content: center;
          align-items: center;
          align-content: center;
          flex-wrap: wrap;
          padding: 0;
          margin: 0;
        }

        .tag-list > li:before {
          content: '#';
          color: #999;
        }

        .tag-list > li:last-child {
          margin-right: 0;
        }

        .tag-list > li {
          display: inline-block;
          padding: 0;
          font-size: .8em;

          margin-right: 1em;

          cursor: pointer;
          color: #999;
        }
      `}</style>
    </li>
  }
}
