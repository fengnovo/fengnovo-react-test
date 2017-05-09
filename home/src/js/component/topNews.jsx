import React from 'react';
import Swiper from 'swiper';
import $ from 'jquery';

import util from '../util';

class TopNews extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            topNews: JSON.parse(localStorage.getItem('gf-app-home-topnews')) || []
        };
        this.gateway = util.gateway();

        this._bind.apply(this, ['toInfo', 'toDetail', 'loop']);
    }

    _bind (...methods) {
        methods.forEach((method)=> this[method] = this[method].bind(this));
    }

    toInfo () {
        util.toService('native:info', '广发资讯');
    }

    toDetail (id) {
        util.toService(`native:info?gfNewsId=${id}`, '广发资讯详情');
    }

    loop () {
        if (this.state.topNews.length <= 2) {
            return;
        }

        var _this = this;

        this.topNewsSwiper && this.topNewsSwiper.destroy();
        this.topNewsSwiper = new Swiper ('#topNews', {
            loop: true,
            direction: 'vertical',
            slidesPerView: 2,
            autoplay: 1500,
            autoplayDisableOnInteraction: false,
            onlyExternal: true, // // 只能通过函数拖动slide，相当于禁止滑动。swipeHandler : '.swipe-handler', .swiper-no-swiping，会阻止onTap事件
            onTap: function(swiper) {
                var topNews = _this.state.topNews, len = topNews.length;
                var item = topNews[(swiper.clickedIndex - 2)%len];
                // console.log((swiper.clickedIndex - 2)%len);

                _this.toDetail(item.id);
            }
        });
    }

    componentDidMount() {
        this.loop();

        if (!util.isFirstLoad()) {
            return;
        }
        
    }

    componentWillUnmount() {
        this.topNewsSwiper && this.topNewsSwiper.destroy();
    }

    /*componentWillReceiveProps (nextProps) { // cms接口返回的最新数据
        this.setState({
            topNews: nextProps.topNews || [],
            topOffset: '0'
        }, this.loop);
    }*/

    render() {
        let topNews = this.state.topNews || [];
        let list = topNews.map((item) => {
            return (
                <div key={item.id} className='swiper-slide news-item'>
                    <i className='disc'></i>
                    <strong>[{item.media}]</strong>
                    <span>{item.title}</span>
                </div>
            );
        });

        if (!topNews.length) {
            return null;
        }

        return (
            <section className='top-news'>
                <div className='wrap-left' onClick={this.toInfo}></div>
                <div className='wrap-right swiper-container' id='topNews'>
                    <div className="news-list swiper-wrapper">
                        {list}
                    </div>
                </div>           
            </section>
        );
    }
};

export default TopNews;

