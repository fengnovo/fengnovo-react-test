import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Loading from '../components/Loading'
import RecentTopics from './RecentTopics'

import 'es6-promise'
import fetch from 'isomorphic-fetch'

class User extends Component {

    constructor(props) {
        super(props);
        if(this.props.match && this.props.match.params && this.props.match.params.id){
           this.loginname = this.props.match.params.id; 
        }
        this.state = {
            title: '人物',
            loginname: this.loginname,
            avatar_url: '',
            githubUsername: '',
            create_at: null,
            score: 0,
            recent_topics: []
        }
    }
	
    componentDidMount() {
		fetch(`https://cnodejs.org/api/v1/user/${this.state.loginname}`)
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
                    <a className="btn-back" href="#">
    	                <span>上一页</span>
                    </a>
                    <div className="nav-text">{loginname}</div></nav>
                { create_at ?  <div id="user">
                            <li>
                                <img src={avatar_url}/>
                                <div className="list-item">
                                    <p>{loginname}</p>
                                    <h5>作者：{loginname} 时间：{create_at}</h5>
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

