import React from 'react';
import Swiper from 'swiper';

import util from '../util';

class Slide extends React.Component {
    constructor(props){
        super(props);

        this._bind.apply(this, ['loop', 'toBannerAd']);
    }

    _bind (...methods) {
        methods.forEach( (method)=> this[method] = this[method].bind(this));
    }

    loop () {
        if (this.props.banner.length <= 1) {
            return;
        }

        var _this = this;

        this.bannerSwiper && this.bannerSwiper.destroy();
        this.bannerSwiper = new Swiper ('#slide', {
            loop: true,
            pagination: '.swiper-pagination',
            paginationClickable: true,
            autoplay: 2000,
            autoplayDisableOnInteraction: false,
            onClick: function(swiper) {
                var banner = _this.props.banner, len = banner.length;
                var item = banner[(swiper.clickedIndex - 1)%len];
                // console.log((swiper.clickedIndex - 1)%len);

                _this.toBannerAd(item.linkUrl, item.name);
            }
        });
    }

    toBannerAd (link, name) {
        util.toService(link, name);
    }

    componentDidMount() {
        this.loop();
    }

    componentWillUnmount() {
        this.bannerSwiper && this.bannerSwiper.destroy();
    }

    componentDidUpdate () {
        this.loop();
    }

    componentWillReceiveProps (nextProps) { // cms接口返回的最新数据
        this.setState({
            banner: nextProps.banner || []
        }, () => {
            this.bannerSwiper && this.bannerSwiper.destroy();
            this.bannerSwiper = new Swiper ('.swiper-container', {
                loop: true,
                pagination: '.swiper-pagination',
                paginationClickable: true,
                autoplay: 2000,
                autoplayDisableOnInteraction: false
            });
        });   
    }

    render() {
        let banner = this.props.banner || [];
        console.log(banner);
        let slides = banner.map((item) => {
            return (
                <div key={item.id} className="swiper-slide">
                    <img src={item.picUrl} alt={item.name}/>
                </div>
            );
        });

        if (!banner.length) {
            return null;
        }

        return (
            <div className="swiper-container" id='slide'>
                <div className="swiper-wrapper">
                    {slides}
                </div>
                <div className="swiper-pagination"></div>
            </div> 
        );
    }
}

Slide.defaultProps = {
    banner: []
};

export default Slide;

