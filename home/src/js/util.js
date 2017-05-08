import JSBridge from './jsb';

const gateway = function () {
    let urls, hash = location.hash; 

    // if (hash.indexOf('env=local') > 0) {
    //     urls = require('../gateway/local.js');
    // }
    // else if (hash.indexOf('env=dev') > 0) {
    //     urls = require('../gateway/dev.js');
    // }
    // else if (hash.indexOf('env=uat') > 0) {
    //     urls = require('../gateway/uat.js');
    // }
    // else {
        urls = require('../gateway/release.js');
    // }

    return urls.default;
};

const isFirstLoad = function () {
    let hash = location.hash;

    return true;

    // return hash.indexOf('firstload=true') > 0;
};

const findInArr = function (arr, id) {
    // let b = arr.find((item) => item.id==id); // 在低版本的安卓机上不支持find方法
    let b = undefined;

    for (let i = 0, len = arr.length; i < len; i++) {
        if (arr[i].id == id) {
            b = arr[i];
            break;
        }
    }

    return b;
};

const findIndex = function (arr, id) {
    // let index = arr.findIndex((item) => item.id == id); // 在低版本的安卓机上不支持findIndex方法
    let b = -1;

    for (let i = 0, len = arr.length; i < len; i++) {
        if (arr[i].id == id) {
            b = i;
            break;
        }
    }

    return b;
};

const toService = function (link, name) {
    /*if (link.indexOf('<%time%>') > -1) {
        link = link.replace('<%time%>', (new Date()).getTime());
    }*/

    let url;

    if (0 == link.indexOf('web:')) {
        url = link.substr(4);
        url = url.replace('<%time%>', (new Date()).getTime());
        JSBridge.openWebvier(url, name);
    }
    else if (0 == link.indexOf('native:')) {
        var index, paramStr, arrTemp, arrTemp1, param = null;

        url = link.substr(7);
        index = url.indexOf('?');

        if (index >= 0) {
            paramStr = url.substr(index+1);
            url = url.substr(0, index);
            arrTemp = paramStr.split('&');
            param = {};

            arrTemp.forEach((it, i) => {
                arrTemp1 = it.split('=');
                param[arrTemp1[0]] = arrTemp1[1];
            });

            if ('voiced_info' == url) {
                param.playList = [param.playList];
                param.playIndex = 0;
            }
        }

        JSBridge.openNative(url, param);
    }
    else if (0 == link.indexOf('arms:')) {
        var index, paramStr, arrTemp, arrTemp1, param = {};

        url = link.substr(5);
        param.bizId = url;
        index = url.indexOf('?');

        if (index >= 0) {
            paramStr = url.substr(index+1);
            url = url.substr(0, index);
            arrTemp = paramStr.split('&');

            arrTemp.forEach((it, i) => {
                arrTemp1 = it.split('=');
                param[arrTemp1[0]] = arrTemp1[1];
            });
        }

        JSBridge.openArmsNative(param);
    }
}; 


export default {gateway, isFirstLoad, findInArr, findIndex, toService};
