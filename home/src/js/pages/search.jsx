import React from 'react';
import $ from 'jquery';
import Reflux from 'reflux';

import Loading from '../component/loading';
import JSBStore from '../reflux/store';
import JSBAction from '../reflux/action';

import util from '../util';
import JSBridge from '../jsb';

class Search extends Reflux.Component {
    constructor(props){
        super(props);

        let searchHistory = JSON.parse(localStorage.getItem('gf-app-home-search-history')) || {};

        this.searchHistory = searchHistory;
        this.state = {
            query: '',
            preQuery: '',
            searchType: 'stock',
            list: searchHistory.stock
        };
        this.gateway = util.gateway();

        this.store = JSBStore;

        this._bind.apply(this, ['dealInput', 'clearInput', 'doSearch', 'queryItemClick', 'toggleStock', 'renderUl', 'clearHistory', 'href']);
    }

    _bind (...methods) {
        methods.forEach((method)=> this[method] = this[method].bind(this));
    }

    clearHistory () {
        if (this.state.list) {
            this.setState({list: undefined});
            this.searchHistory[this.state.searchType] = undefined;
        }
    }

    dealInput (evt) {
        let {searchType} = this.state, query = evt.target.value;

        /*if ('stock' == searchType) {
            query = query.replace(/[^\d\w]/g, '');
        }*/
        this.setState({query: query});
    }

    clearInput () {
        this.setState({query: ''});
    }

    doSearch () {
        let url, {searchType: type, query, preQuery, badajax} = this.state;
        let _this = this, gateway = this.gateway;

        if (!badajax && (!query || query == preQuery)) {
            return;
        }

        this.setState({querying: true, preQuery: query});

        var doAjax = function (url) {
            $.ajax({
                url: url,
                // type: 'GET',
                // dataType: 'json',
                timeout: 2000
            })
            .done((json) => {
                _this.setState({querying: false, list: json.items || json.data || json, badajax: false});
            })
            .fail(() => {
                _this.setState({querying: false, list: null, badajax: true});
            });
        };

        switch (type) {
            case 'money':
            case 'fund':
                url = `${gateway.store_search_url.url}&type=${type}&i=${query}`;
                doAjax(url);

                break;

            case 'stock':
                JSBAction.queryStock(query);
                break;
            /*case 'stock':
                url = `${gateway.stock_search_url.url}&type=${type}&q=${query}`;
                doAjax(url);

                break;*/

            case 'shop':
                url = `${gateway.shop_search_url.url}?type=${type}&terms=${query}`;
                doAjax(url);

                break;

            case 'portfolio':
                url = `${gateway.portfolio_search_url.url}&type=${type}&q=${query}`;
                doAjax(url);

                break;

            case 'info': 
                url = `${gateway.info_search_url.url}&q=${query}`;
                doAjax(url);

                break;
                
            default:
                // statements_def
                break;
        }
    }

    queryItemClick (index, id) {
        let {searchType, list} = this.state,
            arr = this.searchHistory[searchType] || [];

        let findInArr = function (arr, id) {
            let b = undefined;

            switch (searchType) {
                case 'money':
                case 'fund':
                    for (let i = 0, len = arr.length; i < len; i++) {
                        if (arr[i][2] == id) {
                            b = arr[i];
                            break;
                        }
                    }
                    break;
                
                case 'stock':
                    for (let i = 0, len = arr.length; i < len; i++) {
                        if (`${arr[i].market}_${arr[i].code}` == id) {
                            b = arr[i];
                            break;
                        }
                    }
                    break;

                case 'shop':
                case 'portfolio':
                case 'info':
                    b = util.findInArr(arr, id);
                    break;

                default:
                    // statements_def
                    break;
            }

            return b;
        };

        if (!findInArr(arr, id)) {
            arr.push(list[index]);
            this.searchHistory[searchType] = arr;
        }

        // 跳转页面
        this.href(list[index]);  
    }

    toggleStock (index, evt) {
        let {list} = this.state, stock = list[index];

        if (!stock) {
            return;
        }

        JSBridge.toggleFavStock(stock.market, stock.code, stock.fav_flag);

        stock.fav_flag = '' + (+stock.fav_flag + 1) % 2;
        $(evt.target).toggleClass('add');

        evt.stopPropagation();
    }

    href (item) {
        let gateway = this.gateway, url, param;

        switch (this.state.searchType) {
            case 'money':
                url = gateway.money_detail_prevurl.url + item[2];
                JSBridge.openWebvier(url, '理财');
                break;
            case 'fund':
                url = gateway.fund_detail_prevurl.url + item[2];
                JSBridge.openWebvier(url, '基金'); 
                break;
            case 'portfolio':
                url = `${gateway.portfolio_detail_prevurl.url}${item.id}/0`;
                JSBridge.openWebvier(url, '实盘组合'); 
                break;
            case 'shop':
                url = `${gateway.shop_detail_prevurl.url}${item.id}`;
                JSBridge.openWebvier(url, '淘金圈'); 
                break;
            case 'stock':
                param = {market: item.market, stockCode: item.code, uiType: 1};
                JSBridge.openNative('quote_query', param); 
                break;
            case 'info':
                param = {gfNewsId: item.id};
                JSBridge.openNative('info', param); 
                break;

            default:
                // statements_def
                break;
        }
    }

