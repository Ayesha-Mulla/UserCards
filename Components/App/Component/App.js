import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class App extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="absolute-Center is-responsive">
                        {this.props.children}
                    </div>
                </div>
            </div>

        );
    }
}


export default App;