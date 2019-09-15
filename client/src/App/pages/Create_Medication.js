import React, { Component } from 'react';
import Modal from 'antd/lib/modal';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';

class Create_Medication extends Component {
    constructor(props) {
        super(props);
        state = {
            id: this.props.id
        }
    }

    render() {
        return (
            <h1>Enter Information For New Medication</h1>
            <span>
                <Form layout="inline" onSubmit={}>
                    <Input></Input>
                </Form>
            </span>




         );
    }
}

export default Create_Medication;