import React from 'react';
import { Router, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Home from '../common/home';
import '../styles/main.css'

const history = createBrowserHistory();

const Routes = (
    <Router history={history}>
        <div id='app-root'>
            <Route path="/" exact component={Home} />
        </div>
    </Router>
);

export default Routes;
