import React from 'react'

import PublishItem from './PublishItem'

export default class PublishList extends React.Component {
  componentDidMount() {
    console.warn('Publishes', this.itemsRef)
  }

  state = {
    openSide: false,
    pageY: null
  }

  handleMouseMove = (e) => {
    if (e.pageX > 100) {
      this.setState({
        openSide: false
      })

      return
    }

    this.setState({
      openSide: true,
      pageY: e.pageY
    })
  }

  render() {
    const { list } = this.props

    return (
      <div
        className="publish-list"
        onMouseMove={ this.handleMouseMove }
      >
        {
          list.map((pub, index) => {
            return <PublishItem
              key={ pub.id }
              publish={ pub }
              openSide={ this.state.openSide }
              pageY={ this.state.pageY }
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
