import React from 'react'

import TextField from '../components/TextField'

class EditListContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      listName: "",
      listId: "",
      errors: {}
    }
    this.validateNameChange = this.validateNameChange.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.setState({ listName: this.props.list.name })
    this.setState({ listId: this.props.list.id })
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
      let updatedListObject = {
        list_name: this.state.listName,
        list_id: this.state.listId
      }
      this.props.handleUpdateList(updatedListObject)
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
        <h2 className="edit-list">Edit Grocery List</h2>

        <form onSubmit={this.handleSubmit}>

          {errorDiv}

          <TextField
            label="List Name"
            name="listName"
            value={this.state.listName}
            handleChange={this.handleChange}
          />

          <input className="button update" type="submit" value="Update" />
        </form>
      </div>
    )
  }
}

export default EditListContainer
