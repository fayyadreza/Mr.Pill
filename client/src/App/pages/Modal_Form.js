import React, { Component } from 'react';
import Modal from 'antd/lib/modal';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Button from 'antd/lib/input';

class Modal_Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id
        };


        var handleCreate = function () {
          let id = this.state.id; 
          let name = this.refs.name.value;
          let illness = this.refs.illness.value;
          let time = this.refs.time.value;
          let current_size = this.refs.current_size.value;
          let med = {
              id: id,
              medication: {
                  status: false,
                  name: name,
                  illness: illness,
                  dosage: { time: time, amount: 1 },
                  current_size: current_size,
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

          let url = "https://hackthenorth2019.herokuapp.com/"

          fetch(url, data).then(r => console.log(r))

      }





    }

    render() {
        return (
          <div>
            <input type="text" placeholder="Name" ref="name" />
            <input type="text" placeholder="Condition" ref="illness" />
            <input type="text" placeholder="Dosage Time" ref="time" />
            <input type="text" placeholder="Amount of Medication" ref="current_size" />
            <Button type="Primary" onClick={this.handleCreate}>Submit</Button>
          </div>
        );
    }
}

export default Modal_Form;
