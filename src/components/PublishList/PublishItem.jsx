import React from 'react'

import BelowCheckoutBlockStyle from './BelowCheckoutBlock.module.css'
import BelowCheckoutBlock from './BelowCheckoutBlock'
import SideCategoryPillar from './SideCategoryPillar'

function formatTime(jsonDate) {
  const date = new Date(jsonDate)
  return date.toLocaleDateString()
}

export default class PublishItem extends React.Component {
  state = {
    startX: null,
    startY: null,
    currentX: null,
    currentY: null,
    isDrag: false,
    isHorizonalGesture: undefined,
    checkoutBlockWidth: 0
  }

  getBoundingClientRect() {
    return this.rootRef.current ? this.rootRef.current.getBoundingClientRect() : {}
  }

  componentDidMount() {
    this.clientRect = this.getBoundingClientRect()
  }

  constructor(props) {
    super(props)

    this.rootRef = React.createRef()
  }

  getTouch(e) {
    const { touches } = e
    if (touches.length !== 1) {
      return null
    }

    const [ touch ] = touches

    const { clientX: x, clientY: y } = touch

    return { x, y }
  }

  getTouchDiff(state = this.state) {
    const { currentX, currentY, startX, startY } = state

    return {
      x: currentX - startX,
      y: currentY - startY
    }
  }

  onTouchStart = e => {
    const { openSide, onTouchStart } = this.props
    if (openSide) {
      return
    }

    onTouchStart && onTouchStart()

    const touch = this.getTouch(e)
    if (!touch) {
      return
    }

    const { x, y } = touch

    this.setState({
      isDrag: true,
      startX: x,
      startY: y,
      currentX: x,
      currentY: y
    })
  }

  onTouchMove = e => {
    const {
      isDrag,
      startX, startY
    } = this.state

    if (!isDrag) {
      return
    }

    if ((this.state.isHorizonalGesture !== undefined) && !this.state.isHorizonalGesture) {
      return
    }

    const { x: currentX, y: currentY } = this.getTouch(e)

    let { isHorizonalGesture } = this.state

    if (isHorizonalGesture === undefined) {
      const diffX = currentX - startX
      const diffY = currentY - startY
      isHorizonalGesture = Math.abs(diffX) > Math.abs(diffY)

      // 若不是横向滑动则退出
      if (!isHorizonalGesture) {
        return this.setState({ isHorizonalGesture })
      }
    }

    e.preventDefault()

    this.setState({
      isDrag: true,
      isHorizonalGesture,
      currentX,
      currentY
    })
  }

  touchTerminal = () => {
    const { onActive, onClearActive } = this.props
    const { x: diffX, y: diffY } = this.getTouchDiff()

    if (!diffX && !diffY) {
      onClearActive && onClearActive()
    } else {
      const { checkoutBlockWidth } = this.state

      if (diffX >= checkoutBlockWidth) {
        onActive && onActive()
      }
    }

    this.setState({
      isDrag: false,
      isHorizonalGesture: undefined
    })
  }

  onTouchEnd = () => {
    this.touchTerminal()
  }

  onTouchCancel = () => {
    console.log('onTouchCancel')
    this.touchTerminal()
  }

  render() {
    const { isDrag, checkoutBlockWidth } = this.state
    const { publish:pub, openSide } = this.props

    let high = ''

    if (openSide) {
      high = 'open'
    }

    const { x: diffX } = this.getTouchDiff()

    const rangePercent = diffX / checkoutBlockWidth

    return <li
      ref={ this.rootRef }
      onTouchStart={ this.onTouchStart }
      onTouchMove={ this.onTouchMove }
      onTouchEnd={ this.onTouchEnd }
      onTouchCancel={ this.onTouchCancel }
      className={`publish-item-wrapper ${high} ${isDrag ? 'is-touch' : ''}`}
      style={(() => {
        if (!isDrag) {
          return {}
        }
        return { borderColor: `rgba(208, 208, 208, ${rangePercent})` }
      })()}
    >
      <BelowCheckoutBlock
        openSide={ openSide }
        onUpdateWidth={checkoutBlockWidth => {
          this.setState({
            checkoutBlockWidth
          })
        }}
      />

      <div
        className="publish-item-slider"
        style={{
          transform: do {
            if (!isDrag) {
              return ''
            }
            return `translateX(${diffX}px) translateX(${BelowCheckoutBlockStyle.displayPillarOffset})`
          }
        }}
      >
        <div className="publish-item">
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

          <SideCategoryPillar
            fusionColor={pub.fusion_color}
          />
        </div>
      </div>

      <style jsx>{`
        .publish-item-wrapper:not(.is-touch) {
          transition: border-color 382ms;
        }

        .publish-item-wrapper {
          box-sizing: border-box;
          border-top: solid 1px white;
          border-bottom: solid 1px white;
          background-color: rgb(232,232,232);
          position: relative;
        }

        .publish-item-wrapper.open {
          border-color: rgb(208, 208, 208);
        }

        .publish-item-slider {
          position: relative;

          transform: translateX(${BelowCheckoutBlockStyle.displayPillarOffset});
        }

        .publish-item-wrapper:not(.is-touch) .publish-item-slider {
          transition: transform 382ms;
        }

        .publish-item-wrapper.open .publish-item-slider {
          transform: translateX(${checkoutBlockWidth}px);
        }

        .publish-item {
          box-sizing: border-box;
          padding: 1.25em 0;
          width: calc(100% - ${BelowCheckoutBlockStyle.displayPillarOffset} / 2);
          padding-right: calc(${BelowCheckoutBlockStyle.displayPillarOffset} / 2);
          text-align: center;
          flex-grow: 2;

          background-color: white;
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
