import React from 'react'
import { Link } from 'react-router-dom'
import { Chart } from 'react-google-charts'

import CategoryTile from '../components/CategoryTile'
import NewItemFormContainer from '../containers/NewItemFormContainer'
import EditItemContainer from '../containers/EditItemContainer'

class CategoryContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      list: {},
      items: [],
      editing: false,
      itemToEdit: {}
    }

    this.loadContent = this.loadContent.bind(this)
    this.addNewItem = this.addNewItem.bind(this)
    this.toggleItemEdit = this.toggleItemEdit.bind(this)
    this.handleUpdateItem = this.handleUpdateItem.bind(this)
    this.confirmItemDelete = this.confirmItemDelete.bind(this)
  }

  componentDidMount() {
    this.loadContent()
  }

  loadContent() {
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
      this.setState({ list: responseBody.list })
      this.setState({ items: responseBody.items })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  addNewItem(newItem) {
    fetch(`/api/v1/lists/${this.props.params}/items`, {
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
    let listName = this.state.list.list_name
    let items = this.state.items
    let categories = this.props.categories
    let measurements = this.props.measurements
    let aisles = this.props.aisles

    let itemForm;
    if(this.state.editing) {
      itemForm = (
        <EditItemContainer
        item={this.state.itemToEdit}
        categories={categories}
        measurements={measurements}
        aisles={aisles}
        handleUpdateItem={this.handleUpdateItem}
        />
      )
    } else {
      itemForm = (
        <NewItemFormContainer
        categories={categories}
        measurements={measurements}
        aisles={aisles}
        addNewItem={this.addNewItem}
        />
      )
    }

    let categoryTiles;
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

    let pieChart;
    let data = [["Category", "Items"]]
    let options = {
      pieHole: 0.2,
      slices: [
        { color: "#ba4945" },
        { color: "#42530e" },
        { color: "#FFE049" },
        { color: "#B1693A" },
        { color: "#F8DE98" },
        { color: "#77173B" },
        { color: "#D1A18F" },
        { color: "#7b9235" },
        { color: "#ED9A46" },
        { color: "#A02524" },
        { color: "#1779BA" },
        { color: "#b5b5b5" },
        { color: "#7190B1" },
        { color: "#6A425D" },
      ]
    }

    let pieSections = categories.map((category) => {
      let numItems = items.filter(item => item.category === category)
      numItems = numItems.length
      let newData = [category, numItems]
      data.push(newData)
    })

    if(items.length > 0) {
      pieChart = (
        <div className="callout chart">
          <Chart
            chartType="PieChart"
            graph_id="PieChart"
            width={"100%"}
            height={"250px"}
            data={data}
            options={options}
          />
        </div>
      )
    }

    return(
      <div>
        <h1>{listName}</h1>

        <div className="list-toggle">
          <h3>
            <Link to="/lists">
              <i className="fa fa-bars"></i>
              Back to my lists
            </Link>
          </h3>

          <h3 onClick={this.props.toggleListView}>
            Shopping list
            <i className="fa fa-shopping-cart"></i>
          </h3>
        </div>

        <div className="grid-x grid-margin-x">
          <div className="cell small-12 large-6">
            <div className="callout show">
              {itemForm}
            </div>

              {pieChart}

          </div>

          <div className="items cell small-12 large-6">
            {categoryTiles}
          </div>
        </div>

      </div>
    )
  }
}

export default CategoryContainer
