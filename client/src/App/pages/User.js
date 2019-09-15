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


class User extends Component {
    constructor(props) {
        console.log("PROPS: ");
        console.log(props);
        super(props);
        this.state = {
            data_source: {}
        };

        fetch("api/get-provider/5d7d468ee7179a084efd4c8d").then(response => {
            if (response.status !== 200) {
                console.log("Error communicating with database, error " + response.data);
                return;
            }
            response.json().then(data => {
                console.log(response);
                this.state.data_source = { name: response.name, email: response.email, phone: response.phone };
            });
        }
        );
    }


    render() {

        return (
            <body>
                <Layout>
                    <h1>Welcome </h1>
                    <h2><u>Your Patients</u></h2>
                    <Sider />
                    <Content>
                        <div classname='meds-table'>
                            <Table dataSource={this.data_source} size="small" rowKey="uid">
                                <Column title="Name" dataIndex="name" />
                                <Column title="Age" dataIndex="age" />
                                <Column title="Id" dataIndex="id" />
                                <Column
                                    title=""
                                    render={(id, name) => <Button type='primary'><Link to={{ pathname: '/profile', state: { uid: id, name: name }, Component: { Profile } }} > View Profile </Link></Button>} />
                            </Table>
                        </div>
                    </Content>
                    <Sider />
                </Layout>
            </body>
        );
    }
}
export default User;