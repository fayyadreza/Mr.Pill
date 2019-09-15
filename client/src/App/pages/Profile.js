import React, { Component } from "react";
import { Link } from "react-router-dom";
import { checkPropTypes } from "prop-types";
import CollectionsPage from "./Modal_Form.js";
import "antd/dist/antd.css";
import "./main.css";
import Table from "antd/lib/table/Table";
import Column from "antd/lib/table/Column";
import Sider from "antd/lib/layout";
import Content from "antd/lib/layout";
import Layout from "antd/lib/layout";
import Button from "antd/lib/button";
import { Row, Col } from "antd";

class Profile extends Component {
  constructor(props) {
    super(props);
    let user_info = props.location.state;
    console.log(user_info);
    this.state = {
      name: user_info.name,
      id: user_info._id,
      phone: user_info.phone,
      data_source: user_info.medications
    };

    console.log(this.state.id);

    fetch(
      "api/profile/" + this.state.id
    ).then(response => {
      console.log("response", response);
      response.json().then(data => {
        console.log(data);
        this.setState({ data_source: data.medications });
      });
    });
    var handleDecrement = function(id) {
      fetch(
        "https://hackthenorth2019.herokuapp.com/api/decrement-dosage" + id
      ).then(response =>
        response.json().then(data => {
          let id_list = data.data_source.id;
          id_list[id_list.find(id)] = id - 1;
          this.state.data_source.id = id_list;
        })
      );
    };

    this.fetchTableProps = this.fetchTableProps.bind(this);
  };

  fetchTableProps = (id) => {
    fetch("api/profile/" + this.state.id).then(
      response => {
        console.log("response", response);
        response.json().then(data => {
          this.setState({ data_source: data.medications });
        });
      }
    );
  };

  removeMedication = (record) => {
    console.log(record);
  };

  render() {
    return (
      <Row type="flex" justify="center">
        <Col span={22}>
          <h1>This is the profile of {this.state.name} </h1>
          <h2>Current Medications</h2>

          <div classname="meds-table">
            <Table
              dataSource={this.state.data_source}
              size="small"
              rowKey="_id"
            >
              <Column title="Name" dataIndex="name" />
              <Column title="Condition" dataIndex="illness" />
              <Column title="Dosage" dataIndex="dosage.amount" />
              <Column title="Time" dataIndex="dosage.time" />
              <Column
                title="Amount Remaining"
                dataIndex="current_size"
              />
              <Column
                title=""
                key="update"
                render={() => (
                  <Button type="primary" onClick={this.fetchTableProps}>
                    Update
                  </Button>
                )}
              />
              <Column
                title=""
                key="remove"
                render={(text, record) => (
                  <Button type="danger" onClick={() => this.removeMedication(record)}>Remove</Button>
                )}
              />
            </Table>
            <CollectionsPage profile={this.state.id} handler={this.fetchTableProps} />
          </div>
        </Col>
      </Row>
    );
  }
}
export default Profile;
