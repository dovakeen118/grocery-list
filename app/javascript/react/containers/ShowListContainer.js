import React from 'react'

import CategoryTile from '../components/CategoryTile'
import NewItemFormContainer from '../containers/NewItemFormContainer'
import EditItemContainer from '../containers/EditItemContainer'

class ShowListContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedList: "",
      items: [],
      editing: false,
      itemToEdit: {}
    }

    this.addNewItem = this.addNewItem.bind(this)
    this.toggleItemEdit = this.toggleItemEdit.bind(this)
    this.handleUpdateItem = this.handleUpdateItem.bind(this)
    this.loadContent = this.loadContent.bind(this)
  }

  componentDidMount() {
    this.loadContent()
  }

  loadContent() {
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

  toggleItemEdit(event) {
    this.setState({ editing: true })
    this.setState({ itemToEdit: event.item })
  }

  handleUpdateItem(updatedItemObject) {
    let itemId = updatedItemObject.item_id;
    let listId = updatedItemObject.list_id;
    fetch(`/api/v1/lists/${listId}/items/${itemId}`, {
      credentials: "same-origin",
      method: "PATCH",
      body: JSON.stringify(updatedItemObject),
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
      this.setState({ editing: false, itemToEdit: {} })
      this.loadContent()
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {
    let listName = this.state.selectedList
    let items = this.state.items
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

    let categoryTiles = categories.map((category) => {
      let categoryItems = items.filter(item => item.category === category)

      if(categoryItems.length > 0) {
        return(
          <CategoryTile
            key={category}
            name={category}
            value={categoryItems}
            toggleItemEdit={this.toggleItemEdit}
            editState={this.state.editing}
          />
        )
      }
    })

    let itemForm;

    if(this.state.editing) {
      itemForm = (
        <EditItemContainer
          item={this.state.itemToEdit}
          handleUpdateItem={this.handleUpdateItem}
        />
      )
    } else {
      itemForm = (
        <NewItemFormContainer
        addNewItem={this.addNewItem}
        />
      )
    }

    return(
      <div className="list-show">
        <h1>{listName}</h1>

        <div className="grid-x grid-margin-x">
          <div className="callout show cell small-12 large-6">
            {itemForm}
          </div>

          <div className="items cell small-12 large-6">
            {categoryTiles}
          </div>
        </div>

      </div>
    )
  }
}

export default ShowListContainer