    componentDidMount() {
        let _this = this;

        this.searchSwiper = new Swiper ('.swiper-container', {
            // loop: true,
            slidesPerView: 3,
            centeredSlides: true,
            onSlideChangeEnd: function (swiper) {
                // 股票，基金，理财，组合，网店，资讯
                // console.log(swiper.activeIndex);
                let searchType = ['stock', 'fund', 'money', 'portfolio', 'shop', 'info'][swiper.activeIndex] || 'stock'; // swiper.realIndex
                let list = _this.searchHistory[searchType];

                _this.setState({
                    searchType,
                    // query: '',
                    preQuery: '',
                    list: list
                });
            },
            onClick: function (swiper) {
                _this.searchSwiper.slideTo(swiper.clickedIndex, 500);
            }
        });
    }

    componentWillUnmount() {
        localStorage.setItem('gf-app-home-search-history', JSON.stringify(this.searchHistory || {}));
    }

    renderUl () {
        let {query, preQuery, searchType, querying, list, badajax} = this.state;

        if (querying) {
            return (
                <div className='hint searching'>
                    <div className='img'>
                        <Loading />
                    </div>
                    <p>努力搜索中...</p> 
                </div>
            );
        }

        if (!list || !list.length) {
            return (
                preQuery ? 
                <div className='hint not-found'>
                    <div className='img'></div>
                    <p>{badajax ? '接口异常，请重新搜索' : '暂无相关信息，换个关键词试试'}</p>
                </div> : 
                <div className='hint no-history'>
                    <div className='img'></div>
                    <p>您还没有搜索历史</p>
                </div>
            );
        }
        
        let _this = this, lis;

        lis = list.map((item, i) => {
            let li;

            switch (searchType) {
                case 'money':
                case 'fund':
                    li = (
                        <li key={item[2]} onClick={_this.queryItemClick.bind(_this, i, item[2])}>
                            <h3 className='title'>{item[0]}</h3>
                            <p className='code'>{item[2]}</p>
                        </li>
                    );
                    break;

                case 'stock':
                    li = (
                        <li key={`${item.market}_${item.code}`} onClick={_this.queryItemClick.bind(_this, i, `${item.market}_${item.code}`)}>
                            <h3 className='title'>
                                <p className='stock-name'>{item.name}</p>
                                <p className='stock-code'>
                                    <span>{item.code}</span>
                                    <i className={item.market}></i>
                                </p>
                            </h3>
                            <p className={`ops ${+item.fav_flag ? '' : 'add'}`} onClick={this.toggleStock.bind(_this, i)}></p>
                        </li>
                    );
                    break;

                case 'shop':
                    li = (
                        <li key={item.id} onClick={_this.queryItemClick.bind(_this, i, item.id)}>
                            <h3 className='title'>{item.name}</h3>
                            <p className='code grey'>{item.ownerName}</p>
                        </li>
                    );
                    break;

                case 'portfolio':
                    li = (
                        <li key={item.id} onClick={_this.queryItemClick.bind(_this, i, item.id)}>
                            <h3 className='title'>{item.name}</h3>
                            <p className='yield'>
                                <strong className={item.yield<0 ? 'nagetive': ''}>{(item.yield*100).toFixed(2)}%</strong>
                                <span>总收益</span>
                            </p>
                        </li>
                    );
                    break;

                case 'info':
                    li = (
                        <li key={item.id} onClick={_this.queryItemClick.bind(_this, i, item.id)}>
                            <h3 className='title'>{item.title}</h3>
                        </li>
                    );
                    break;

                default:
                    // statements_def
                    break;
            }

            return li;
        });

        return (
            <ul className='query-list'>{lis}</ul>
        );
    }

    render () {
        let {preQuery, list} = this.state;
        let link = `#/home?env=${this.gateway.env}`;

        return (
            <section className='page-search'>
                <header> 
                    <div className='return'><a className='left-arrow' href={link}></a></div>
                    <div className="swiper-container">
                        <div className="swiper-wrapper">
                            <div className="swiper-slide">股票</div>
                            <div className="swiper-slide">基金</div>
                            <div className="swiper-slide">理财</div>
                            <div className="swiper-slide">组合</div>
                            <div className="swiper-slide">店铺</div>
                            <div className="swiper-slide">资讯</div>
                        </div>
                    </div>
                </header>

                <div className='body-wrap'>
                    <div className='search-line'>
                        <div className='input-widget'>
                            <div className='icon search-grey'></div>
                            <input type='text' placeholder='股票 \ 基金 \ 理财 \ 组合 \ 店铺 \ 资讯' onChange={this.dealInput} value={this.state.query}></input>
                            <div className='icon clear-input' onClick={this.clearInput}></div>
                        </div>
                        <button onClick={this.doSearch}>搜索</button>
                    </div>

                    <div className='scroll-section'>
                        {this.renderUl()} 
                        {list && !preQuery ? <p className='clear-history' onClick={this.clearHistory}>清空搜索历史</p> : null}
                    </div>
                </div>
            </section>     
        );    
    }
};

export default Search;