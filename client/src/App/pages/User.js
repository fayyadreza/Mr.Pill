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
        super(props);
        this.state = {
            data_source: {}
        };

        //Sample data source
        this.data_source = [{ name: "poopie", age: 22, id: 12345 }];

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