import React from 'react';
import $ from 'jquery';

import util from '../util';

class SquareAd extends React.Component {
    constructor(props){
        super(props);

        this._bind.apply(this, ['toSquareAd']);
    }

    _bind (...methods) {
        methods.forEach((method)=> this[method] = this[method].bind(this));
    }

    toSquareAd (link, name) {
        util.toService(link, name);
    }

    componentDidMount() {
        
    }

    componentWillUnmount() {
        
    }

    render() {
        let squareAd = this.props.squareAd || [];
        let trs = [], tds = [], ad;

        if (!squareAd.length) {
            return null;
        }

        for (let i = 0, len = squareAd.length; i < len && i < 4; i++) {
            ad = squareAd[i];
            tds.push(
                <td key={ad.id} onClick={this.toSquareAd.bind(this, ad.linkUrl, ad.name)}>
                    <div className='ad-item'>
                        <div className='ad-left'>
                            <h5>{ad.name}</h5>
                            <p>{ad.content}</p>
                        </div>
                        <div className='ad-right'>
                            <img src={ad.picUrl}/>
                        </div>
                    </div>
                </td>
            );

            if (i%2 == 1 || i == len-1) {   // 2个一行，最后一行可以是1个 
                trs.push(
                    <tr key={trs.length}>{tds}</tr>
                );

                tds = [];
            }
        }

        return (
            <section className='square-ad'>
                <table>
                    <tbody>{trs}</tbody>
                </table>
            </section>
        );
    }
};

export default SquareAd;

