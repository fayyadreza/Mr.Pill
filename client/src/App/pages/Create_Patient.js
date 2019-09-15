// import React, { Component } from 'react';
// import Modal from 'antd/lib/modal';
// import Form from 'antd/lib/form';
// import Input from 'antd/lib/input';
//
// class Create_Patient extends Component {
//     constructor(props) {
//         super(props);
//         state = {
//             ModalText: 'Please Enter The Information For The New Medication',
//             visible: false,
//             confirmLoading: false,
//         };
//
//         showModal = () => {
//             this.setState({
//                 visible: true,
//             });
//         };
//
//         handleCreate = () => {
//             this.setState({
//                 ModalText: 'The modal will be closed after two seconds',
//                 confirmLoading: true,
//             });
//             setTimeout(() => {
//                 this.setState({
//                     visible: false,
//                     confirmLoading: false,
//                 });
//             }, 2000);
//         }
//
//
//     }
//
//     render() {
//         return (
//             <h1>Enter Information For New Medication</h1>
//             <span>
//             <Form layout="inline" onSubmit={}>
//
//             </Form>
//     </span>
//
//
//
//
//     );
//     }
//     }