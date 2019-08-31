import React from 'react'

import PublishItem from './PublishItem'

export default class PublishList extends React.Component {
  componentDidMount() {
    console.warn('Publishes', this.itemsRef)
  }

  state = {
    activeIndex: -1,
    pageY: null
  }

  constructor(props) {
    super(props)

    this.itemRefs = []
  }

  handleMouseMove = (e) => {
    let activeIndex = -1

    const { pageX, pageY } = e

    const currentIndex = this.itemRefs.findIndex(ref => {
      const { y, height } = ref.clientRect

      return (pageY >= y) && pageY < (y + height)
    })

    if (currentIndex !== -1) {
      const ref = this.itemRefs[currentIndex]

      if (pageX <= ref.state.checkoutBlockWidth) {
        activeIndex = currentIndex
      }
    }

    this.setState({
      activeIndex,
      pageY
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
