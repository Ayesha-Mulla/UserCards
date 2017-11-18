import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import { FormGroup, Row, FormControl } from 'react-bootstrap';


//action
import axios from 'axios';



//config
import { Configurations } from '../../../Utils/config';

//strings costants
import Strings from '../../../Resources/Strings/Strings';


class UserCardList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            cardsList: []
        }
    }

    static get contextTypes() {
        return {
            router: PropTypes.object.isRequired
        };
    }



    /**load data on page load */
    componentWillMount() {
        this.getCardsList();
    }


    /*
    * gets list     */
    getCardsList = () => {
        axios.get(`https://jsonplaceholder.typicode.com/users`)
            .then(res => {
                this.setState({ cardsList: res.data });
            });
    };

    getCardsActionCallback = (response) => {

    }

    /**
     * handle click event of each list item
     */

    handleItemClick = (dataitem) => {

        //fill up the details
       
        //go to details page
        this.context.router.push(Configurations.ToDoDetailsPath
            + dataitem.id
        );
    }


    /**
     * render List
     * 
     */
    renderTable = () => {
        let list = this.state.cardsList;

        if (list.length > 0) {
            return (

                <table>
                    <tbody>
                        <tr>
                            <th>name</th>
                            <th>user name</th>
                            <th>email</th>
                            <th>company</th>
                            <th>address</th>
                            <th>action</th>

                        </tr>

                        {
                            list.map(obj =>
                                <tr key={obj.id}><td className="spanListItem">{obj.name}</td>
                                    <td className="spanListItem">{obj.username}</td>
                                    <td className="spanListItem">{obj.email}</td>
                                    <td className="spanListItem">{obj.company.name} {obj.company.catchPrase}</td>
                                    <td className="spanListItem">{obj.address.street},{obj.address.suite},{obj.address.city},{obj.address.zipcode}
                                    </td>
                                    <td><button onClick={this.handleItemClick.bind(this, obj)}>View To do</button></td>
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
                <label className="lblHeaderTitle" >{Strings.UserCardsList}</label>
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


export default UserCardList;