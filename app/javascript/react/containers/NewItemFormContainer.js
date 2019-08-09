import React from 'react'
import NumericInput from 'react-numeric-input'

import TextField from '../components/TextField'

class NewItemFormContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      newItem: "",
      category: "",
      quantity: "1",
      measurement: "",
      aisle: "",
      errors: {}
    }

    this.validateNameChange = this.validateNameChange.bind(this)
    this.validateCategoryChange = this.validateCategoryChange.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleCategoryChange = this.handleCategoryChange.bind(this)
    this.handleQuantityChange = this.handleQuantityChange.bind(this)
    this.handleMeasurementChange = this.handleMeasurementChange.bind(this)
    this.handleAisleChange = this.handleAisleChange.bind(this)
    this.handleClearForm = this.handleClearForm.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  validateNameChange(input) {
    if(input.trim() == '') {
      let newError = { newItem: "You must enter a item name"}
      this.setState({ errors: Object.assign({}, this.state.errors, newError) })
      return false
    } else {
      let errorState = this.state.errors
      delete errorState.newItem
      this.setState({ errors: errorState })
      return true
    }
  }

  validateCategoryChange(input) {
    if(input == 'Please select a category' || input.trim() == '') {
      let newError = { category: "You must select a category" }
      this.setState({ errors: Object.assign({}, this.state.errors, newError) })
      return false
    } else {
      let errorState = this.state.errors
      delete errorState.category
      this.setState({ errors: errorState })
      return true
    }
  }

  handleChange(event) {
    this.setState({ [event.target.name] : event.target.value })
  }

  handleCategoryChange(event) {
    this.setState({ category: event.target.value })
  }

  handleQuantityChange(event) {
    this.setState({ quantity: event })
  }

  handleMeasurementChange(event) {
    this.setState({ measurement: event.target.value })
  }

  handleAisleChange(event) {
    this.setState({ aisle: event.target.value })
  }

  handleClearForm() {
    this.setState({ newItem: "", category: "", quantity: "1", measurement: "", aisle: "" })
  }

  handleSubmit(event) {
    event.preventDefault();
    if(
      this.validateNameChange(this.state.newItem) &&
      this.validateCategoryChange(this.state.category)
    ) {
      let newItemObject = {
        item_name: this.state.newItem,
        category: this.state.category,
        quantity: this.state.quantity,
        measurement: this.state.measurement,
        aisle: this.state.aisle
      }
      this.props.addNewItem(newItemObject)
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

    let categories = this.props.categories
    let categoryOptions = categories.map((category) => {
      return(<option key={category} value={category}>{category}</option>)
    })

    let measurements = this.props.measurements
    let measurementOptions = measurements.map((measurement) => {
      if(this.state.quantity > 1) {
        measurement = measurement.concat("s")
        return(<option key={measurement} value={measurement}>{measurement}</option>)
      } else {
        return(<option key={measurement} value={measurement}>{measurement}</option>)
      }
    })

    let aisles = this.props.aisles
    let aisleOptions = aisles.map((aisle) => {
      return(<option key={aisle} value={aisle}>{aisle}</option>)
    })

    return(
      <div>
        <form onSubmit={this.handleSubmit}>

          {errorDiv}

          <TextField
            label="Item Name:"
            name="newItem"
            value={this.state.newItem}
            handleChange={this.handleChange}
          />

          <label>Item Category:
            <select value={this.state.category} onChange={this.handleCategoryChange}>
              <option>Please select a category</option>
              {categoryOptions}
            </select>
          </label>

          <div className="quantity">
            <label>Item Quantity:
              <NumericInput
                className="form-control"
                min={1}
                max={50}
                value={this.state.quantity}
                onChange={this.handleQuantityChange}
              />
            </label>
          </div>

          <div className="measurement">
            <label>Quantity Measurement:
              <select value={this.state.measurement} onChange={this.handleMeasurementChange}>
                <option>Optional</option>
                {measurementOptions}
              </select>
            </label>
          </div>

          <div className="aisle">
            <label>Item Aisle or Location:
              <select value={this.state.aisle} onChange={this.handleAisleChange}>
                <option>Optional</option>
                {aisleOptions}
              </select>
            </label>
          </div>

          <input className="button" type="submit" value="Add New item" />
        </form>
      </div>
    )
  }
}

export default NewItemFormContainer
