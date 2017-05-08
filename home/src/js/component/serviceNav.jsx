import React from 'react';
import $ from 'jquery';

import util from '../util';
import JSBridge from '../jsb';

class ServiceNav extends React.Component {
    constructor(props){
        super(props);

        this.allItems = props.allService || [];
        this.myItems = JSON.parse(localStorage.getItem('gf-app-home-my-server')) || [];

        this._bind.apply(this, ['adaptNav']);
    }

    _bind (...methods) {
        methods.forEach((method)=> this[method] = this[method].bind(this));
    }

    adaptNav (allItems) {
        this.allItems = allItems;

        let findInArr = function (arr, id) {
            // let b = arr.find((item) => item.id==id); // 在低版本的安卓机上不支持find方法
            let b;

            for (let i = 0, len = arr.length; i < len; i++) {
                if (arr[i].id == id) {
                    b = arr[i];
                    break;
                }
            }

            return b;
        };

        if (!this.myItems.length) {
            this.myItems = allItems.slice(0, 7);    // 默认取前7个
        }
        else {
            // this.myItems = this.myItems.filter((item) => findInArr(allItems, item.id));
            this.myItems = allItems.filter((item) => findInArr(this.myItems, item.id));
        }

        // localStorage.setItem('gf-app-home-my-server', JSON.stringify(this.myItems || []));
    }

    componentDidMount() {
        this.adaptNav(this.allItems);
        this.forceUpdate();
    }

    componentWillUnmount() {
        
    }

    componentWillReceiveProps (nextProps) { // cms接口返回的最新数据
        if (!nextProps.allService || !nextProps.allService.length) {
            return;
        }

        this.adaptNav(nextProps.allService); 
    }

    toSort () {
        window.location.href = `#/sort?env=${util.gateway().env}`;
    }

    toService (link, name) {
        util.toService(link, name);
    }

    render() {
        let myItemsDom = this.myItems.map((item) => {
            return (
                <div key={item.id} className='item' onClick={this.toService.bind(this, item.linkUrl, item.name)}>
                    <img alt={item.name} src={item.picUrl}></img>
                    <p>{item.name}</p>
                </div>
            );
        });

        myItemsDom.push(
            <div key='see-all' className='item' onClick={this.toSort}>
                <img alt='全部' src={require('../../img/service-all.png')}></img>
                <p>全部</p>
            </div>
        );

        return (
            <div className='server-items' ref='myServeItems'>
                {myItemsDom}
            </div>
        );
    }
};

export default ServiceNav;

