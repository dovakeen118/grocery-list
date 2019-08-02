import React from 'react'

import NewItemFormContainer from '../containers/NewItemFormContainer'
import CategoryTile from '../components/CategoryTile'

class ShowListContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedList: "",
      items: []
    }

    this.addNewItem = this.addNewItem.bind(this)
  }

  componentDidMount() {
    fetch(`/api/v1/lists/${this.props.match.params.id}`)
    .then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
        error = new Error(errorMessage);
        throw(error)
      }
    })
    .then((responseBody) => {
      this.setState({ selectedList: responseBody.list.list_name })
      this.setState({ items: responseBody.items })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  addNewItem(newItem) {
    fetch(`/api/v1/lists/${this.props.match.params.id}/items`, {
      credentials: 'same-origin',
      method: 'POST',
      body: JSON.stringify(newItem),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
        error = new Error(errorMessage);
        throw(error)
      }
    })
    .then((responseBody) => {
      let allItems = this.state.items
      this.setState({ items: allItems.concat(responseBody) })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {
    let listName = this.state.selectedList

    let categories = [
      "Fruit",
      "Vegetables",
      "Dairy",
      "Grains",
      "Red Meat",
      "White Meat/ Poultry",
      "Seafood",
      "Legumes/ Nuts",
      "Canned Food",
      "Snacks",
      "Beverages",
      "Frozen",
      "Herbs/ Seasoning/ Spices",
      "Miscellaneous"]

    let items = this.state.items

    let categoryTiles = categories.map((category) => {
      let categoryItems = items.filter(item => item.category === category)

      if(categoryItems.length > 0) {
        return(
          <CategoryTile
          key={category}
          name={category}
          value={categoryItems}
          />
        )
      }
    })

    return(
      <div>
        <h1>{listName}</h1>

        <div className="callout primary">
          <NewItemFormContainer
            addNewItem={this.addNewItem}
          />
        </div>

        {categoryTiles}

      </div>
    )
  }
}

export default ShowListContainer
