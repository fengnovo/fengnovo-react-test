import React from 'react'
import { render } from 'react-dom'
import { HashRouter as Router, Route } from 'react-router-dom'
import Home from './containers/Home'
import Detail from './containers/Detail'
import User from './containers/User'


import createHistory from 'history/createHashHistory'
const history = createHistory()

let rootElement = document.getElementById('app')

render(
    <Router history={history}>
        <Route render={({ location }) => {
            return(
                <div>
                    <Route location={location} exact path="/" component={Home} />
                    <Route location={location} path="/home/:tab" component={Home} />
                    <Route location={location} path="/detail/:id" component={Detail} />
                    <Route location={location} path="/user/:id" component={User} />
                </div>
            )}}/>
    </Router>,
    rootElement
)


// render(
//     
//     rootElement
// )