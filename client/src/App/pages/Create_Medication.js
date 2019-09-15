import React, { Component } from 'react';
import Modal from 'antd/lib/modal';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Button from 'antd/lib/input';
import Modal_Form from './Create_Medication.js';

class Create_Medication extends Component {
    constructor(props) {
        super(props);
        state = {
            ModalText: 'Please Enter The Information For The New Medication',
            visible: false,
            confirmLoading: false,
            id: this.props.id
        };

        showModal = () => {
            this.setState({
                visible: true,
            });
        };

        handleCreate = () => {
            this.setState({
                ModalText: 'The modal will be closed after two seconds',
                confirmLoading: true,
            });
            setTimeout(() => {
                this.setState({
                    visible: false,
                    confirmLoading: false,
                });
            }, 2000);
        }

        handleCancel = () => {
            console.log('Clicked cancel button');
            this.setState({
                visible: false,
            });
        };


    }

    render() {
        const { visible, confirmLoading, id } = this.state;
        return (
            <div>
                <Button type="primary" onClick={this.showModal}>
                    Open Modal with async logic
            </Button>
                <Modal>
                    title="Create New Medication"
                    visible={visible}
                    onOk={this.handleCreate}
                    confirmLoading={confirmLoading}
                    onCancel={this.handleCancel}
                    <Modal_Form fields={this.state.id} />
                </Modal>
            </div>






        );
    }
}

export default Create_Medication;
