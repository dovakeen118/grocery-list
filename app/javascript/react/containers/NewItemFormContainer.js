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

  handleClearForm() {
    this.setState({ newItem: "", quantity: "1", measurement: "", category: "" })
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
        measurement: this.state.measurement
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

    let quantities = [
      "Can(s)",
      "Cup(s)",
      "Dozen",
      "Gallon(s)",
      "Ounce(s)",
      "Package(s)",
      "Pint(s)",
      "Pound(s)",
      "Quart(s)"
    ]

    let categoryOptions = categories.map((category) => {
      return(<option key={category} value={category}>{category}</option>)
    })

    let quantityOptions = quantities.map((quantity) => {
      return(<option key={quantity} value={quantity}>{quantity}</option>)
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
                {quantityOptions}
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
