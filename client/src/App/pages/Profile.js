import React, { Component } from "react";
import { Link } from "react-router-dom";
import { checkPropTypes } from "prop-types";
import "antd/dist/antd.css";
import "./main.css";
import Table from "antd/lib/table/Table";
import Column from "antd/lib/table/Column";
import Sider from "antd/lib/layout";
import Content from "antd/lib/layout";
import Layout from "antd/lib/layout";
import Button from "antd/lib/button";

class Profile extends Component {
  constructor(props) {
    super(props);
    let user_info = props.location.state.uid;
    this.state = {
      name: user_info.name,
      id: user_info.id,
      data_source: {}
    };

    fetch(
      "https://hackthenorth2019.herokuapp.com/api/profile/5d7d414aeb4c9c0017b7f694"
    ).then(response =>
      response.json().then(
        data =>
          (this.data.source = {
            id: data.id,
            name: data.name,
            medications: data.medications
          })
      )
    );
    //Sample data source
  }

  render() {
    return (
      <body>
        <Layout>
          <h1>This is the profile of {this.state.name} </h1>
          <h2>Current Medications</h2>
          <Sider />
          <Content>
            <div classname="meds-table">
              <Table dataSource={this.data_source} size="small">
                <Column title="Name" dataIndex="name" key="name" />
                <Column
                  title="Condition"
                  dataIndex="condition"
                  key="condition"
                />
                <Column title="Dosage" dataIndex="dosage" key="dosage" />
                <Column title="Time" dataIndex="time" key="time" />
                <Column
                  title="Amount Remaining"
                  dataIndex="amount_remaining"
                  key="amount_remaining"
                />

                <Column
                  title=""
                  key="remove"
                  render={() => <Button type="danger">Remove</Button>}
                />

                <Column
                  title=""
                  key="update"
                  render={() => <Button type="primary">Decrement</Button>}
                />
              </Table>
            </div>
          </Content>
          <Sider />
        </Layout>
      </body>
    );
  }
}
export default Profile;
