import React from 'react'
import { Link } from 'react-router-dom'

const ListTile = (props) => {

  return (
    <h1>
      <Link to={`/lists/${props.id}`}>{props.name}</Link>
    </h1>
  )
}

export default ListTile
