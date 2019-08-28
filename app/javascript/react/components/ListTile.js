import React from 'react'
import { Link } from 'react-router-dom'

const ListTile = (props) => {

  let editClass;
  let editMessage;

  if(props.editState && props.editList.id === props.id) {
    editClass = "edit-list"
    editMessage = " - Update list in form . . ."
  }

  return (
    <div>
      <i className="fa fa-caret-right fa-2x"></i>

      <h3>
        <Link to={`/lists/${props.id}`} className={editClass}>
          {props.name} {editMessage}
        </Link>
      </h3>

      <i className="fa fa-edit fa-2x"
        onClick={ () => { props.toggleListEdit({ id: props.id, name: props.name  }) } }
        data-tooltip tabIndex="1"
        title={`Edit ${props.name}`}
        data-position="bottom"
        data-alignment="right">
      </i>

      <i className="fa fa-minus-square fa-2x"
        onClick={ () => { props.confirmListDelete({ props }) } }
        data-tooltip tabIndex="1"
        title={`Delete ${props.name}`}
        data-position="bottom"
        data-alignment="right">
      </i>
      <hr/>
    </div>
  )
}

export default ListTile
