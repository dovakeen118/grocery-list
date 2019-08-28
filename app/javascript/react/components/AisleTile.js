import React from 'react'

const AisleTile = (props) => {
  let selectedItems = props.selectedItems
  let iconClass;

  let items = props.value.map((item) => {
    if(selectedItems.includes(item)) {
      iconClass = "fa fa-check-square fa-2x"
    } else {
      iconClass = "fa fa-plus-square fa-2x"
    }
    return(
      <div key={item.id}>
        <i className={iconClass}
          onClick={ () => {props.addSelectedItems({ item }) } }>
        </i>

        <p>{item.quantity} {item.measurement} - {item.item_name}</p>

        <hr/>
      </div>
    )
  })

  return(
    <div className="callout shopping-items">
      <h3>{props.name}</h3>
      {items}
    </div>
  )
}

export default AisleTile
