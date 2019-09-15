import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import Button from 'antd/es/button';
import { Row, Col, Card } from 'antd';

class Home extends Component {
  render() {
    return (
      <div className="App">
          <Row type="flex" justify="center" align="middle">
            <Col span={20}>
              <Card style={{ width: 500 }}>
                <h1>Welcome to Prescription Assistant</h1>

                <Link to={{ pathname: "/User", id: "5d7d468ee7179a084efd4c8d" }}>
                  <Button type='primary'>Login</Button>
                </Link>
              </Card>
            </Col>
          </Row>
      </div>
    );
  }
}
export default Home;
