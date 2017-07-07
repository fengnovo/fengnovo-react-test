import React, { Component } from 'react'
import PropTypes from 'prop-types'

import 'es6-promise'
import fetch from 'isomorphic-fetch'
import { Link } from 'react-router-dom'

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            list: []
        }
    }
	
    componentDidMount() {
		fetch('https://cnodejs.org/api/v1/topics')
		.then(response=>response.json())
		.then(data=> {
			this.setState({
				list:data.data
			})
		})
		.catch(e => console.log(e))
    }

	componentWillUnmount (){

	}

    render() {
        return (
            <div id="content">
				<nav className="nav">
					<img src="//o4j806krb.qnssl.com/public/images/cnodejs_light.svg"/>
				</nav>
                <ul id="list">
					{this.state.list.map((item,i)=>(
						<li key={i}>
							<Link to={"detail/"+item.id}>
								<img src={item.author.avatar_url}/>
								<div className="list-item">
									<p>{item.title}</p>
									<h5>{item.create_at}</h5>
								</div>
							</Link>
						</li>))}
				</ul>

		    </div>
        )
    }
}



export default Home

