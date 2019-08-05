import React from 'react'
import { Link } from 'react-router-dom'

const ListTile = (props) => {
  let editClass;
  let editMessage;

  if(props.editState && props.editList.id === props.id) {
    editClass = "edit-list"
    editMessage = " - Edit list in form . . ."
  }

  return (
    <h3>
      <i className="fa fa-caret-right"></i>
      <Link to={`/lists/${props.id}`} className={editClass}>{props.name} {editMessage}</Link>
      <i onClick={() => { props.toggleListEdit({ id: props.id, name: props.name,  }) } } className="fa fa-edit"></i>
      <hr/>
    </h3>
  )
}

export default ListTile
