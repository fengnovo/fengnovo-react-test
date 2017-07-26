import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import 'es6-promise'
import fetch from 'isomorphic-fetch'

import { gobalUrl,HomePageLimit } from '../util/commonConfig'
import { getScrollTop,getScrollHeight,getWindowHeight } from '../util/scroll'
import { transTime } from '../util/time'

import Img from '../components/Img'
import Loading from '../components/Loading'
import defaultImg from '../../imgs/cnodejs.png'
import accountImg from '../../imgs/account.png'



class Home extends Component {

    constructor(props) {
        super(props);
		let cnode = JSON.parse(localStorage.getItem('fengnovo.cnode')) || {}
		let user = JSON.parse(localStorage.getItem('fengnovo.cnode.user')) || {}
		let {
			list=[],
			tab='all',
			scrollTop=0,
			activeClass='all',
			page=1
		} = cnode
        this.state = {
            list,
			tab,
			page,
			activeClass,
			scrollTop,
			user
        }
		// console.log(this.state);
		this.loaded = false
		this.scollHandle = this.scollHandle.bind(this)
		this.handleTab = this.handleTab.bind(this)
		this.fetchData = this.fetchData.bind(this)
    }
	
	scollHandle() {
		let _this = this;
		window.onscroll = function(){
			// console.log(_this.loaded) 
		　　if(_this.loaded && getScrollTop() + getWindowHeight() == getScrollHeight()){
				// console.log("you are in the bottom!");
				_this.loaded = false
				fetch(`${gobalUrl}/api/v1/topics?limit=${HomePageLimit}&page=${_this.state.page}&tab=${_this.state.tab}`)
				.then(response=>response.json())
				.then(data=> {
					let page = _this.state.page+1
					// console.log(page)
					_this.setState({
						page,
						list: _this.state.list.concat(data.data),
					})
					_this.loaded = true
				})
				.catch(e => {
					console.log(e)
					_this.loaded = true
				})
		　　}
		};
	}

	handleTab(tab) {
		if(window.onscroll) window.onscroll = null
		this.setState({tab,list: [],page: 1,activeClass: tab})
		setTimeout(()=>{
			this.fetchData()
		},50)
	}

	fetchData() {
		fetch(`${gobalUrl}/api/v1/topics?limit=${HomePageLimit}&page=${this.state.page}&tab=${this.state.tab}`)
		.then(response=>response.json())
		.then(data=> {
			let page = this.state.page+1
			// console.log(page)
			this.setState({
				page,
				list: data.data,
			})
			this.scollHandle()
			this.loaded = true
		})
		.catch(e => console.log(e))
	}

    componentDidMount() {
		if(this.state.list.length == 0){
			this.fetchData()
		}else{
			window.scrollTo(0, this.state.scrollTop)
			this.loaded = true
			this.scollHandle()
		}
		
    }	

	componentWillUnmount (){
		if(window.onscroll) window.onscroll = null
		let {
			list,
			tab,
			page,
			activeClass
		} = this.state
		localStorage.setItem('fengnovo.cnode',JSON.stringify({
			scrollTop: getScrollTop(),
			list,
			tab,
			page,
			activeClass
		}))
	}

    render() {
        return (
            <div id="content">
				<nav className="nav">
					<img className="homepage-left-img" src="//o4j806krb.qnssl.com/public/images/cnodejs_light.svg"/>
					{
						this.state.user.loginname ? 
							<Link to={`/user/${this.state.user.loginname}`}><img className="homepage-right-img" src={accountImg}/></Link> : 
							<Link to={"/login"}><img className="homepage-right-img" src={accountImg}/></Link>
					}
				</nav>
                <ul id="list">
					{this.state.list.map((item,i)=>(
						<li key={i}>
							<Link to={"/user/"+item.author.loginname}>	
								<Img  imageUrl={item.author.avatar_url}
										defaultImg={defaultImg}
										w='5rem'
										h='4rem'
								/>  
							</Link>
							<Link to={"/detail/"+item.id}>
								<div className="list-item">
									<p>{item.title}</p>
									<h5>{transTime(item.create_at)}</h5>
								</div>
							</Link>
						</li>))}
				</ul>
				<div className="more-center"><Loading r={40} z={3} c='#65bbce'/></div>
				<footer className="footer">
					<ul id="footer-list">
						<li key={'all'} onClick={this.handleTab.bind(this,'all')} className={this.state.activeClass == 'all'?'active':''}>
								全部
						</li>
						<li key={'good'} onClick={this.handleTab.bind(this,'good')} className={this.state.activeClass == 'good'?'active':''}>
								精华
						</li>
						<li key={'share'} onClick={this.handleTab.bind(this,'share')} className={this.state.activeClass == 'share'?'active':''}>
								分享
						</li>
						<li key={'ask'} onClick={this.handleTab.bind(this,'ask')} className={this.state.activeClass == 'ask'?'active':''}>
								问答
						</li>
						<li key={'job'} onClick={this.handleTab.bind(this,'job')} className={this.state.activeClass == 'job'?'active':''}>
								招聘 
						</li>
					</ul>
				</footer>
		    </div>
        )
    }
}



export default Home

