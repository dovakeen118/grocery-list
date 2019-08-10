import React from 'react'
import { Link } from 'react-router-dom'

import AisleTile from '../components/AisleTile'

class ShoppingContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      list: {},
      items: [],
      selectedItems: []
    }

    this.addSelectedItems = this.addSelectedItems.bind(this)
  }

  componentDidMount() {
    fetch(`/api/v1/lists/${this.props.params}`)
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
      this.setState({ list: responseBody.list, items: responseBody.items })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  addSelectedItems(event) {
    let allSelected = this.state.selectedItems
    this.setState({ selectedItems: allSelected.concat(event.item) })
  }

  render() {
    let listName = this.state.list.list_name
    let items = this.state.items
    let aisles = this.props.aisles

    let aisleTiles;
    if(items.length == 0) {
      aisleTiles = <h2 className="callout">Add items to start your list!</h2>
    } else {
      aisleTiles = aisles.map((aisle) => {
        let aisleItems = items.filter(item => item.aisle === aisle)
        if(aisleItems.length > 0) {
          return(
            <AisleTile
              key={aisle}
              name={aisle}
              value={aisleItems}
              addSelectedItems={this.addSelectedItems}
              selectedItems={this.state.selectedItems}
            />
          )
        }
      })
    }

    return(
      <div className="shopping">
        <h1>{listName}</h1>

        <h3 className="link" onClick={this.props.toggleListView}>
          Edit shopping list
          <i className="fa fa-edit"></i>
        </h3>

        <div>
          {aisleTiles}
        </div>
      </div>
    )
  }
}

export default ShoppingContainer
