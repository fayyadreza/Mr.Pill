import React, { Component } from 'react';
import Modal from 'antd/lib/modal';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Button from 'antd/lib/input';

class Modal_Form extends Component {
    constructor(props) {
        super(props);
        state = {
            form_fields: this.props.fields
        };


        handleCreate = e => {
            e.preventDefault();
            this.props.form.validateFieldsAndScroll((err, values) => {
                if (!err) {
                    handleCancel()
                }
            });
        };




    }

    render() {
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };


        return (
            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                Sample Text
            </Form>







        );
    }
}

export default Create_Medication;