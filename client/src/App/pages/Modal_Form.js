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
    console.log(props);
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

      console.log('Received values of form: ', values);
      let med = {
          id: this.state.id,
          medication: {
              status: false,
              name: values.name,
              illness: values.illness,
              dosage: { time: values.time, amount: 1 },
              current_size: parseInt(values.current_size),
          }
      }
      console.log(med);

      let headers = {
        'Content-Type': 'application/json'
      }

      let data = {
          method: "PUT",
          header: headers,
          body: JSON.stringify(med)
      }

      const url = "api/profile"

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
