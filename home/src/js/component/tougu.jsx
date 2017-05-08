import React from 'react';
import $ from 'jquery';

import util from '../util';
import JSBridge from '../jsb';

class TouGu extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            tougu: JSON.parse(localStorage.getItem('gf-app-home-tougu')) || {}
        };
        this.ajaxed = false;
        this.gateway = util.gateway();

        this._bind.apply(this, ['toShopProduct', 'toArticle']);
    }

    _bind (...methods) {
        methods.forEach((method)=> this[method] = this[method].bind(this));
    }

    toShopProduct (shopId, productId) {
        if (!shopId) return;
        
        let gateway = this.gateway,
            url = productId ? `${gateway.shop.url}group/${productId}/0` : `${gateway.shop.url}shop/${shopId}`;

        JSBridge.openWebvier(url, gateway.shop.name);
    }

    toArticle (id) {
        if (!id) return;
        
        let gateway = this.gateway,
            url = `${gateway.shop.url}articleDetail/${id}`;

        JSBridge.openWebvier(url, gateway.shop.name);
    }

    componentDidMount() {
        /*$.getJSON('/test/gf-app-home-tougu.json', (json, textStatus) => {
            this.setState({
                tougu: json
            });
        });*/
    }

    componentWillUnmount() {
        
    }

    componentWillReceiveProps (nextProps) {
        /*if (!util.isFirstLoad()) {
            return;
        }*/

        let {gftInfo, tradeInfo, deviceInfo} = nextProps;

        if (this.ajaxed || gftInfo === undefined || tradeInfo === undefined || deviceInfo === undefined) {
            return;
        }

        let url = this.gateway.ponymer_base_url.url, 
            param = {imei: deviceInfo.uuid || deviceInfo.deviceID}; // uuid安卓；deviceID、iphone

        //10.2.122.143:3000/anonymous/consultant?imei=866798029871847
        //10.2.122.143:3000/authorized/consultant?imei=866798029871874&tel=4008780&trade_id=061700031672&token=123123

        if (gftInfo instanceof(Object) && gftInfo.access_token) {
            url += 'authorized/consultant';
            param.token = gftInfo.access_token;
            param.tel = gftInfo.user_info && gftInfo.user_info.mobile;
            if (tradeInfo instanceof(Object)) {
                // param.trade_id = tradeInfo.userInfo.client_id;
                let userInfo = tradeInfo.userInfo || tradeInfo.userAccount || tradeInfo.user_info;  // andrioid
                param.trade_id = tradeInfo.client_id || (userInfo && userInfo.client_id);  // tradeInfo.client_id，iphone
            }
        }
        else {
            url +=  'anonymous/consultant';
        }

        this.ajaxed = true;

        $.getJSON(url, param, (json, textStatus) => {
            if (json.status != 0) {
                return;
            }

            var content = json.data.article && json.data.article.article_content;

            if (content) {
                content = $(content).text();
                json.data.article.article_content = content;
            }

            this.setState({
                tougu: json.data
            });

            localStorage.setItem('gf-app-home-tougu', JSON.stringify(json.data || {}));
        });
    }

    render() {
        let tougu = this.state.tougu || {},
            product = tougu.product || {},
            article = tougu.article || {}, 
            clsExt = article.article_title ? 'taller' : '',
            identity = tougu.is_mine ? '我的顾问' : '推荐顾问',
            avatar = tougu.consultant_headimg ? `${this.gateway.shop_avatar_prevurl.url}${tougu.consultant_headimg}` : './img/gf-icon.png';
        let nameWrap, profitWrap;

        if (!tougu.shop_id) {
            return null;
        }

        if (product.product_id) {
            nameWrap = (
                <div className='name-wrap'>
                    <p><strong>{tougu.shop_name}</strong></p>
                    <p className='op-time'>最近调仓：{product.update_at && product.update_at.slice(0, 16)}</p>
                </div>
            );
            profitWrap = (
                <div className='profit-wrap'>
                    <p className='profit'><strong>{(product.yield_total*100).toFixed(2)}</strong>%</p>
                    <p className='group-name'>{product.product_name} | 总收益</p>
                </div>
            );
        }
        else {
            nameWrap = (
                <div className='name-wrap'>
                    <p style={{'marginTop': '1.8rem'}}><strong>{tougu.shop_name}</strong></p>
                </div>
            );
            profitWrap = null;/* (
                // <p className='op-time no-margin'>最近调仓：{tougu.update_at && tougu.update_at.slice(0, 16)}</p>
                <div className='profit-wrap'>
                    
                </div>
            );*/
        }

        return (
            <section className={`tougu ${clsExt}`}>
                <div className='group-wrap' onClick={this.toShopProduct.bind(this, tougu.shop_id, product.product_id)}>
                    <h5 className='group-title'>{identity}</h5>
                    <div className='group'>
                        <img src={avatar}/>
                        {nameWrap}                       
                        {profitWrap}                       
                    </div>
                </div>
                {clsExt ? <article className='info' onClick={this.toArticle.bind(this, article.article_id)}>
                    <h5>{article.article_title}</h5>
                    <p>{article.article_content}</p>
                </article> : null }
            </section>
        );
    }
};

export default TouGu;

