import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import { Link } from 'react-router';
import PropTypes from 'prop-types';

import { Row } from 'react-bootstrap';


//action

import axios from 'axios';



//config
import { Configurations } from '../../../Utils/config';

//strings costants
import Strings from '../../../Resources/Strings/Strings';


class ToDoDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            todos: [],
        }
    }

    static get contextTypes() {
        return {
            router: PropTypes.object.isRequired
        };
    }



    /**load data on page load */
    componentDidMount() {
        this.getToDoDetails();
    }


    /*
    * gets list     */
    getToDoDetails = () => {
        let userid = location.href.split(":id")[1];
        //alert(userid);
        axios.get(`https://jsonplaceholder.typicode.com/todos?userId=` + userid)
            .then(res => {
                this.setState({ todos: res.data });
            });
    };

    /**
     * handle click event of each list item
     */

    handleItemClick = (dataitem) => {
        let chkCompleted = ReactDOM.findDOMNode(this.refs.chkCompleted).checked;
        //alert(chkCompleted.checked)
        if (dataitem.completed != chkCompleted) {
            axios.put(`https://jsonplaceholder.typicode.com/todos/` + dataitem.id, {

                "completed": chkCompleted
            }).then(res => {
                alert("To do item is updated");
                this.getToDoDetails();
            });
        }

    }

    /**
     * add new to do
     */
    AddToDo = () => {
        let chkCompleted = ReactDOM.findDOMNode(this.refs.refChk).checked;
        let titleValue = ReactDOM.findDOMNode(this.refs.refTitle).value;

        if (titleValue != "") {
            axios.post(`https://jsonplaceholder.typicode.com/todos`, {
                "userId": location.href.split(":id")[1],
                "title": titleValue,
                "completed": chkCompleted
            }).then(res => {
                if (res.status == 201) {
                    alert("To do item is added");
                    this.getToDoDetails();
                }
                else {
                    alert("Some error!" + res.statusText);
                }
            });

        }
        else {
            alert("Please add title.");
        }
    }

    /**
     * handle delte
     */
    handleDeleteClick = (id) => {
        axios.delete(`https://jsonplaceholder.typicode.com/todos/` + id)
            .then(res => {
                alert("To do item is deleted");
                this.getToDoDetails();
            });
    }


    /**
     * render List
     * 
     */
    renderTable = () => {
        let list = this.state.todos;

        if (list.length > 0) {
            return (

                <table>
                    <tbody>
                        <tr>

                            <th>title</th>
                            <th>Completed</th>
                            <th>Action</th>

                        </tr>

                        {
                            list.map(obj =>
                                <tr key={obj.id}><td className="spanListItem">{obj.title}</td>
                                    <td className="spanListItem">{obj.completed}</td>

                                    <td><input ref="chkCompleted" type="checkbox" defaultChecked={obj.completed} onClick={this.handleItemClick.bind(this, obj)}></input></td>
                                    <td className="spanListItem"><button onClick={this.handleDeleteClick.bind(this, obj.id)}>Delete</button></td>
                                    <td></td>
                                </tr>

                            )

                        }
                    </tbody>
                </table>
            );
        }
        else {
            return (
                <div>

                    <div className="noRecordsAvailable">{Strings.NoRecordsToDisplay}</div>
                </div>
            );
        }
    }


    // list page UI
    render() {
        return (
            <div id="userCardsList">
                <label className="lblHeaderTitle" >{Strings.ToDoList}</label>
                <div><input type="text" className="spanListItem" ref="refTitle" placeholder="title"></input>
                    <input type="checkbox" className="spanListItem" ref="refChk" placeholder="is completed"></input>
                    <button onClick={this.AddToDo.bind(this)}>Add To Do</button>
                </div>
                <Row className="no_margin_left_right">
                    <div id="error_msg" className="errorMessage" ></div>
                </Row>
                <br />
                <div>
                    {this.renderTable()}
                </div>

            </div>
        );
    }
}


function mapStateToProps(state) {
    return {

    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
    }, dispatch);
}


export default connect(mapStateToProps, matchDispatchToProps)(ToDoDetails);