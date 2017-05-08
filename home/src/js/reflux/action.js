import Reflux from 'reflux';

window.ActionBridge = window.ActionBridge || undefined;

const JSBAction = Reflux.createActions({
    gftInfo: {
        children: ['completed', 'failed']   //  异步模式
    },
    tradeInfo: {
        children: ['completed', 'failed']
    },
    deviceInfo: {
        children: ['completed', 'failed']
    },
    queryStock: {
        children: ['completed', 'failed']
    },
    messageComing: {
        children: ['completed', 'failed']
    }
});

JSBAction.gftInfo.listen(function () {
    let _this = this, param = {
        mustLoginWhenNull: 0 // 1(在没有登录时，必须唤起登录框完成登录); 0(无要求)
    };

    window.getGFTInfoSuc = function (str) {
        // console.log(JSON.parse(json));
        let json = str;

        if ('android' == window.JSB_CONFING.mode) {
            json = JSON.parse(str);
        }

        _this.completed(json.data || {});
    };

    window.getGTTInfoErr = function (str) {
        let json = str;

        if ('android' == window.JSB_CONFING.mode) {
            json = JSON.parse(str);
        }

        _this.failed(json);
    };

    if ('android' == window.JSB_CONFING.mode) {
        ActionBridge && ActionBridge.handleAction('get_gft_info', JSON.stringify(param), 'getGFTInfoSuc', 'getGTTInfoErr');
    }
    else if ('ios' == window.JSB_CONFING.mode) {
        ActionBridge && ActionBridge.handleAction('get_gft_info', param, getGFTInfoSuc, getGTTInfoErr);
    }
    else {
        console.log('get_gft_info，非手机平台');
    }
    
});

JSBAction.tradeInfo.listen(function () {
    let _this = this, param = {
        type : 'common_trade_account', // common_trade_account(普通交易账号); credit_trade_account(信用交易账号)
        mustLoginWhenNull: 0, // 1(在没有登录时，必须唤起登录框完成登录); 0(无要求)
        mustLive : 1 //1(账号必须是活动有效的)；0(无要求)
    };

    window.getTradeUserInfoSuc = function (str) {
        // console.log(JSON.parse(json));
        let json = str;

        if ('android' == window.JSB_CONFING.mode) {
            json = JSON.parse(str);
        }

        _this.completed(json.data || {});
    };

    window.getTradeUserInfoErr = function (str) {
        let json = str;

        if ('android' == window.JSB_CONFING.mode) {
            json = JSON.parse(str);
        }

        _this.failed(json);
    };

    if ('android' == window.JSB_CONFING.mode) {
        ActionBridge && ActionBridge.handleAction('get_trade_user_info', JSON.stringify(param), 'getTradeUserInfoSuc', 'getTradeUserInfoErr');
    }
    else if ('ios' == window.JSB_CONFING.mode) {
        ActionBridge && ActionBridge.handleAction('get_trade_user_info', param, getTradeUserInfoSuc, getTradeUserInfoErr);
    }
    else {
        console.log('get_trade_user_info，非手机平台');
    }    

});

JSBAction.deviceInfo.listen(function () {
    let _this = this;

    window.getDeviceInfoSuc = function (str) {
        let json = str;

        if ('android' == window.JSB_CONFING.mode) {
            json = JSON.parse(str);
        }
        
        // console.log(json);

        _this.completed(json.data || {});
    };

    window.getDeviceInfoErr = function (str) {
        let json = str;

        if ('android' == window.JSB_CONFING.mode) {
            json = JSON.parse(str);
        }

        _this.failed(json);
    };

    if ('android' == window.JSB_CONFING.mode) {
        ActionBridge && ActionBridge.handleAction('get_device_info', null, 'getDeviceInfoSuc', 'getDeviceInfoErr');
    }
    else if ('ios' == window.JSB_CONFING.mode) {
        ActionBridge && ActionBridge.handleAction('get_device_info', null, getDeviceInfoSuc, getDeviceInfoErr);
    }
    else {
        console.log('get_device_info，非手机平台');
    }

});

JSBAction.queryStock.listen(function (query) {
    let _this = this, param = {
        value: query
    };

    window.queryStockSuc = function (str) {
        let json = str;

        if ('android' == window.JSB_CONFING.mode) {
            json = JSON.parse(str);
        }
        
        // console.log(json);

        _this.completed(json.data);
    };

    window.queryStockErr = function (str) {
        let json = str;

        if ('android' == window.JSB_CONFING.mode) {
            json = JSON.parse(str);
        }

        _this.failed(json);
    };

    if ('android' == window.JSB_CONFING.mode) {
        ActionBridge && ActionBridge.handleAction('stock_query', JSON.stringify(param), 'queryStockSuc', 'queryStockErr');
    }
    else if ('ios' == window.JSB_CONFING.mode) {
        ActionBridge && ActionBridge.handleAction('stock_query', param, queryStockSuc, queryStockErr);
    }
    else {
        console.log('stock_query，非手机平台');
    }

});

JSBAction.messageComing.listen(function () {
    this.completed();
});

window.messageComing = function () {
    JSBAction.messageComing();
};


export default JSBAction;