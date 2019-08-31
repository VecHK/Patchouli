import React from 'react'

import CategoryItem from './CategoryItem'

export default class CategoriesHeader extends React.Component {
  render() {
    const { left, right } = this.props.categories

    return <div className="category-header">
      <div className="category-list">
        <div className="middle-wrapper">
          <ul className="left-list">
            {
              left.map(category => {
                return <CategoryItem key={category._id} title={category.name} />
              })
            }
          </ul>

          <CategoryItem title="全部" highlight={true} />

          <ul className="right-list">
            {
              right.map(category => {
                return <CategoryItem key={category._id} title={category.name} />
              })
            }
          </ul>
        </div>
      </div>

      <div className="page-shadow"></div>

      <style jsx>{`
        .category-list {
          display: flex;
          align-items: center;
          align-content: center;
          justify-content: center;
        }

        .middle-wrapper {
          position: relative;
        }

        .category-header ul {
          padding: 0;
          margin: 0;
        }

        .left-list, .right-list {
          display: flex;
          position: absolute;
          top: 0;

          white-space: nowrap;
        }

        .left-list {
          right: 100%;
        }

        .right-list {
          left: 100%;
        }

        .page-shadow {
          z-index: 3000;
          position: fixed;
          left: -5%;
          top: -32px;
          width: calc(110%);
          height: 32px;
          box-shadow: 0px 0px 12px #999;
        }
      `}</style>
    </div>
  }
}
