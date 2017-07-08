import React from 'react'
import { render } from 'react-dom'
import { HashRouter as Router, Route } from 'react-router-dom'
import Home from './containers/Home'


import createHistory from 'history/createHashHistory'
const history = createHistory()

let rootElement = document.getElementById('app')

render(
    <Router history={history}>
        <Route render={({ location }) => {
            return(
                <div>
                    <Route location={location} exact path="/" component={Home} />
                </div>
            )}}/>
    </Router>,
    rootElement
)


// render(
                    // <Route location={location} path="/user/:id" component={User} />
//     
//     rootElement
// )