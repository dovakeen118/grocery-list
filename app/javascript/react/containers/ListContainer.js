import React from 'react'

import ListTile from '../components/ListTile'
import NewListFormContainer from '../containers/NewListFormContainer'
import EditListContainer from '../containers/EditListContainer'

class ListContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      lists: [],
      user : {},
      editing: false,
      listToEdit: {}
    }

    this.loadContent = this.loadContent.bind(this)
    this.addNewList = this.addNewList.bind(this)
    this.toggleListEdit = this.toggleListEdit.bind(this)
    this.handleUpdateList = this.handleUpdateList.bind(this)
  }

  componentDidMount() {
    this.loadContent()
  }

  loadContent() {
    fetch('/api/v1/lists')
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
        error = new Error(errorMessage);
        throw(error);
      }
    })
    .then((responseBody) => {
      this.setState({ lists: responseBody.lists })
      this.setState({ user: responseBody.user })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  addNewList(newListItem) {
    fetch('/api/v1/lists', {
      credentials: 'same-origin',
      method: 'POST',
      body: JSON.stringify(newListItem),
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
      let allLists = this.state.lists
      this.setState({ lists: allLists.concat(responseBody) })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  toggleListEdit(event) {
    this.setState({ editing: true })
    this.setState({ listToEdit: event })
  }

  handleUpdateList(updatedListObject) {
    let listId = updatedListObject.list_id
    fetch(`/api/v1/lists/${listId}`, {
      credentials: "same-origin",
      method: "PATCH",
      body: JSON.stringify(updatedListObject),
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
      this.setState({ editing: false, listToEdit: {} })
      this.loadContent()
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {
    let user = this.state.user.first_name

    let lists = this.state.lists.map((list) => {
      return (
        <ListTile
          key={list.id}
          id={list.id}
          name={list.list_name}
          toggleListEdit={this.toggleListEdit}
          editState={this.state.editing}
          editList={this.state.listToEdit}
        />
      )
    })

    let listForm;

    if(this.state.editing) {
      listForm = (
        <EditListContainer
        list={this.state.listToEdit}
        handleUpdateList={this.handleUpdateList}
        />
      )
    } else {
      listForm = (
        <NewListFormContainer
          addNewList={this.addNewList}
        />
      )
    }


    return(
      <div className="lists">
        <h1>Curated Lists by {user}</h1>

        <div className="grid-x grid-margin-x">
          <div className="callout list new cell small-12 large-6">

            {listForm}

          </div>

          <div className="callout list user cell small-12 large-auto">
            {lists}
          </div>

        </div>
      </div>
    )
  }
}

export default ListContainer
