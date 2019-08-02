import React from 'react'

const TextField = (props) => {

  return (
    <label>{props.label}
      <input
        type="text"
        name={props.name}
        value={props.value}
        onChange={props.handleChange}
      />
    </label>
  )
}

export default TextField
