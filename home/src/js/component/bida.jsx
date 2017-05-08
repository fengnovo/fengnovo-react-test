import React from 'react';
import $ from 'jquery';

import util from '../util';
import JSBridge from '../jsb';

class BiDa extends React.Component {
    constructor(props){
        super(props);

        /*this.state = {
            bida: props.bida || {}
        };*/
        this.gateway = util.gateway();

        this._bind.apply(this, ['toBiDa']);
    }

    _bind (...methods) {
        methods.forEach((method)=> this[method] = this[method].bind(this));
    }

    toBiDa () {
        let gateway = this.gateway;

        JSBridge.openWebvier(gateway.sms.url, gateway.sms.name);
    }

    componentDidMount() {
        
    }

    componentWillUnmount() {
        
    }

    /*componentWillReceiveProps (nextProps) { // cms接口返回的最新数据
        this.setState({
            bida: nextProps.bida
        });   
    }*/

    render() {
        let bida = this.props.bida || {};

        if (!bida.id) {
            return null;
        }

        return (
            <section className='bida' onClick={this.toBiDa}>
                <p className='corner'></p>
                <div className='wrap'>
                    <div className='wrap-left'>
                        <h5>{bida.name}</h5>
                        <p><i className='fire'></i>{bida.content}</p>
                    </div>
                    <div className='wrap-right'>
                        <h5 className='btn'>我要问</h5>
                        <p>{7000 || bida.number}网民在线</p>
                    </div>
                </div>
            </section>
        );
    }
};

export default BiDa;

