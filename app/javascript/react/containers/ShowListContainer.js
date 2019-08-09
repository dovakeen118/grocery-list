import React from 'react'

import CategoryContainer from '../containers/CategoryContainer'
import ShoppingContainer from '../containers/ShoppingContainer'

class ShowListContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      shopping: false
    }

    this.toggleListView = this.toggleListView.bind(this)
  }

  toggleListView() {
    let shopping = this.state.shopping
    this.setState({ shopping: !shopping })
  }

  render() {
    const categories = [
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
    const measurements = [
      "Box",
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
    let aisleLocations = ["Produce", "Dairy", "Deli", "Freezer", "Miscellaneous"]
    let aisleNumbers = Array.from(Array(30).keys())
    aisleNumbers.shift()
    aisleNumbers = aisleNumbers.map((num) => {
      return(`Aisle ${num}`)
    })
    const aisles = aisleLocations.concat(aisleNumbers)

    let params = this.props.match.params.id

    let display;
    if(this.state.shopping) {
      display = (
        <ShoppingContainer
          params={params}
          aisles={aisles}
          toggleListView={this.toggleListView}
        />
      )
    } else {
      display = (
        <CategoryContainer
          params={params}
          categories={categories}
          measurements={measurements}
          aisles={aisles}
          toggleListView={this.toggleListView}
        />
      )
    }

    return(
      <div className="list-show">

        {display}

      </div>
    )
  }
}

export default ShowListContainer
