import React from 'react';
import $ from 'jquery';
import Sortable from 'sortablejs';

import MaskModal from '../component/maskModal';

import util from '../util';

class Sort extends React.Component {
    constructor(props){
        super(props);

        this.allItems = [];
        this.otherItems = [];
        this.myItems = [];

        this.state = {
            mode: "preview" // preview：预览模式，manage：管理（编辑）模式
        }
        this.gateway = util.gateway();

        this._bind.apply(this, ['manage', 'save', 'remove', 'add', 'closeModal', 'toService']);
    }

    _bind (...methods) {
        methods.forEach((method)=> this[method] = this[method].bind(this));
    }

    manage () {
        let _this = this, myServerEl = document.getElementById('myServeItems');

        this.sortable = Sortable.create(myServerEl, {
            animation: 300,
            scroll: false,
            /*filter: '.server-remove',
            onFilter: function (evt) {
                let item = evt.item, id = item.dataset.id;

                item.parentNode.removeChild(item);
                _this.remove(id);
            },*/
            onEnd: function (evt) {
                let {newIndex, oldIndex} = evt,
                    item = _this.myItems[oldIndex];

                _this.myItems.splice(oldIndex, 1);  // 删除老位置上的元素
                _this.myItems.splice(newIndex, 0, item);    // 在新的位置上插入

                // console.log(_this.myItems);
            }
        });

        this.setState({mode: 'manage'});
    }

    save () {
        this.sortable && this.sortable.destroy();
        this.setState({mode: 'preview'});

        localStorage.setItem('gf-app-home-my-server', JSON.stringify(this.myItems || []));
    }

    remove (id, evt) {
        evt.stopPropagation();

        if (this.myItems.length <= 4) {
            this.setState({
                showMask: true,
                maskTitle: '不能删除了',
                maskText: '推荐服务不能少于四个选项'
            });

            return;
        }

        let ritem;

        this.myItems = this.myItems.filter((item) => {
            item.id == id && (ritem = item);
            
            return (item.id != id);
        });
        this.otherItems.push(ritem);
        
        this.forceUpdate();
        /*$(this.refs.otherServeItems).append(
            `<div data-id=${ritem.id} key=${ritem.id} class='item mode-${mode}'>
                <div>${ritem.name}</div>
                <i class='server-add'>+</i>
            </div>`
        );*/
    }

    add (id, evt) {
        evt.stopPropagation();

        if (this.myItems.length >= 7) {
            this.setState({
                showMask: true,
                maskTitle: '不能添加了',
                maskText: '推荐服务不能多于7个选项'
            });

            return;
        }

        let index = util.findIndex(this.otherItems, id);

        this.myItems.push(this.otherItems[index]);
        this.otherItems.splice(index, 1);

        this.forceUpdate();
    }

    closeModal () {
        this.setState({
            showMask: false
        })
    }

    toService (link, name) {
        if ('manage' == this.state.mode) {
            return;
        }

        util.toService(link, name);
    }

    componentDidMount() {
        let homeCmsConf = JSON.parse(localStorage.getItem('gf-app-home-cms')) || this.gateway.home_cms_config || {};

        this.allItems = homeCmsConf.allService || [];
        this.myItems = JSON.parse(localStorage.getItem('gf-app-home-my-server')) || []

        if (!this.myItems.length) {
            this.myItems = this.allItems.slice(0, 7);    // 默认取前7个
        }
        else {
            this.myItems = this.myItems.filter((item) => util.findInArr(this.allItems, item.id));
            this.myItems = this.allItems.filter((item) => util.findInArr(this.myItems, item.id));
        }
        
        this.otherItems = this.allItems.filter((item) => !util.findInArr(this.myItems, item.id));

        // this.setState({mode: 'manage'}, this.manage);
        this.setState({mode: 'preview'});
    }

    componentWillUnmount() {
        // this.save();
    }

    render() {
        let mode = this.state.mode;
        let myItemsDom = this.myItems.map((item) => {
            return (
                <div key={item.id} className={`item mode-${mode}`} onClick={this.toService.bind(this, item.linkUrl, item.name)}>
                    <img src={item.picUrl} />
                    <p>{item.name}</p>
                    <i className='server-remove' onClick={this.remove.bind(this, item.id)}></i>
                </div>
            );
        });
        let otherItemsDom = this.otherItems.map((item) => {
            return (
                <div key={item.id} className={`item mode-${mode}`} onClick={this.toService.bind(this, item.linkUrl, item.name)}>
                    <img src={item.picUrl} />
                    <p>{item.name}</p>
                    <i className='server-add' onClick={this.add.bind(this, item.id)}></i>
                </div>
            );
        });

        let {showMask, maskTitle, maskText} = this.state;
        let link = `#/home?env=${util.gateway().env}`;

        /*
        {mode == 'preview' ? 
        <div className='manage-save' onClick={this.manage}>管理</div> :
        <div className='manage-save' onClick={this.save}>完成</div>}
         */

        return (
            <section className='page-sort'>
                <header>
                    <div className='return'><a className='left-arrow' href={link}></a></div> 
                    <p className='title'>全部服务{mode == 'preview' ? 
                        <span className='manage-save' onClick={this.manage}>管理</span> :
                        <span className='manage-save' onClick={this.save}>完成</span>}
                    </p>
                </header>

                <div className={`body-wrap ${showMask ? 'no-scroll' : ''}`}>
                    <div className='server-wrap'>
                        <h3>推荐服务</h3>
                        <div className='server-items' ref='myServeItems' id='myServeItems'>
                            {myItemsDom}
                        </div>
                    </div>
                    <div className='server-wrap'>
                        <h3>其他服务</h3>
                        <div className='server-items' ref='otherServeItems' id='otherServeItems'>
                            {otherItemsDom}
                        </div>
                    </div>
                </div>

                {showMask ? <MaskModal closeModal={this.closeModal} title={maskTitle} text={maskText} /> : null}
            </section>      
        );
    }
};

export default Sort;

