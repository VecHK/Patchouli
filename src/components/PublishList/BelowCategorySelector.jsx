import React from 'react'

import { observer } from 'mobx-react'
import store from 'store'

@observer
class BelowCategorySelector extends React.Component {
  getSerialCategories() {
    const { categories } = store

    return [...categories.left, ...categories.right].filter(category => {
      return category.type === 'category'
    })
  }

  render() {
    return (
      <div className="below-category-selector">
        category-selector
      </div>
    )
  }
}

export default BelowCategorySelector
