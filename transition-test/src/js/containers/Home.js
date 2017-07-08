import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Img from '../components/Img'
import Loading from '../components/Loading'
import defaultImg from '../../imgs/cnodejs.png'

import 'es6-promise'
import fetch from 'isomorphic-fetch'
import { Link } from 'react-router-dom'

class Home extends Component {

    constructor(props) {
        super(props);
		 if(this.props.match && this.props.match.params && this.props.match.params.tab){
           this.tab = this.props.match.params.tab; 
        }
		console.log(this.tab)
        this.state = {
            list: [],
			tab: this.tab || 'all',
			page: 1,
			// loaded: false
        }
		this.loaded = false
		this.scollHandle = this.scollHandle.bind(this)
    }
	
	scollHandle() {
		let _this = this;
		//滚动条在Y轴上的滚动距离
		function getScrollTop(){
		　　var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
		　　if(document.body){
		　　　　bodyScrollTop = document.body.scrollTop;
		　　}
		　　if(document.documentElement){
		　　　　documentScrollTop = document.documentElement.scrollTop;
		　　}
		　　scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
		　　return scrollTop;
		}
		//文档的总高度
		function getScrollHeight(){
		　　var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
		　　if(document.body){
		　　　　bodyScrollHeight = document.body.scrollHeight;
		　　}
		　　if(document.documentElement){
		　　　　documentScrollHeight = document.documentElement.scrollHeight;
		　　}
		　　scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
		　　return scrollHeight;
		}
		//浏览器视口的高度
		function getWindowHeight(){
		　　var windowHeight = 0;
		　　if(document.compatMode == "CSS1Compat"){
		　　　　windowHeight = document.documentElement.clientHeight;
		　　}else{
		　　　　windowHeight = document.body.clientHeight;
		　　}
		　　return windowHeight;
		}
		window.onscroll = function(){
		　　if(_this.loaded && getScrollTop() + getWindowHeight() == getScrollHeight()){
				console.log("you are in the bottom!");
				_this.loaded = false
				fetch(`https://cnodejs.org/api/v1/topics?limit=10&page=${_this.state.page}&tab=${_this.state.tab}`)
				.then(response=>response.json())
				.then(data=> {
					_this.setState({
						page: ++_this.state.page,
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

    componentDidMount() {
		fetch(`https://cnodejs.org/api/v1/topics?limit=10&page=${this.state.page}&tab=${this.state.tab}`)
		.then(response=>response.json())
		.then(data=> {
			this.setState({
				page: ++this.state.page,
				list: data.data,
			})
			this.scollHandle()
			this.loaded = true
		})
		.catch(e => console.log(e))
    }

	componentWillUnmount (){
		if(window.onscroll) window.onscroll = null
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
									<h5>{item.create_at}</h5>
								</div>
							</Link>
						</li>))}
				</ul>
				<div className="more-center"><Loading r={40} z={3} c='#65bbce'/></div>
				<footer className="footer">
					<ul id="footer-list">
						<li key={'all'}>
							<Link to={"home/all"}>
								全部
							</Link>
						</li>
						<li key={'good'}>
							<Link to={"home/good"}>
								精华
							</Link>
						</li>
						<li key={'share'}>
							<Link to={"home/share"}>
								分享
							</Link>
						</li>
						<li key={'ask'}>
							<Link to={"home/ask"}>
								问答
							</Link>
						</li>
						<li key={'job'}>
							<Link to={"home/job"}>
								招聘 
							</Link>
						</li>
					</ul>
				</footer>
		    </div>
        )
    }
}



export default Home

