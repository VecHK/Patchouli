import React from 'react'

export default function CategoryItem(props) {
  const {
    title,
    highlight,
    href = '',
    onClick = e => {
      e.preventDefault()
    }
  } = props

  return <div className={`category-item-wrapper ${highlight ? 'highlight' : ''}`}>
    <a
      className="category-item"
      href={href}
      onClick={onClick}
    >
      { title }
    </a>

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

      .highlight .category-item {
        z-index: 10;

        background: #3a3a45;
        color: azure;
        box-shadow: 0px 0px 1px #3a3a45;

        font-weight: bolder;
        transition: box-shadow 0.618s;
      }
    `}</style>
  </div>
}
