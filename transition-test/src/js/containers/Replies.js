import React, { Component } from 'react'
import PropTypes from 'prop-types'


import 'es6-promise'
import fetch from 'isomorphic-fetch'

class Replies extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        return (
             <ul id="replie-img">
                {this.props.replies.map((item,i)=>(
                    <li key={i}>
                        <img src={item.author.avatar_url}/>
                        <div className="list-item">
                            <p dangerouslySetInnerHTML={{ __html: item.content}}></p>
                            <h5>{item.create_at}</h5>
                        </div>
                    </li>))}
            </ul>
        )
    }
}



export default Replies

