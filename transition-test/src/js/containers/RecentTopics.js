import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import 'es6-promise'
import fetch from 'isomorphic-fetch'

import { transTime } from '../util/time'

class Replies extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        return (
             <ul id="replie-img">
                {this.props.replies.map((item,i)=>(
                    <li key={i}>
                        <Link to={"/detail/"+item.id}>
                            <div className="list-item">
                                <p>{item.title}</p>
                                <h5>{transTime(item.last_reply_at)}</h5>
                            </div>
                        </Link>
                    </li>))}
            </ul>
        )
    }
}



export default Replies

