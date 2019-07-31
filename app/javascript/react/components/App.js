import React from 'react'
import { BrowserRouter, Router, Switch, Route } from 'react-router-dom'

import ListContainer from '../containers/ListContainer'
import ShowListContainer from '../containers/ShowListContainer'

const App = (props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/lists" component={ListContainer}/>
        <Route exact path="/lists/:id" component={ShowListContainer}/>
      </Switch>
    </BrowserRouter>
  )
}

export default App
