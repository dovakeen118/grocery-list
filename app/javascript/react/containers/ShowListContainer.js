import React from 'react'

class ShowListContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedList: ""
    }
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
      this.setState({ selectedList: responseBody.list_name })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {
    let listName = this.state.selectedList

    return(
      <h1>{listName}</h1>
    )
  }
}

export default ShowListContainer
