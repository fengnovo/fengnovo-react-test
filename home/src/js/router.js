import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import Home from './pages/home.jsx';
import Search from './pages/search.jsx';
import Sort from './pages/sort.jsx';


const historyOptions = {
    queryKey : false
};

const routes = (
    <Router history={hashHistory}>
        <Route path='/' component={ Home }></Route>
        <Route path='/home' component={ Home }></Route>
        <Route path='/search' component={ Search }></Route>
        <Route path='/sort' component={ Sort }></Route>
    </Router>
);

export default routes;