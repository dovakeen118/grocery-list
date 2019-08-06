import React from 'react'

const CategoryTile = (props) => {

  let items = props.value.map((item) => {
    return(
      <p key={item.id}>
        <i className="fa fa-caret-right"></i>
        {item.quantity} {item.measurement} - {item.item_name}

        <i className="fa fa-edit"
          onClick={ () => { props.toggleItemEdit({ item  }) } }
          data-tooltip tabIndex="1"
          title={`Edit ${item.item_name}`}
          data-position="bottom"
          data-alignment="right">
        </i>

        <i className="fa fa-minus-square"></i>
      </p>
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
