import React, { Component } from 'react';
import { Button, Modal, Form, Input, Radio } from 'antd';
const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
  // eslint-disable-next-line
  class extends React.Component {
    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title="Add a new medication"
          okText="Add"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical">
            <Form.Item label="Name">
              {getFieldDecorator('name', {
                rules: [{ required: true, message: 'Please input the name of the medication!' }],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="Illness">
              {getFieldDecorator('illness')(<Input />)}
            </Form.Item>
            <Form.Item label="Time">
              {getFieldDecorator('time')(<Input />)}
            </Form.Item>
            <Form.Item label="Current Size">
              {getFieldDecorator('current_size')(<Input />)}
            </Form.Item>
          </Form>
        </Modal>
      );
    }
  },
);

class CollectionsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.profile
    };
  };

  state = {
    visible: false,
  };

  showModal = () => {
    this.setState({ visible: true });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleCreate = () => {
    const { form } = this.formRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      values.id = this.state.id;

      console.log('Received values of form: ', values);
      let med = {
          id: values.id,
          medication: {
              status: false,
              name: values.name,
              illness: values.illness,
              dosage: { time: values.time, amount: 1 },
              current_size: values.current_size,
              history: { status: false, updated_at: Date.now }
          }
      }

      let headers = {
          'Content-type': 'application/json',
      }

      let data = {
          method: "PUT",
          header: headers,
          body: med
      }

      const url = "https://hackthenorth2019.herokuapp.com/api/profile"

      fetch(url, data).then(r => console.log(r))
      form.resetFields();
      this.setState({ visible: false });
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          Add Medication
        </Button>
        <CollectionCreateForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
      </div>
    );
  }
}

export default CollectionsPage;
