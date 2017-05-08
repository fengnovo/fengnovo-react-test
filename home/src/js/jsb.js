window.nullFun = function () {};

const JSBridge = {
    openWebvier: function (url, name, bAudio) {
        if (!url) {
            return;
        }

        let param = {targetUrl: url, title: name || '', needAudioSession: bAudio || false};

        if (window.JSB_CONFING.mode == 'android') {
            ActionBridge && ActionBridge.handleAction('open_url', JSON.stringify(param), 'nullFun', 'nullFun');
        }
        else if (window.JSB_CONFING.mode == 'ios') {
            ActionBridge && ActionBridge.handleAction('open_url', param, window.nullFun, window.nullFun);
        }
        else {
            console.log('非手机平台');
            // window.open(url);
        }
    },

    openArmsNative: function (param=null) {
        if (!param || !param.bizId) return;

        if (window.JSB_CONFING.mode == 'android') {
            ActionBridge && ActionBridge.handleAction('open_arms_app', JSON.stringify(param), 'nullFun', 'nullFun');
        }
        else if (window.JSB_CONFING.mode == 'ios') {
            ActionBridge && ActionBridge.handleAction('open_arms_app', param, window.nullFun, window.nullFun);
        }
        else {
            console.log('非手机平台');
        }
    },

    openNative: function (id, param=null) {
        if (!id) return;

        if (window.JSB_CONFING.mode == 'android') {
            ActionBridge && ActionBridge.handleAction(id, JSON.stringify(param), 'nullFun', 'nullFun');
        }
        else if (window.JSB_CONFING.mode == 'ios') {
            ActionBridge && ActionBridge.handleAction(id, param, window.nullFun, window.nullFun);
        }
        else {
            console.log('非手机平台');
        }
    },

    closeWebview: function () {
        if (window.JSB_CONFING.mode == 'android') {
            JavaScriptBridge.closeWebView();
        }
        else if (window.JSB_CONFING.mode == 'ios') {
            // getBridge().callHandler("webClose");
            JavaScriptBridge.webClose();
        }
        else {
            console.log('非手机平台');
            // window.close();
        }
    },

    toggleFavStock: function (market, stockCode, favFlag=0) {
        if (!market || !stockCode) {
            return;
        }

        var handleName = +favFlag ? 'del_fav_stock' : 'add_fav_stock',
            param = {market, stockCode};

        if (window.JSB_CONFING.mode == 'android') {
            ActionBridge && ActionBridge.handleAction(handleName, JSON.stringify(param), 'nullFun', 'nullFun');
        }
        else if (window.JSB_CONFING.mode == 'ios') {
            ActionBridge && ActionBridge.handleAction(handleName, param, window.nullFun, window.nullFun);
        }
        else {
            console.log('非手机平台------' + handleName);
        }
          
    }
};

export default JSBridge;
