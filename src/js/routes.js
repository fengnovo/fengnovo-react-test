import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from './pages/app.jsx';
import NewsList from './pages/newsList.jsx';
import NewsDetail from './pages/newsDetail.jsx';

const historyOptions = {
    queryKey : false
};

const routes = (
    <Router history={browserHistory}>
        <Route path='/' component={ App }>
            <IndexRoute component={ NewsList }/>
            <Route path='NewsDetail' component={ NewsDetail } />
            <Route path='newsList' component={ NewsList } />
        </Route>
    </Router>
);

export default routes;