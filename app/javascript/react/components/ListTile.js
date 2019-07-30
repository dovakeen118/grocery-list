import React from 'react'
import { Link } from 'react-router-dom'

const ListTile = (props) => {

  return (
    <h3>
      <Link to={`/lists/${props.id}`}>{props.name}</Link>
    </h3>
  )
}

export default ListTile
