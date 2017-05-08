//打包到手机，发布正式版本时用到的
//
const gateWay = {
    home_cms_config: {
        // 下面是功能清单的默认配置
        allService: [
            {
                id: "58298085f5a46516d43229a2",
                name: "网易超市",
                order: 1,
                target: 1,
                picUrl: require("../img/nav-icon/fina-market.png"),
                linkUrl: "web:http://www.163.com"
            },
            {
                id: "5858a300f776484736fcd430",
                name: "百度搜索",
                order: 2,
                target: 1,
                picUrl: require("../img/nav-icon/ipo.png"),
                linkUrl: "web:https://www.baidu.com"
            },
            {
                id: "582980c0f5a46516d43229aa",
                name: "百度贴吧",
                order: 3,
                target: 1,
                picUrl: require("../img/nav-icon/biz.png"),
                linkUrl: "web:https://www.baidu.com"
            },
            {
                id: "582980bff5a46516d43229a8",
                name: "百度地图",
                order: 4,
                target: 1,
                picUrl: require("../img/nav-icon/account.png"),
                linkUrl: "web:https://www.baidu.com"
            },
            {
                id: "582980bef5a46516d43229a6",
                name: "网易音乐",
                order: 5,
                target: 1,
                picUrl: require("../img/nav-icon/betaniu.png"),
                linkUrl: "web:http://www.163.com"
            },
            {
                id: "5859f233f776484736fcd444",
                name: "新浪",
                order: 6,
                target: 1,
                picUrl: require("../img/nav-icon/shop.png"),
                linkUrl: "web:http://www.sina.com"
            },
            {
                id: "58539111f776484736fcd41f",
                name: "新浪财经",
                order: 7,
                target: 1,
                picUrl: require("../img/nav-icon/position.png"),
                linkUrl: "web:http://www.sina.com"
            },
            {
                id: "5859f261f776484736fcd447",
                name: "新浪微博",
                order: 8,
                target: 2,
                picUrl: require("../img/nav-icon/market.png"),
                linkUrl: "web:http://www.sina.com"
            },
            {
                id: "5859f28ef776484736fcd44a",
                name: "新浪博客",
                order: 9,
                target: 2,
                picUrl: require("../img/nav-icon/cash.png"),
                linkUrl: "web:http://www.sina.com"
            },
            {
                id: "5859f2e4f776484736fcd450",
                name: "新浪资讯",
                order: 10,
                target: 2,
                picUrl: require("../img/nav-icon/fund.png"),
                linkUrl: "web:http://www.sina.com"
            },
            {
                id: "5829809df5a46516d43229a4",
                name: "百度百科",
                order: 11,
                target: 2,
                picUrl: require("../img/nav-icon/finance.png"),
                linkUrl: "web:https://www.baidu.com"
            },
            {
                id: "58298065f5a46516d43229a0",
                name: "百度视频",
                order: 12,
                target: 2,
                picUrl: require("../img/nav-icon/info.png"),
                linkUrl: "web:https://www.baidu.com"
            },
            {
                id: "5859f2acf776484736fcd44d",
                name: "百度新闻",
                order: 13,
                target: 2,
                picUrl: require("../img/nav-icon/voice.png"),
                linkUrl: "web:https://www.baidu.com"
            },
            {
                id: "5859f320f776484736fcd453",
                name: "百度音乐",
                order: 14,
                target: 2,
                picUrl: require("../img/nav-icon/jf.png"),
                linkUrl: "web:https://www.baidu.com"
            },
            {
                id: "587848f3f776484f7ff05751",
                name: "百度糯米",
                order: 15,
                target: 2,
                picUrl: require("../img/nav-icon/cp.png"),
                linkUrl: "web:https://www.baidu.com"
            },
            {
                id: "585379d9f776484736fcd41d",
                name: "百度云",
                order: 16,
                target: 2,
                picUrl: require("../img/nav-icon/sms.png"),
                linkUrl: "web:https://www.baidu.com"
            },           
            {
                id: "5859f355f776484736fcd456",
                name: "百度广告",
                order: 17,
                target: 2,
                picUrl: require("../img/nav-icon/quote.png"),
                linkUrl: "web:https://www.baidu.com"
            }
        ],
        // 下面是有问必答默认配置
        bida: {
            id: "5874981ef776484f7ff056c8",
            name: "百度广告赚了多少钱（趋势分析）？",
            content: "昨日5000+人提问该话题",
            order: 1
        },
        // 下面是广告项的默认配置
        banner: [
            {
                id: "5875816df776484f7ff056f3",
                name: "轮播广告",
                content: "测试_qulong",
                category: 1,
                order: 1,
                target: 1,
                picUrl: "http://cms-bucket.nosdn.127.net/e78c8b6185b14fd9ab0350b3b5ddc95120170508202923.jpeg?imageView&thumbnail=750y380&quality=45&type=webp&interlace=1&enlarge=1",
                linkUrl: "web:https://www.baidu.com",
                linkType: 0
            },
            {
                id: "587587ccf776484f7ff056fd",
                name: "轮播广告03",
                content: "指向行情",
                category: 1,
                order: 3,
                target: 1,
                picUrl: "http://cms-bucket.nosdn.127.net/388bb9af54c44302ac3eca3fd7e58c8020170508172939.jpeg?imageView&thumbnail=750y380&quality=45&type=webp&interlace=1&enlarge=1",
                linkUrl: "web:https://www.baidu.com",
                linkType: 0
            },
            {
                id: "5875f50cf776484f7ff05716",
                name: "真的没有显示出来",
                content: "发发发",
                category: 1,
                order: 4,
                target: 1,
                picUrl: "http://cms-bucket.nosdn.127.net/317cfad31cb74c2fb3885cbbc5a4004c20170508163209.jpeg?imageView&thumbnail=750y380&quality=45&type=webp&interlace=1&enlarge=1",
                linkUrl: "web:https://www.baidu.com",
                linkType: 0
            },
            {
                id: "5875f445f776484f7ff05710",
                name: "栏目没有显示出来",
                content: "福晶科技家",
                category: 1,
                order: 5,
                target: 1,
                picUrl: "http://cms-bucket.nosdn.127.net/3fdc64219f4f4255bd07ddee728a5f7f20170508103839.jpeg?imageView&thumbnail=750y380&quality=45&type=webp&interlace=1&enlarge=1",
                linkUrl: "web:https://www.baidu.com",
                linkType: 0
            }
        ],
        warning: [
            {
                id: "587497faf776484f7ff056c6",
                name: "2017年01月10日最新文字条广告_",
                content: "投资顾问",
                category: 2,
                order: 1,
                target: 1,
                picUrl: "",
                linkUrl: "web:https://www.baidu.com",
                linkType: 0
            }
        ],
        squareAd: [
            {
                id: "58749657f776484f7ff056c2",
                name: "CMS后台可配_行情",
                content: "测试四方块广告页",
                category: 3,
                order: 1,
                target: 1,
                picUrl: "http://cms-bucket.nosdn.127.net/116e343158944e9b87cd20ae7aee58c920170508103109.jpeg?imageView&thumbnail=220y165&quality=45&type=webp&interlace=1&enlarge=1",
                linkUrl: "web:https://www.baidu.com",
                linkType: 0
            },
            {
                id: "58749779f776484f7ff056c4",
                name: "CMS后台可配",
                content: "广告指向页面",
                category: 3,
                order: 2,
                target: 1,
                picUrl: "http://cms-bucket.nosdn.127.net/95c0a752e8fa4aecbaaaa84d08b5e03320170508103127.jpeg?imageView&thumbnail=220y165&quality=45&type=webp&interlace=1&enlarge=1",
                linkUrl: "web:https://www.baidu.com",
                linkType: 0
            },
            {
                id: "5874a761f776484f7ff056df",
                name: "四方格广告_",
                content: "",
                category: 3,
                order: 3,
                target: 1,
                picUrl: "http://cms-bucket.nosdn.127.net/c99ff192200a4694b67d8f44a01a070420170508103145.jpeg?imageView&thumbnail=220y165&quality=45&type=webp&interlace=1&enlarge=1",
                linkUrl: "web:https://www.baidu.com",
                linkType: 1
            },
            {
                id: "5874a7fdf776484f7ff056e1",
                name: "4444",
                content: "5555",
                category: 3,
                order: 4,
                target: 1,
                picUrl: "http://cms-bucket.nosdn.127.net/31ff5d31a3fa40c7aee750b82b16df7520170508181306.png?imageView&thumbnail=220y165&quality=45&type=webp&interlace=1&enlarge=1",
                linkUrl: "web:https://www.baidu.com",
                linkType: 0
            }
        ]
    }
};

gateWay.env = 'release';

export default gateWay;