import React, { Component } from 'react';
import Modal from 'antd/lib/modal';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Button from 'antd/lib/input';

class Modal_Form extends Component {
    constructor(props) {
        super(props);
        state = {
            id: this.props.id
        };


        var handleCreate = function (id, name, illness, time, current_size, e) {
            med = {
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

            headers = {
                'Content-type': 'application/json',
            }

            data = {
                method: "PUT",
                header: headers,
                body: med
            }

            url = "https://hackthenorth2019.herokuapp.com/"

            fetch(url, data).then(r => console.log(r))

        }





    }

    render() {
        return (
            <input type="text" placeholder="Name" id="name" />
            <input type="text" placeholder="Condition" id="illness" />
            <input type="text" placeholder="Dosage Time" id="time" />
            <input type="text" placeholder="Amount of Medication" id="current_size" />
            <Button type="Primary" onClick={this.handleCreate(
                (document.getElementById("name").innerText),
                (document.getElementById("illness").innerText),
                (document.getElementById("time").innerText),
                (document.getElementById("current_size").innerText)
            )}>Submit</Button>




        );
    }
}

export default Modal_Form;