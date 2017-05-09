import React from 'react';
import Reflux from 'reflux';
import $ from 'jquery';

import Slide from '../component/slide';
import ServiceNav from '../component/serviceNav';
import BiDa from '../component/bida';
import TopNews from '../component/topNews';
import Warning from '../component/warning';
import TouGu from '../component/tougu';
import BetaNiu from '../component/betaNiu';
import SquareAd from '../component/squareAd';
import Loading from '../component/loading';

import JSBStore from '../reflux/store';
import JSBAction from '../reflux/action';

import util from '../util';
import JSBridge from '../jsb';

class App extends Reflux.Component {
    constructor(props){
        super(props);

        this.state = {
            squareAd: []
        };
        this.store = JSBStore;
        this.gateway = util.gateway();
        this.homeCmsConf = this.gateway.config || {};
        this.canPull = true;

        
        this.state.squareAd = this.carshData ? this.carshData : this.homeCmsConf.squareAd;

        this._bind.apply(this, ['toMessage', 'adaptData','touchScroll']);
    }

    _bind (...methods) {
        methods.forEach((method)=> this[method] = this[method].bind(this));
    }

    toMessage () {
        JSBridge.openNative('message_center', null);
        this.setState({hasMessage: false});
    }

    onBridgeReady () {
        JSBAction.gftInfo();
        JSBAction.tradeInfo();
        JSBAction.deviceInfo();
    }

    adaptData (data) {
        let allService, bida, banner=[], warning=[], squareAd=[];

        allService = data.nav_config;
        if (!allService || !allService.length) {
            allService = this.homeCmsConf.allService
        }

        bida = data.top_asks && data.top_asks[0];
        if (!bida || !bida.name) {
            bida = this.homeCmsConf.bida;
        }

        for (let i = 0, len = data.adv_config.length; i < len; i++) {
            let item = data.adv_config[i];

            switch (item.category) {
                case 1:
                    (banner.length < 4) && banner.push(item);
                    break;

                case 2:
                    warning.push(item);
                    break;

                case 3:
                    (squareAd.length < 4) && squareAd.push(item);
                    break;

                default:
                    break;
            }
        }

        let compareFun = function (a, b) {
            return a.order - b.order;
        };
        banner.sort(compareFun);
        squareAd.sort(compareFun);

        return {allService, bida, banner, warning, squareAd};
    }

    componentWillReceiveProps (nextProps) {
        
    }

    componentDidMount() {
        document.addEventListener('WebViewJavascriptBridgeReady', this.onBridgeReady, false);   // ios
        $(document).on('WebViewJavascriptBridgeReady', this.onBridgeReady); // android

        setTimeout(()=>{
            if(window.pis){
                document.getElementById('header').style.background  = `rgba(0, 97, 179,${window.op})`; 
            }
            $('.body-wrap').scrollTop(window.pis);
            setTimeout(()=>{
                this.touchScroll();
            },100);
            console.log('position---------'+window.pis);
        },0);

         

        if (!util.isFirstLoad()) {
            return;
        }

    }

    touchScroll () {
        let _this = this;
        /*搜索框对象*/    
        var search = document.getElementById('header');   
        /*banner对象*/    
        var banner = document.getElementById('slide');    
        /*高度*/    
        var height = banner.offsetHeight; 

        $('.body-wrap').on('scroll', function(){   
            var top = this.scrollTop; 

            /*当滚动高度大于banner的高度时候颜色不变*/  
            console.log(top);
            window.pis = top;
            if(top > height){            
                search.style.background = "rgba(0, 97, 179,0.95)";
                window.op = 0.95;        
            }else{            
                var op = top/height * 0.95;            
                search.style.background  = "rgba(0, 97, 179,"+op+")"; 
                window.op = op;       
            }  
            console.log(_this.canPull);

            if((top + 80)> window.innerHeight && _this.canPull){ 
                _this.canPull = false;
                console.log('到底部');
                setTimeout(()=>{
                    for(let i=0;i<10;i++){
                        _this.homeCmsConf.squareAd.push({
                            id: new Date().getTime()+i,
                            name: "CMS后台可配_行情",
                            content: "测试四方块广告页",
                            category: 3,
                            order: 1,
                            target: 1,
                            picUrl: "http://cms-bucket.nosdn.127.net/116e343158944e9b87cd20ae7aee58c920170508103109.jpeg?imageView&thumbnail=220y165&quality=45&type=webp&interlace=1&enlarge=1",
                            linkUrl: "web:https://www.baidu.com",
                            linkType: 0
                        });
                    }
                    console.log(_this.homeCmsConf.squareAd);
                    _this.setState({
                        squareAd : _this.homeCmsConf.squareAd
                    });
                    _this.carshData = _this.homeCmsConf.squareAd;
                    _this.canPull = true;
                },1000); 
                
            }
        });
    }

    componentWillUnmount() {

    }

    render() {
        let {banner, allService, bida, warning} = this.homeCmsConf;
        let squareAd = this.state.squareAd;

        let {gftInfo, tradeInfo, deviceInfo, hasMessage} = this.state;
        let link = `#/search?env=${this.gateway.env}`;

        return (
            <div className='page-home'>
                <header id="header" ref='searchHeader'>
                    <div className="icon search-new"></div>
                    <a className='search' href={link}>股票 \ 基金 \ 理财 \ 组合 \ 店铺 \ 资讯</a>
                    <div className='message' onClick={this.toMessage}>
                        {hasMessage ? <i className='red-point'></i> : null}
                    </div>
                </header>

                <div ref='scrollArea' className='body-wrap'>
                    <Slide id="slide" banner={banner}/>
                    
                    <ServiceNav allService={allService}/>

                    <BiDa bida={bida} />

                    <TopNews />

                    <Warning warning={warning}/>

                    <TouGu gftInfo={gftInfo} tradeInfo={tradeInfo} deviceInfo={deviceInfo}/>

                    <BetaNiu gftInfo={gftInfo} tradeInfo={tradeInfo} deviceInfo={deviceInfo}/>

                    <SquareAd squareAd={squareAd}/>

                    <Loading mt={true}/>
                </div>
            </div>      
        );
    }
};

export default App;
