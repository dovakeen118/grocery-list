import React from 'react'

import ListTile from '../components/ListTile'

class ListContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      usersLists: []
    }
  }

  componentDidMount() {
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
      this.setState({ usersLists: responseBody })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {
    let lists = this.state.usersLists.map((list) => {
      return (
        <ListTile
          key={list.id}
          id={list.id}
          name={list.list_name}
        />
      )
    })
    return(
      <div>
        {lists}
      </div>
    )
  }
}

export default ListContainer
