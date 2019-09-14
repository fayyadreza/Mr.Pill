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




class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data_source: {},
            selected_row_keys: []
        };

        //Sample data source
        this.data_source = [{
            key: '0',
            name: 'Nitroglycerin',
            condition: 'Angina',
            dosage: '1 tablet',
            amount_remaining: 20,
            time: 'Morning'
        },
        {
            key: '1',
            name: 'Penicillin',
            condition: 'Infection',
            dosage: '1 tablet',
            amount_remaining: 14,
            time: 'Morning'
        }, {
            key: '1',
            name: 'Penicillin',
            condition: 'Infection',
            dosage: '1 tablet',
            amount_remaining: 14,
            time: 'Morning'
        }, {
            key: '1',
            name: 'Penicillin',
            condition: 'Infection',
            dosage: '1 tablet',
            amount_remaining: 14,
            time: 'Morning'
        }, {
            key: '1',
            name: 'Penicillin',
            condition: 'Infection',
            dosage: '1 tablet',
            amount_remaining: 14,
            time: 'Morning'
        }, {
            key: '1',
            name: 'Penicillin',
            condition: 'Infection',
            dosage: '1 tablet',
            amount_remaining: 14,
            time: 'Morning'
        }, {
            key: '1',
            name: 'Penicillin',
            condition: 'Infection',
            dosage: '1 tablet',
            amount_remaining: 14,
            time: 'Morning'
        }];

    }

    render() {

        return (
            <body>
                <Layout>
                    <h1>Welcome </h1>
                    <h2>Current Medications</h2>
                    <Sider />
                    <Content>
                        <div classname='meds-table'>
                            <Table dataSource={this.data_source} size="small">
                                <Column title="Name" dataIndex="name" key="name" />
                                <Column title="Condition" dataIndex="condition" key="condition" />
                                <Column title="Dosage" dataIndex="dosage" key="dosage" />
                                <Column title="Time" dataIndex="time" key="time" />
                                <Column title="Amount Remaining" dataIndex="amount_remaining" key="amount_remaining" />

                                <Column
                                    title=""
                                    key="remove" render={() => <Button type='danger'>Remove</Button>} />

                                <Column
                                    title=""
                                    key="update" render={() => <Button type='primary'>Decrement</Button>} />
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