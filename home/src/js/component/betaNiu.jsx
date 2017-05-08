import React from 'react';
import $ from 'jquery';

import util from '../util';
import JSBridge from '../jsb';

class BetaNiu extends React.Component {
    constructor(props){
        super(props);

        /*this.state = {
            bida: props.bida || {}
        };*/
        this.state = {
            beta: JSON.parse(localStorage.getItem('gf-app-home-betaniu')) || {}
        };
        this.gateway = util.gateway();
        this.ajaxed = false;

        this._bind.apply(this, ['toBetaNiu', 'toiStock', 'toiConfig']);
    }

    _bind (...methods) {
        methods.forEach((method)=> this[method] = this[method].bind(this));
    }

    toBetaNiu () {
        let gateway = this.gateway;

        JSBridge.openWebvier(gateway.gf_robot.url, gateway.gf_robot.name);
    }

    toiStock (istock) {
        let gateway = this.gateway, totalYield,
            url = `https://www.baidu.com`;

        if (istock && istock.id) {
            totalYield = ((istock.totalYield || 0)*100).toFixed(2);
            ('0.00' != totalYield) && (url = `https://www.baidu.com`);
        }

        JSBridge.openWebvier(url, gateway.gf_robot.name);
    }

    toiConfig (iconfig) {
        let gateway = this.gateway, totalYield,
            url = `https://www.baidu.com`;

        if (iconfig && iconfig.id) {
            totalYield = ((iconfig.totalYield || 0)*100).toFixed(2);
            ('0.00' != totalYield) && (url = `https://www.baidu.com`);
        }

        JSBridge.openWebvier(url, gateway.gf_robot.name);

    }

    componentDidMount() {
        
    }

    componentWillUnmount() {
        
    }

    componentWillReceiveProps (nextProps) {
        /*if (!util.isFirstLoad()) {
            return;
        }*/
        
        let {gftInfo, tradeInfo, deviceInfo} = nextProps;

        if (this.ajaxed || gftInfo === undefined || tradeInfo === undefined) {
            return;
        }

        let url = this.gateway.ponymer_base_url.url + 'authorized/betaniu', 
            param = {};

        //10.2.122.143:3000/authorized/betaniu?trade_id=030148787888&tel=455t&tel=26238979

        if (gftInfo instanceof(Object) && gftInfo.access_token) {
            param.token = gftInfo.access_token;
            param.tel = gftInfo.user_info && gftInfo.user_info.mobile;
            if (tradeInfo instanceof(Object)) {
                // param.trade_id = tradeInfo.userInfo.client_id;
                let userInfo = tradeInfo.userInfo || tradeInfo.userAccount || tradeInfo.user_info;
                param.trade_id = tradeInfo.client_id || (userInfo && userInfo.client_id);
            }

            this.ajaxed = true;

            $.getJSON(url, param, (json, textStatus) => {
                if (json.status != 0) {
                    return;
                }

                let beta = {}, data = json.data;

                for (let i = 0, len = data.length ; i < len; i++) {
                    if ('stock' == data[i].type) {
                        beta.istock = data[i];
                    }
                    else if ('allocation' == data[i].type) {
                        beta.iconfig = data[i];
                    }
                }

                this.setState({
                    beta: beta
                });

                localStorage.setItem('gf-app-home-betaniu', JSON.stringify(beta));
            });
        } 
    }

    render() {
        let gftInfo = this.props.gftInfo || {},
            logined = !!gftInfo.access_token,
            beta = this.state.beta || {};
        let totalYield, istockProfit, iconfigProfit;

        if (logined && beta.istock) {
            totalYield = ((beta.istock.totalYield || 0)*100).toFixed(2);

            if ('0.00' != totalYield) {
                istockProfit = (
                    <div className='profit-wrap' >
                        <p className='name'>{beta.istock.name}</p>
                        <p className={`profit ${beta.istock.totalYield<0 ? 'nagetive': ''}`}><strong>{totalYield}</strong>%</p>
                        <p className='gray'>累计收益率</p>
                    </div>
                );
            }
            else {
                istockProfit = (
                    <p className='hint'>提供商品、资讯、音乐搜索</p>
                );
            }
            
        }
        else {
            istockProfit = (
                <p className='hint'>提供商品、资讯、音乐搜索</p>
            );
        }

        if (logined && beta.iconfig) {
            totalYield = ((beta.iconfig.totalYield || 0)*100).toFixed(2);

            if ('0.00' != totalYield) {
                iconfigProfit = (
                    <div className='profit-wrap'>
                        <p className='name'>{beta.iconfig.name}</p>
                        <p className={`profit ${beta.iconfig.totalYield<0 ? 'nagetive': ''}`}><strong>{totalYield}</strong>%</p>
                        <p className='gray'>累计收益率</p>
                    </div>
                );    
            }
            else {
                iconfigProfit = (
                    <p className='hint'>提供音乐、头条、应用搜索</p>
                );   
            }
            
        }
        else {
            iconfigProfit = (
                <p className='hint'>提供音乐、头条、应用搜索</p>
            );
        }

        return (
            <section className='beta-niu'>
                <div className='icon-niu' onClick={this.toBetaNiu}></div>
                <div className='i-stock' onClick={this.toiStock.bind(this, beta.istock)}>
                    <h5><i className='icon'></i><span>i搜索</span><i className='right-arrow'></i></h5>
                    {istockProfit}
                </div>
                <div className='i-config'  onClick={this.toiConfig.bind(this, beta.iconfig)}>
                    <h5><i className='icon'></i><span>i音乐</span><i className='right-arrow'></i></h5>
                    {iconfigProfit}
                </div>
            </section>
        );
    }
};

export default BetaNiu;

