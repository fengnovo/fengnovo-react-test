export var transTime = (ts) => {
    let objD = new Date(ts);
    let str;
    let time = new Date().getTime() - objD.getTime(); //现在的时间-传入的时间 = 相差的时间（单位 = 毫秒）
    if (time < 0) {
        return '';
    } else if (time / 1000 < 60) {
        return '刚刚';
    } else if ((time / 60000) < 60) {
        return parseInt((time / 60000)) + '分钟前';
    } else if ((time / 3600000) < 24) {
        return parseInt(time / 3600000) + '小时前';
    } else {
        let yy = objD.getYear();
        if(yy<1900) yy = yy+1900;
        let MM = objD.getMonth()+1;
        if(MM<10) MM = '0' + MM;
        let dd = objD.getDate();
        if(dd<10) dd = '0' + dd;
        let hh = objD.getHours();
        if(hh<10) hh = '0' + hh;
        let mm = objD.getMinutes();
        if(mm<10) mm = '0' + mm;
        let ss = objD.getSeconds();
        if(ss<10) ss = '0' + ss;
        str =  yy + "-" + MM + "-" + dd + " " + hh + ":" + mm + ":" + ss;
        // str =  MM + "-" + dd + " " + hh + ":" + mm;
        return(str);
    }

}