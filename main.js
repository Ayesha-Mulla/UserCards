import './node_modules/bootstrap/dist/css/bootstrap.css';
import './Resources/Styles/styles.css';

import React from 'react';
import ReactDom from "react-dom";
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory, browserHistory } from 'react-router';
import createHistory from 'history/lib/createHashHistory';
import { syncHistoryWithStore } from 'react-router-redux'
import * as reduxThunk from 'redux-thunk';
import { loadState, saveState } from './localStorage';
import allReducers from './CommonReducers/CombineReducer';

// components
import App from './Components/App/Component/App';
import UserCardList from './Components/UserCards/Component/UserCardList';
import ToDoDetails from './Components/UserCards/Component/ToDoDetails';
//config
import { Configurations } from './Utils/config';

//creating a store
const persistedState = loadState();
const createStoreWithMiddleware = applyMiddleware(reduxThunk.default)(createStore);
const store = createStoreWithMiddleware(allReducers, persistedState);

const history = syncHistoryWithStore(createHistory(), store)
store.subscribe(() => {
    saveState(store.getState());
});

ReactDom.render(
    <Provider store={store}>
        <Router history={history}>
            <Route path={Configurations.UserCardsListPath} component={App}>
                <IndexRoute component={UserCardList} />
            </Route>
            <Route path={Configurations.ToDoDetailsPath} component={App}>
                <IndexRoute component={ToDoDetails} />
            </Route>
        </Router>
    </Provider>
    , document.getElementById('root'));