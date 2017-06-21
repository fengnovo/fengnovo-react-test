import React from 'react'
import {Link} from 'react-router-dom'
const UserList = () => (
    <ul className="list-group">
        <li className="list-group-item">
            <Link to="/user/detail/1">张三</Link>
        </li>
        <li className="list-group-item">
            <Link to="/user/detail/2">李四</Link>
        </li>
    </ul>
)
export default UserList