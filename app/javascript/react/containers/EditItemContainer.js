import React from 'react'
import NumericInput from 'react-numeric-input'

import TextField from '../components/TextField'

class EditItemContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      listId: "",
      itemId: "",
      itemName: "",
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

  componentDidMount() {
    this.setState({
      listId: this.props.item.list_id,
      itemId: this.props.item.id,
      itemName: this.props.item.item_name,
      category: this.props.item.category,
      quantity: this.props.item.quantity,
      measurement: this.props.item.measurement,
      aisle: this.props.item.aisle
    })
  }

  validateNameChange(input) {
    if(input.trim() == '') {
      let newError = { itemName: "You must enter a item name"}
      this.setState({ errors: Object.assign({}, this.state.errors, newError) })
      return false
    } else {
      let errorState = this.state.errors
      delete errorState.itemName
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
    this.setState({ itemName: "", quantity: "1", measurement: "", category: "", aisle: "" })
  }

  handleSubmit(event) {
    event.preventDefault();
    if(
      this.validateNameChange(this.state.itemName) &&
      this.validateCategoryChange(this.state.category)
    ) {
      let updatedItemObject = {
        list_id: this.state.listId,
        item_id: this.state.itemId,
        item_name: this.state.itemName,
        category: this.state.category,
        quantity: this.state.quantity,
        measurement: this.state.measurement,
        aisle: this.state.aisle
      }
      this.props.handleUpdateItem(updatedItemObject)
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
        <h2>Edit item</h2>
        <form onSubmit={this.handleSubmit}>

          {errorDiv}

          <TextField
            label="Item Name *"
            name="itemName"
            value={this.state.itemName}
            handleChange={this.handleChange}
          />

          <label>Item Category *
            <select value={this.state.category} onChange={this.handleCategoryChange}>
              <option>Please select a category</option>
              {categoryOptions}
            </select>
          </label>

          <div className="aisle">
            <label>Item Aisle or Location
              <select value={this.state.aisle} onChange={this.handleAisleChange}>
                <option>Optional</option>
                {aisleOptions}
              </select>
            </label>
          </div>

          <div className="quantity-measurement">
            <div className="quantity">
              <label>Item Quantity
                <NumericInput
                  className="form-control"
                  min={1}
                  max={50}
                  step={0.5}
                  value={this.state.quantity}
                  onChange={this.handleQuantityChange}
                />
              </label>
            </div>

            <div className="measurement">
              <label>Quantity Measurement
                <select value={this.state.measurement} onChange={this.handleMeasurementChange}>
                  <option>Optional</option>
                  {measurementOptions}
                </select>
              </label>
            </div>
          </div>

          <p>* Required</p>

          <input className="button update" type="submit" value="Update" />
        </form>
      </div>
    )
  }
}

export default EditItemContainer
