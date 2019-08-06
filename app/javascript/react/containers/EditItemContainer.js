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
      errors: {}
    }

    this.validateNameChange = this.validateNameChange.bind(this)
    this.validateCategoryChange = this.validateCategoryChange.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleCategoryChange = this.handleCategoryChange.bind(this)
    this.handleQuantityChange = this.handleQuantityChange.bind(this)
    this.handleMeasurementChange = this.handleMeasurementChange.bind(this)
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
      measurement: this.props.item.measurement
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

  handleClearForm() {
    this.setState({ itemName: "", quantity: "1", measurement: "", category: "" })
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
        measurement: this.state.measurement
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

    let categories = [
      "Fruit",
      "Vegetables",
      "Dairy",
      "Grains",
      "White Meat/ Poultry",
      "Red Meat",
      "Seafood",
      "Legumes/ Nuts",
      "Snacks",
      "Herbs/ Seasoning/ Spices",
      "Beverages",
      "Canned Food",
      "Frozen",
      "Miscellaneous"]

    let measurements = [
      "Can",
      "Cup",
      "Dozen",
      "Gallon",
      "Ounce",
      "Package",
      "Pint",
      "Pound",
      "Quart"
    ]

    let categoryOptions = categories.map((category) => {
      return(<option key={category} value={category}>{category}</option>)
    })

    let measurementOptions = measurements.map((measurement) => {
      if(this.state.quantity > 1) {
        measurement = measurement.concat("s")
        return(<option key={measurement} value={measurement}>{measurement}</option>)
      } else {
      return(<option key={measurement} value={measurement}>{measurement}</option>)
      }
    })

    return(
      <div>
        <form onSubmit={this.handleSubmit}>

          {errorDiv}

          <TextField
            label="Item Name:"
            name="itemName"
            value={this.state.itemName}
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

          <input className="button update" type="submit" value="Update" />
        </form>
      </div>
    )
  }
}

export default EditItemContainer
