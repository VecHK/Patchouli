import React from 'react'
import { Transition } from "react-transition-group"

import style from './CheckoutBlock.module.css'
import CategorySelector from './CategorySelector'

export default class CheckoutBlock extends React.Component {
  state = {
    selectCategoryMode: false,
    selectorWidth: 0,
  }

  getBoundingClientRect() {
    return this.rootRef.current ? this.rootRef.current.getBoundingClientRect() : {}
  }

  constructor(props) {
    super(props)

    this.rootRef = React.createRef()
    this.selectorRef = React.createRef()
  }

  getWidth() {
    const { selectCategoryMode, selectorWidth } = this.state
    const rect = this.getBoundingClientRect()

    const width = rect.width || 0

    if (selectCategoryMode) {
      return width + selectorWidth
    } else {
      return width
    }
  }

  triggerUpdateWidth() {
    const { onUpdateWidth } = this.props
    onUpdateWidth && onUpdateWidth(this.getWidth())
  }

  componentDidUpdate(prevProps, prevState) {
    const { props, state } = this

    if (!props.openSide && state.selectCategoryMode) {
      this.setState({
        selectCategoryMode: false
      })
    }
  }

  componentDidMount() {
    this.triggerUpdateWidth()
  }

  pillarMouseEnter = () => {
    clearTimeout(this._pillarHandle)

    if (this.state.selectCategoryMode) {
      return
    }

    this._pillarHandle = setTimeout(() => {
      this.setState({
        selectCategoryMode: true
      })
    }, 200)
  }

  pillarMouseLeave = () => {
    clearTimeout(this._pillarHandle)
  }

  render() {
    const { selectCategoryMode } = this.state

    return (
      <div ref={ this.rootRef } className="checkout-block">
        <div className="body">check</div>
        <div className="category-pillar">
          <div
            className="current"
            onMouseEnter={ this.pillarMouseEnter }
            onMouseLeave={ this.pillarMouseLeave }
          ></div>
          <div className="category-selector-wrapper">
            <Transition in={ selectCategoryMode } timeout={ 382 }>
              {
                state => <CategorySelector
                  ref={ this.selectorRef }
                  transitionState={ state }
                  transitionTiming={ 382 }
                  onUpdateWidth={selectorWidth => {
                    this.setState({
                      selectorWidth
                    })
                    this.triggerUpdateWidth()
                  }}
                />
              }
            </Transition>
          </div>
        </div>

        <style jsx>{`
          .checkout-block {
            position: absolute;
            top: 0;
            left: calc(-${style.width});

            display: flex;
            align-items: center;
            align-content: center;
            justify-content: center;

            height: 100%;
            width: ${style.width};
            background: rgb(232, 232, 232);
            text-shadow: 0px 0.8px 0px #f5f5f5;

            box-shadow:
              inset 0px 2px 2px -2px #AAA,
              inset 0px -2px 1px -2px #AAA,
              inset -2px 0px 2px -2px #AAA;

            border-right: solid 1px rgb(208, 208, 208);
          }

          .body {
            flex-grow: 2;
          }

          .category-pillar {
            position: relative;
            width: ${style.categoryPillarWidth};
            min-width: ${style.categoryPillarWidth};
            height: 100%;
            background-color: #CCC;
          }

          .category-pillar .current {
            width: 100%;
            height: 100%;
          }

          .category-pillar .category-selector-wrapper {
            position: absolute;
            left: 100%;
            top: 0;
            height: 100%;
          }
        `}
        </style>
      </div>
    )
  }
}
