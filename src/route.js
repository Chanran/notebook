import React from 'react'
import { Route, Redirect } from 'react-router'
import { HashRouter, Switch } from 'react-router-dom'

import './index.css'

import NewNote from './pages/new-note'
import NoteList from './pages/note-list'

const Routes = () => (
  <HashRouter>
    <div id="app-container">
      <Route exact path="/" render={() => <Redirect to="/NewNote" />} />
      <Switch>
        <Route path="/NewNote" component={NewNote} />
        <Route path="/NoteList" component={NoteList} />
      </Switch>
    </div>
  </HashRouter>
)

const App = () => (
  <Routes />
)

export default App