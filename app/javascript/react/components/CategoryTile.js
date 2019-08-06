import React from 'react'

const CategoryTile = (props) => {

  let items = props.value.map((item) => {
    return(
      <li key={item.id}>
        {item.quantity} {item.measurement} - {item.item_name}
        <i onClick={props.handleItemEdit} className="fa fa-edit"></i>
      </li>
    )
  })

  return(
    <div className={`callout items ${props.name}`}>
      <h1>{props.name}</h1>
      <ul>
        {items}
      </ul>
    </div>
  )
}

export default CategoryTile
