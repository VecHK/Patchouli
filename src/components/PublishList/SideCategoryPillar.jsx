import React from 'react'

import BelowCheckoutBlockStyle from './BelowCheckoutBlock.module.css'

export default class SideCategoryPillar extends React.Component {
  render() {
    const { fusionColor } = this.props
    return (
      <div
        className="side-category-pillar"
        style={{ backgroundColor: fusionColor }}
      >
        <style jsx>{`
          .side-category-pillar {
            position: absolute;
            right: 100%;
            top: 0;
            width: ${BelowCheckoutBlockStyle.categoryPillarWidth};
            height: 100%;
          }
        `}</style>
      </div>
    )
  }
}
