import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import Button from 'antd/es/button';


class Home extends Component {
  render() {
    return (
      <div className="App">
        <h1>Welcome to prescription Assistant</h1>

        <Link to={{ pathname: "/User", id: "5d7d468ee7179a084efd4c8d" }}>
          <Button type='primary'>Login</Button>
        </Link>
      </div>
    );
  }
}
export default Home;
