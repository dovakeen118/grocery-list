import React from 'react'

import TextField from '../components/TextField'

class NewListFormContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      listName: "",
      errors: {}
    }
    this.validateNameChange = this.validateNameChange.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  validateNameChange(input) {
    if(input.trim() == '') {
      let newError = { listName: "You must enter a list name"}
      this.setState({ errors: Object.assign({}, this.state.errors, newError) })
      return false
    } else {
      let errorState = this.state.errors
      delete errorState.listName
      this.setState({ errors: errorState })
      return true
    }
  }

  handleChange(event) {
    this.setState({ [event.target.name] : event.target.value })
  }

  handleClearForm() {
    this.setState({ listName: "" })
  }

  handleSubmit(event) {
    event.preventDefault();
    if ( this.validateNameChange(this.state.listName) ) {
      let newListObject = {
        list_name: this.state.listName
      }
      this.props.addNewList(newListObject)
      this.handleClearForm(event)
    }
  }

  render() {
    let errorDiv;
    let errorItems;

    if (Object.keys(this.state.errors).length > 0) {
      errorItems = Object.values(this.state.errors).map((error) => {
        return(<li key={error}>{error}</li>)
      })
      errorDiv = <div className="callout alert">{errorItems}</div>
    }

    return (
      <div>
        <form onSubmit={this.handleSubmit}>

          {errorDiv}

          <TextField
            label="New List Name:"
            name="listName"
            value={this.state.listName}
            handleChange={this.handleChange}
          />

          <input className="button" type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

export default NewListFormContainer
