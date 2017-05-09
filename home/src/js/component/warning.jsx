import React from 'react';
import $ from 'jquery';

import util from '../util';
import JSBridge from '../jsb';

class Warning extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            ipoNum: localStorage.getItem('gf-app-home-iponum') || 0   
        };
        this.gateway = util.gateway();

        this._bind.apply(this, ['toWarning', 'toIPO']);
    }

    _bind (...methods) {
        methods.forEach((method)=> this[method] = this[method].bind(this));
    }

    toWarning (link) {
        util.toService(link, '广发资讯');
    }

    toIPO () {
        let gateway = this.gateway;

        JSBridge.openWebvier(gateway.buy_new_stock.url, gateway.buy_new_stock.name);
    }

    componentDidMount() {
        if (!util.isFirstLoad()) {
            return;
        }

    }

    componentWillUnmount() {
        
    }

    render() {
        let warning = this.props.warning || [], ipoNum = this.state.ipoNum || 0;
        let warnlist = warning.map((item) => {
            return (
                <div className='item' key={item.id} onClick={this.toWarning.bind(this, item.linkUrl)}>
                    <i className='icon-bell'></i>
                    <p className='title'>{item.name}</p>
                    <i className='right-arrow'></i>
                </div>
            );
        });

        return (
            <section className='warning'>
                <div className='item' onClick={this.toIPO}>
                    <i className='icon-ipo'></i>
                    <p className='title'>新股申购</p>
                    <p className='ipo-num'>今日<strong>{ipoNum}</strong>只</p>
                    <i className='right-arrow'></i>
                </div>
                {warnlist}
            </section>
        );
    }
};

export default Warning;

