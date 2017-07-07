import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Loading from '../components/Loading'
import Replies from './Replies'

import 'es6-promise'
import fetch from 'isomorphic-fetch'

class Detail extends Component {

    constructor(props) {
        super(props);
        if(this.props.match && this.props.match.params && this.props.match.params.id){
           this.articleId = this.props.match.params.id; 
        }
        this.state = {
            id: this.articleId,
            content: '',
            title: '详情',
            replies: [],
            author: {},
            author_id: '',
            reply_count: 0,
            visit_count: 0,
            create_at: null,
            tab: ''
        }
    }
	
    componentDidMount() {
		fetch(`https://cnodejs.org/api/v1/topic/${this.state.id}`)
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
            id,
            content,
            title,
            replies,
            author,
            author_id,
            reply_count,
            visit_count,
            create_at,
            tab
        } = this.state
        return (
            <div>
                <nav className="nav">
                    <a className="btn-back" href="#">
    	                <span>首页</span>
                    </a>
                    <div className="nav-text">{title}</div></nav>
                { content == '' ? 
                        <div className="content-center"><Loading r={52} z={4} c='#65bbce'/></div> : 
                        <div id="detail">
                            <li>
                                <a href={"#/user/"+author.loginname}>
                                    <img src="https://avatars1.githubusercontent.com/u/227713?v=3&amp;s=120"/>
                                </a>
                                <div className="list-item">
                                    <p>{title}</p>
                                    <h5>作者：{author.loginname} 时间：{create_at}</h5>
                                    <h5>回复数：{reply_count} 浏览量：{visit_count}</h5>
                                </div>
                            </li>
                            <div dangerouslySetInnerHTML={{ __html: content}}></div>
                            <Replies {...this.state}/>
                        </div>}
		    </div>
        )
    }
}



export default Detail

