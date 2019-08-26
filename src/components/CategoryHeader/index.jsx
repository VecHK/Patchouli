import React from 'react'

function CategoryItem(props) {
  const {
    title,
    highlight,
    href = '',
    onClick = e => {
      e.preventDefault()
    }
  } = props

  return <a
    className={`category-item ${highlight ? 'highlight' : ''}`}
    href={href}
    onClick={onClick}
  >
    { title }
    <style jsx>{`
      .category-item {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        align-content: center;

        margin: 0em .382em 0em;
        padding: 0.1em .618em;
        min-height: 1.5em;
        line-height: 1.5em;

        font-size: 16px;
        text-decoration: none;

        font-family: Arial, "Noto Sans CJK SC", "Source Han Sans", "Source Han Sans CN", "Helvetica Neue", Helvetica, "Han Heiti", "微软雅黑", "黑体", sans-serif;

        /* font-weight: 300; */
        background: transparent;
        color: grey;
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
      }

      .category-item.highlight {
        z-index: 10;
        /* padding: 0 .618em;
        padding-top: .1em;
        padding-bottom: .1em;
        margin: 0em calc(.618em / 2) 0em; */

        background: #3a3a45;
        color: azure;
        box-shadow: 0px 0px 1px #3a3a45;

        font-weight: bolder;
        transition: box-shadow 0.618s;
      }
    `}</style>
  </a>
}

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
