import React, { Fragment } from 'react'
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ContactState from './context/contact/ContactState'

import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'

const App = () => {
  return (
    <ContactState>
      <Router>
        <Fragment className="App">
          <Navbar />
          <div className="container" >
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/about" component={About} />
            </Switch>
          </div>
        </Fragment>
      </Router>
    </ContactState>
  );
}

export default App;
