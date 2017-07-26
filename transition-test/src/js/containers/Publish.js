import React, { Component } from 'react'
import PropTypes from 'prop-types'
import 'es6-promise'
import fetch from 'isomorphic-fetch'
import createHistory from 'history/createHashHistory'
const history = createHistory()

import Loading from '../components/Loading'
import RecentTopics from './RecentTopics'

import Editor from './../components/Editor'
import {toastIt} from './../components/Toast'
 


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
        this.clickHandle = this.clickHandle.bind(this)
        this.publishTopic = this.publishTopic.bind(this)
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
        this.setState({
            user: {}
        })
    }

    clickHandle() {
        this.refs.editor.clickHandle()
    }

    publishTopic(content) {
        let title = this.refs.title.value.replace(/^(\s|\u00A0)+/,'').replace(/(\s|\u00A0)+$/,'')
        let accesstoken = this.state.user.accesstoken
        content = content.replace(/^(\s|\u00A0)+/,'').replace(/(\s|\u00A0)+$/,'')
        if(title == ''){
            toastIt('请输入标题！', 2000, {fontSize: '18px'});
            return
        }
        if(!content){
            toastIt('请输入内容！', 2000, {fontSize: '18px'});
            return
        }
        console.log({
                accesstoken,
                title,
                tab: 'dev',
                content
            });

        fetch(`${gobalUrl}/api/v1/topics`,{
            method:'POST',
            headers: { 
                'Accept': 'application/json',
                'Content-Type': 'application/json' 
            },
            body:JSON.stringify({
                accesstoken,// String 用户的 accessToken
                title,// String 标题
                tab: 'dev',
// String 目前有 ask share job dev。开发新客户端的同学，请务必将你们的测试帖发在 dev 专区，以免污染日常的版面，否则会进行封号一周处理。
                content// String 主体内容
            })
        }).then(res => res.json())
            .then(json => {

                console.log(json)
                
                if(json.success){
                    toastIt('成功', 2000, {fontSize: '18px'});
                    setTimeout(()=>{
                        // this.context.router.push(`/#/detail/${json.topic_id}`)
                        history.push(`/detail/${json.topic_id}`)
                    },2000)
                }else{
                    toastIt(json.error_msg, 2000, {fontSize: '18px'});
                }
            })
            .catch(error=>console.log(error))
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
                        <div id="editor">
                            <input ref="title" type="text" className="login-text" placeholder="请输入标题"/>
                            <Editor ref="editor" publishTopic={this.publishTopic}/>
                            <div className="login-btn" onClick={this.clickHandle}>发布新话题</div>
                        </div> : 
                        <div className="publish-from"><img src={unloginImg} /><div className="unlogin">请登录</div></div>}
               
		    </div>
        )
    }
}



export default User

