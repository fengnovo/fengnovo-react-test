import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import 'es6-promise'
import fetch from 'isomorphic-fetch'
import { transTime } from '../util/time'

import commenImg from '../../imgs/commen.png'

class Replies extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div>
                <img className="comment-icon" src={commenImg} /><span className="comment-text">以下是精彩评论</span>
                <ul id="replie-img">
                    {this.props.replies.map((item,i)=>(
                        <li key={i}>
                            <div className="left-avatar">
                                <Link to={"/user/"+item.author.loginname}>
                                    <img src={item.author.avatar_url}/>
                                </Link>
                                <span className="loginname-avatar">{item.author.loginname}</span>
                            </div>
                            <div className="list-item">
                                <p dangerouslySetInnerHTML={{ __html: item.content}}></p>
                                <h5>{transTime(item.create_at)}</h5>
                            </div>
                        </li>))}
                </ul>
            </div>
        )
    }
}



export default Replies

