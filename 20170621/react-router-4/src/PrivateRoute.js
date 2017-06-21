import React from 'react'
import {
    Route,Redirect
} from 'react-router-dom'
const PrivateRoute = ({component: Component,...rest}) => (
    <Route {...rest} render={props => (
        localStorage.getItem('login') ? <Component/> : <Redirect to={{
            pathname: '/login',
            state: {from: props.location}
        }}/>
    )}>
    </Route>
)
export default  PrivateRoute