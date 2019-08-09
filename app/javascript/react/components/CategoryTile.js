import React from 'react'

const CategoryTile = (props) => {
  let aisleLocation;

  let items = props.value.map((item) => {
    if(item.aisle.length > 0) {
      aisleLocation = ` - ${item.aisle}`
    }
    return(
      <p key={item.id}>
        <i className="fa fa-caret-right"></i>
        {item.quantity} {item.measurement} - {item.item_name} {aisleLocation}

        <i className="fa fa-edit"
          onClick={ () => { props.toggleItemEdit({ item  }) } }
          data-tooltip tabIndex="1"
          title={`Edit ${item.item_name}`}
          data-position="bottom"
          data-alignment="right">
        </i>

        <i className="fa fa-minus-square"
          onClick={ () => { props.confirmItemDelete({ item }) } }
          data-tooltip tabIndex="1"
          title={`Delete ${item.item_name}`}
          data-position="bottom"
          data-alignment="right">
        </i>
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
