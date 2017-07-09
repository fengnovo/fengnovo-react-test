import React, { Component } from 'react'
import PropTypes from 'prop-types'
import 'es6-promise'
import fetch from 'isomorphic-fetch'

import Loading from '../components/Loading'
import RecentTopics from './RecentTopics'

import { gobalUrl } from '../util/commonConfig'
import { transTime } from '../util/time'

import backImg from '../../imgs/back.png'
import exitImg from '../../imgs/exit.png'
import unloginImg from '../../imgs/unlogin.png'

class User extends Component {

    constructor(props) {
        super(props);
        let user = JSON.parse(localStorage.getItem('fengnovo.cnode.user')) || {}
        this.state = {
            user
        }
        this.handleBack = this.handleBack.bind(this)
        this.handleExit = this.handleExit.bind(this)
    }
	
    componentDidMount() {
		
    }

	componentWillUnmount (){

	}

    handleBack() {
        window.history.back()
    }

    handleExit() {
        localStorage.removeItem('fengnovo.cnode.user')
    }

    render() {
        let {
            title,
            loginname,
            avatar_url,
            githubUsername,
            create_at,
            score,
            recent_topics
        } = this.state
        return (
            <div id="publish">
                <nav className="nav">
                    <img className="btn-back" src={backImg} onClick={this.handleBack}/>
                    <div className="nav-text">{loginname}</div>
                    <img className="nav-img" src={exitImg} onClick={this.handleExit}/>
                </nav>
                {this.state.user.loginname? 
                        <div className="publish-from">发表</div> : 
                        <div className="publish-from"><img src={unloginImg} /><div className="unlogin">请登录</div></div>}
               
		    </div>
        )
    }
}



export default User

