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

import JSBStore from '../reflux/store';
import JSBAction from '../reflux/action';

import util from '../util';
import JSBridge from '../jsb';

class App extends Reflux.Component {
    constructor(props){
        super(props);

        this.state = {};
        this.store = JSBStore;
        this.gateway = util.gateway();
        this.homeCmsConf = JSON.parse(localStorage.getItem('gf-app-home-cms')) || this.gateway.home_cms_config || {};

        this._bind.apply(this, ['toMessage', 'adaptData']);
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
        /*allService = data.nav_config.sort((a, b) => { // 后台已经排序过，可直接使用
            if (a.target < b.target) {
                return -1;
            }
            else if (a.target > b.target) {
                return 1;
            }
            else {
                if (a.order < b.order) {
                    return -1;
                }
                else if (a.order > b.order) {
                    return 1;
                }
                else {
                    return 0;
                }
            }
        });*/

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

    componentDidMount() {
        // this.unsubscribe = JSBStore.listen(this.onStatusChange.bind(this));
        document.addEventListener('WebViewJavascriptBridgeReady', this.onBridgeReady, false);   // ios
        $(document).on('WebViewJavascriptBridgeReady', this.onBridgeReady); // android
        
        if (!util.isFirstLoad()) {
            return;
        }

        let url = this.gateway.ponymer_base_url.url + 'homeconfig';

        $.getJSON(url, (json, textStatus) => {
            if (json.status != 0) {
                return;
            }
            
            this.homeCmsConf = this.adaptData(json.data);
            localStorage.setItem('gf-app-home-cms', JSON.stringify(this.homeCmsConf || {}));

            this.forceUpdate();
        });
    }

    componentWillUnmount() {
        // this.unsubscribe();
        // localStorage.setItem('gf-app-home-cms', JSON.stringify(this.homeCmsConf));
    }

    render() {
        let {banner, allService, bida, warning, squareAd} = this.homeCmsConf;
        let {gftInfo, tradeInfo, deviceInfo, hasMessage} = this.state;
        let link = `#/search?env=${this.gateway.env}`;
        // debugger;

        return (
            <div className='page-home'>
                <header>
                    <a className='search' href={link}>股票 \ 基金 \ 理财 \ 组合 \ 店铺 \ 资讯</a>
                    <div className='message' onClick={this.toMessage}>
                        {hasMessage ? <i className='red-point'></i> : null}
                    </div>
                </header>

                <div className='body-wrap'>
                    <Slide banner={banner}/>
                    
                    <ServiceNav allService={allService}/>

                    <BiDa bida={bida} />

                    <TopNews />

                    <Warning warning={warning}/>

                    <TouGu gftInfo={gftInfo} tradeInfo={tradeInfo} deviceInfo={deviceInfo}/>

                    <BetaNiu gftInfo={gftInfo} tradeInfo={tradeInfo} deviceInfo={deviceInfo}/>

                    <SquareAd squareAd={squareAd}/>
                </div>
            </div>      
        );
    }
};

export default App;
