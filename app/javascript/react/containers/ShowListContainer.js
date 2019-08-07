import React from 'react'
import { Link } from 'react-router-dom'

import CategoryTile from '../components/CategoryTile'
import NewItemFormContainer from '../containers/NewItemFormContainer'
import EditItemContainer from '../containers/EditItemContainer'
import ShoppingContainer from '../containers/ShoppingContainer'

class ShowListContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedList: "",
      items: [],
      editing: false,
      itemToEdit: {},
      shopping: false
    }

    this.addNewItem = this.addNewItem.bind(this)
    this.toggleItemEdit = this.toggleItemEdit.bind(this)
    this.handleUpdateItem = this.handleUpdateItem.bind(this)
    this.loadContent = this.loadContent.bind(this)
    this.confirmItemDelete = this.confirmItemDelete.bind(this)
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

  confirmItemDelete(event) {
    if( window.confirm("Are you sure you want to delete this list?") ) {
      let itemId = event.item.id
      let listId = event.item.list_id
      fetch(`/api/v1/lists/${listId}/items/${itemId}`, {
        credentials: 'same-origin',
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then((responseBody) => {
        this.loadContent()
      })
    }
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

    let itemForm;
    let listName = this.state.selectedList
    let items = this.state.items
    let categoryTiles;
    let shoppingContainer;

    if(this.state.shopping) {
      shoppingContainer = <ShoppingContainer />
    } else {

      if(this.state.editing) {
        itemForm = (
          <EditItemContainer
          item={this.state.itemToEdit}
          categories={categories}
          measurements={measurements}
          handleUpdateItem={this.handleUpdateItem}
          />
        )
      } else {
        itemForm = (
          <NewItemFormContainer
          categories={categories}
          measurements={measurements}
          addNewItem={this.addNewItem}
          />
        )
      }


      if(items.length == 0) {
        categoryTiles = <h2 className="callout items">Add items to start your list!</h2>
      } else {
        categoryTiles = categories.map((category) => {
          let categoryItems = items.filter(item => item.category === category)

          if(categoryItems.length > 0) {
            return(
              <CategoryTile
              key={category}
              name={category}
              value={categoryItems}
              toggleItemEdit={this.toggleItemEdit}
              editState={this.state.editing}
              itemToEdit={this.state.itemToEdit}
              confirmItemDelete={this.confirmItemDelete}
              />
            )
          }
        })
      };
    }


    return(
      <div className="list-show">
        <h1>{listName}</h1>
        <h3><Link to="/lists">Back to my lists</Link></h3>


        <div className="grid-x grid-margin-x">
          <div className="callout show cell small-12 large-6">
            {itemForm}

            {shoppingContainer}
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
