import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import User from './pages/User';
import Profile from './pages/Profile';


class App extends Component {
  render() {
    const App = () => (
      <Switch>
        {/* <Route exact path='/' component={Home} /> */}
        <Route path='/' component={User} />
        <Route path='/profile' component={Profile} />
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
