import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { checkPropTypes } from 'prop-types';
import 'antd/dist/antd.css';
import './main.css';
import Table from 'antd/lib/table/Table';
import Column from 'antd/lib/table/Column';
import Sider from 'antd/lib/layout';
import Content from 'antd/lib/layout';
import Layout from 'antd/lib/layout';
import Button from 'antd/lib/button';
import Profile from './Profile';
import { Row, Col } from 'antd';
import { Badge } from 'antd';


class User extends Component {
    constructor(props) {
        // console.log("PROPS: ");
        // console.log(props);
        super(props);
        this.state = {
            data_source: []
        };

        fetch("api/get-provider/5d7d468ee7179a084efd4c8d").then(response => {
            console.log(response);
            if (response.status != 200) {
                console.log("Error communicating with database, error " + response.data);
                return;
            }
            response.json().then(data => {
              console.log(data);
              this.setState({ data_source: data.profiles });
            });
        }
        );
    }


    render() {
        var fetchTableProps = function () {
            fetch("api/get-provider/5d7d468ee7179a084efd4c8d").then(response => {
                if (response.status !== 200) {
                    console.log("Error communicating with database, error " + response.data);
                    return;
                }
                response.json().then(data => {
                    console.log(data);
                    this.state.data_source = { name: data.name, email: data.email, phone: data.phone };
                });
            }
            );
        }
        return (
            <body>
                <Row type="flex" justify="center">
                    <Col span={22}>
                        <br></br>
                        <br></br>
                        <div style={{ dplsay: 'inline-block' }}>
                            <h2>Your Patients
                          <Badge status="processing" style={{ marginLeft: '10px' }} />
                            </h2>
                        </div>
                        <div classname='meds-table'>
                            <Table dataSource={this.state.data_source} size="small" rowKey="_id">
                                <Column title="Name" dataIndex="name" />
                                <Column title="Age" dataIndex="age" />
                                <Column title="Email" dataIndex="email" />
                                <Column
                                    title=""
                                    render={(id, name) => <Button type='primary'><Link to={{ pathname: '/profile', state: { _id: id, name: name }, Component: { Profile } }} > View Profile </Link></Button>} />
                            </Table>
                        </div>
                    </Col>
                </Row>
            </body>
        );
    }
}
export default User;
