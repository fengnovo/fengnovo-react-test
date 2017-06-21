import React from 'react'
import {Route, Link} from 'react-router-dom'
const MenuLink = ({ label, to, activeOnlyWhenExact }) => (
    <Route path={to} exact={activeOnlyWhenExact} children={({ match }) => (
        <li className={match ? 'active' : ''}>
            <Link to={to}>{label}</Link>
        </li>
    )}/>
)
export default MenuLink