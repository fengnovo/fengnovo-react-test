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
import writeImg from '../../imgs/write.png'

class User extends Component {

    constructor(props) {
        super(props);
        if(this.props.match && this.props.match.params && this.props.match.params.id){
           this.loginname = this.props.match.params.id; 
        }
        let user = JSON.parse(localStorage.getItem('fengnovo.cnode.user')) || {}
        this.state = {
            title: '人物',
            loginname: this.loginname,
            avatar_url: '',
            githubUsername: '',
            create_at: null,
            score: 0,
            recent_topics: [],
            user
        }
        this.handleBack = this.handleBack.bind(this)
        this.handleExit = this.handleExit.bind(this)
        this.handlePublish = this.handlePublish.bind(this)
    }
	
    componentDidMount() {
		fetch(`${gobalUrl}/api/v1/user/${this.state.loginname}`)
		.then(response=>response.json())
		.then(data=> {
            this.setState({...data.data})
		})
		.catch(e => {
            console.log(e)
            this.setState({
                content: '<p>出错了</p>'
            })
        })
    }

	componentWillUnmount (){

	}

    handleBack() {
        window.history.back()
    }

    handlePublish() {
        if(this.state.user.loginname){
            this.props.history.push('/publish')
        }else{
            this.props.history.push('/login')
        }
    }

    handleExit() {
        localStorage.removeItem('fengnovo.cnode.user')
        this.setState({user:{}})
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
            <div>
                <nav className="nav">
                    <img className="btn-back" src={backImg} onClick={this.handleBack}/>
                    <div className="nav-text">{loginname}</div>
                    {this.state.user.loginname == loginname ? <img className="nav-img" src={exitImg} onClick={this.handleExit}/> : <img className="nav-img" src={writeImg} onClick={this.handlePublish}/>}
                </nav>
                { create_at ?  <div id="user">
                            <li>
                                <div><img src={avatar_url}/>{this.state.user.loginname == loginname ? <button className="" onClick={this.handlePublish}>发表</button> : null}</div>
                                <div className="list-item">
                                    <p>{loginname}</p>
                                    <h5>作者：{loginname} 时间：{transTime(create_at)}</h5>
                                    <h5>分数：{score}</h5>
                                </div>
                            </li>
                            <RecentTopics replies={recent_topics}/>
                        </div> : <div className="content-center"><Loading r={52} z={4} c='#65bbce'/></div> }
		    </div>
        )
    }
}



export default User

