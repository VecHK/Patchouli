import React from 'react'

import Context from '../../layouts/ArticleManager/context'

import PublishItem from './PublishItem'

export default class PublishList extends React.Component {
  static contextType = Context

  state = {
    activeIndex: 0
  }

  constructor(props) {
    super(props)

    this.itemRefs = []
  }

  handleMouseMove = (e) => {
    let activeIndex = -1

    const { clientX, clientY } = e
    const { scrollTop } = this.context

    const currentIndex = this.itemRefs.findIndex(ref => {
      const { offsetTop } = ref.rootRef.current
      const { height } = ref.clientRect

      const y = scrollTop + clientY

      return (y >= offsetTop) && y < (offsetTop + height)
    })

    if (currentIndex !== -1) {
      const ref = this.itemRefs[currentIndex]

      if (clientX <= ref.state.checkoutBlockWidth) {
        activeIndex = currentIndex
      }
    }

    this.setState({
      activeIndex
    })
  }

  render() {
    const { list } = this.props
    const { activeIndex } = this.state

    return (
      <div
        className="publish-list"
        onMouseMove={ this.handleMouseMove }
      >
        {
          list.map((pub, index) => {
            return <PublishItem
              key={ pub.id }
              ref={ref => {
                this.itemRefs[index] = ref
              }}
              publish={ pub }
              openSide={ activeIndex === index }
              onActive={() => {
                this.setState({
                  activeIndex: index
                })
              }}
              onClearActive={() => {
                this.setState({
                  activeIndex: -1
                })
              }}
              onTouchStart={() => {
                if (activeIndex !== index) {
                  this.setState({
                    activeIndex: -1
                  })
                }
              }}
            />
          })
        }

        <style jsx>{`
          .publish-list {
            list-style: none;
            list-style-type: none;
          }

          .publish-list > :global(.publish-item-wrapper):first-child {
            margin-top: 0;
          }

          .publish-list > :global(.publish-item-wrapper):last-child {
            margin-bottom: 0;
          }
        `}</style>
      </div>
    )
  }
}
