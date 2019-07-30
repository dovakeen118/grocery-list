import React from 'react'
import { BrowserRouter, Router, Switch, Route } from 'react-router-dom'

import ListContainer from '../containers/ListContainer'

const App = (props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/lists" component={ListContainer}/>
      </Switch>
    </BrowserRouter>
  )
}

export default App
