import React, { Component } from 'react'
import PropTypes from 'prop-types'
import 'es6-promise'
import fetch from 'isomorphic-fetch'
import createHistory from 'history/createHashHistory'
const history = createHistory()


import { gobalUrl } from '../util/commonConfig'

import Loading from '../components/Loading'
import {toastIt} from './../components/Toast'

import backImg from '../../imgs/back.png'

class User extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '登录'
        }
        this.fetchData = this.fetchData.bind(this)
    }
	
    componentDidMount() {
        let data = localStorage.getItem('fengnovo.cnode.user')
        console.log(data)
		if(data){
            data = JSON.parse(data)
            // window.location.href = `/#/user/${data.loginname}`
        }
    }

    fetchData() {
        let accesstoken = this.refs.token.value.replace(/^(\s|\u00A0)+/,'').replace(/(\s|\u00A0)+$/,'')
        console.log(accesstoken)
        if(!accesstoken){
            toastIt('请输入accesstoken！', 2000, {fontSize: '18px'})
            return
        }
        fetch(`${gobalUrl}/api/v1/accesstoken`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ accesstoken })
        })
        .then(response=>response.json())
		.then(data=> {
            if(data.success){
                data.accesstoken = accesstoken
                localStorage.setItem('fengnovo.cnode.user',JSON.stringify(data))
                history.push(`/user/${data.loginname}`)
            }else{
                toastIt(`登录失败！${data.error_msg}`, 2000, {fontSize: '18px'})
            }
		})
		.catch(e => {
            console.log(e)
        })
    }


    handleBack() {
        window.history.back()
    }

	componentWillUnmount (){

	}

    render() {
        return (
            <div id="login">
                <nav className="nav">
                    <img className="btn-back" src={backImg} onClick={this.handleBack}/>
                    <div className="nav-text">{this.state.title}</div>
                </nav>
                <from className="login-from">
                    <input ref="token" type="text" className="login-text" placeholder="请输入Access Token"/>
                    <button className="login-btn" onClick={this.fetchData}>登录</button>
                </from>
		    </div>
        )
    }
}



export default User

