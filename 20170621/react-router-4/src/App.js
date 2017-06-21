import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch
} from 'react-router-dom'

import Home from './Home';
import User from './User';
import Profile from './Profile';
import PrivateRoute from './PrivateRoute';
import Login from './Login';
import MenuLink from './MenuLink';
import NoMatch from './NoMatch';
const App = () => (
    <Router>
        <div>
            <div className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <div className="navbar-brand">
                            <Link to="/">学生管理系统</Link>
                        </div>
                    </div>
                    <div>
                        <ul className="nav navbar-nav">
                            <MenuLink activeOnlyWhenExact={true} to="/" label="首页"/>
                            <MenuLink activeOnlyWhenExact={true} to="/user" label="用户管理"/>
                            <MenuLink activeOnlyWhenExact={true} to="/profile" label="个人设置"/>
                            <li><Link to="/zhufengpeixun">品牌</Link></li>
                        </ul>
                        <ul className="nav navbar-nav navbar-right">
                            <li><Route path="/" render={({history}) => (<a onClick={() => {localStorage.clear();history.push('/');}}>退出</a>)}/></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="container">
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/user" component={User}/>
                    <PrivateRoute path="/profile" component={Profile}/>
                    <Route path="/login" component={Login}/>
                   {/* <Route path="/:name" render={({match}) => (<div>{match.params.name}</div>)}/>*/}
                    <Route component={NoMatch}/>
                </Switch>
            </div>
        </div>
    </Router>
)
export default App