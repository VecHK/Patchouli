import React from 'react'
import { observer } from 'mobx-react'
import store from 'store'

@observer
class CategorySelector extends React.Component {
  getBoundingClientRect() {
    return this.rootRef.current ? this.rootRef.current.getBoundingClientRect() : {}
  }

  getWidth() {
    const rect = this.getBoundingClientRect()
    return rect.width
  }

  triggerUpdateWidth() {
    const { onUpdateWidth } = this.props
    onUpdateWidth && onUpdateWidth(this.getWidth())
  }

  componentDidMount() {
    this.triggerUpdateWidth()
  }

  constructor(props) {
    super(props)

    this.rootRef = React.createRef()
  }

  getSerialCategories() {
    const { categories } = store

    return [...categories.left, ...categories.right].filter(category => {
      return category.type === 'category'
    })
  }

  componentDidUpdate(prevProps) {
    if ((prevProps.transitionState === 'entering') && (this.props.transitionState === 'entered')) {
      this.triggerUpdateWidth()
    }
  }

  render() {
    const { transitionState, transitionTiming } = this.props

    return (
      <div
        ref={ this.rootRef }
        className={['category-selector', transitionState].join(' ')}
      >
        {
          this.getSerialCategories().map(category => {
            return <div
              key={ category._id }
              className="category"
              style={{ backgroundColor: category.color }}
            ></div>
          })
        }

        <style jsx>{`
          @keyframes animateIn {
            0% {
              opacity: 0;
            }
            100% {
              opacity: 1;
            }
          }

          @keyframes animateOut {
            0% {
              opacity: 1;
            }
            100% {
              opacity: 0;
            }
          }

          .category-selector.entering {
            animation-name: animateIn;
            opacity: 1;
          }

          .category-selector.entered {
            opacity: 1;
          }

          .category-selector.exiting {
            animation-name: animateOut;
            opacity: 0;
          }

          .category-selector.exited {
            display: none;
            opacity: 0;
          }

          .category-selector {
            animation-duration: ${ transitionTiming }ms;

            display: flex;
            align-items: flex-start;
            align-content: flex-start;
            justify-content: center;
            flex-direction: column;

            height: 100%;
          }

          .category:first-child {
            margin-top: 0;
          }

          .category {
            width: 50px;
            height: 20px;
            margin-top: 10px;
          }
        `}</style>
      </div>
    )
  }
}

export default CategorySelector
