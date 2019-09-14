import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import User from './pages/User';


class App extends Component {
  render() {
    const App = () => (
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/user' component={User} />
      </Switch>
    )
    return (
      <Switch>
        <App />
      </Switch>
    );
  }
}

export default App;
