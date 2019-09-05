import React from 'react'

import style from './BelowCheckoutBlock.module.css'
import BelowCategorySelector from './BelowCategorySelector'

export default class BelowCheckoutBlock extends React.Component {
  state = {
  }

  getBoundingClientRect() {
    return this.rootRef.current ? this.rootRef.current.getBoundingClientRect() : {}
  }

  constructor(props) {
    super(props)

    this.rootRef = React.createRef()
  }

  getWidth() {
    const rect = this.getBoundingClientRect()
    const width = rect.width || 0

    return width
  }

  triggerUpdateWidth() {
    const { onUpdateWidth } = this.props
    onUpdateWidth && onUpdateWidth(this.getWidth())
  }

  componentDidMount() {
    this.triggerUpdateWidth()
  }

  render() {
    return (
      <div
        ref={ this.rootRef }
        className="below-checkout-block"
      >
        <div className="checkout-area">below</div>

        <BelowCategorySelector />

        <style jsx>{`
          .below-checkout-block {
            box-sizing: border-box;
            position: absolute;
            left: 0;
            top: 0;
            height: 100%;
            min-width: ${style.width};
            padding-right: ${style.categoryPillarWidth};

            display: flex;
            align-items: center;
            align-content: center;
            justify-content: space-between;
          }
        `}</style>
      </div>
    )
  }
}
