import Reflux from 'reflux';
import JSBAction from './action';

class JSBStore extends Reflux.Store{
    constructor() {
        super();
        this.listenables = JSBAction;
        this.state = {};
    }

    onGftInfoCompleted (data) {
        this.setState({gftInfo: data});
    }

    onGftInfoFailed (data) {
        this.setState({err: data});
    }

    onTradeInfoCompleted (data) {
        this.setState({tradeInfo: data});
    }

    onTradeInfoFailed (data) {
        this.setState({err: data});
    }

    onDeviceInfoCompleted (data) {
        this.setState({deviceInfo: data});
    }

    onTradeInfoFailed (data) {
        this.setState({err: data});
    }

    onQueryStockCompleted (data) {
        this.setState({querying: false, list: data, badajax: false});
    }

    onQueryStockFailed (data) {
        this.setState({querying: false, list: null, badajax: true});
    }

    onMessageComingCompleted () {
        this.setState({hasMessage: true});
    }
}

export default JSBStore;