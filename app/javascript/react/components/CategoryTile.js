import React from 'react'

const CategoryTile = (props) => {

  let items = props.value.map((item) => {
    return(<li key={item.id}>{item.item_name}</li>)
  })

  return(
    <div className="callout">
      <h4>{props.name}</h4>
      <ul>
        {items}
      </ul>
    </div>
  )
}

export default CategoryTile
