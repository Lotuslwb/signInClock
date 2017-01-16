var WXInitFunc = function () {
    var wxConfig = require('../wx/WXConfig');
    var WechatAPI = require('wechat-api');
    var api = new WechatAPI(wxConfig.APPID, wxConfig.APPSECRET);
    var Menu = {
        "button": [
            {
                "name": "英语宝典",
                "sub_button": [
                    {
                        "type": "view",
                        "name": "趣味英语",
                        "url": "https://mp.weixin.qq.com/mp/homepage?__biz=MjM5MDkyMTk5MQ==&hid=1&sn=624e4e6dbb5c0aaf3efe2a453f160536&uin=MjEzMDQ1MzkwNA==&key=4c9db2d052ce2383cc361b3e62fd8a75bef8a8348faa38dd2bef3e28ae11811e97ec3ae238acfed6b4197c0c2cff7155b50bc1a0e546ff6097ecf1e033dfa731e7042f47ba5f7c8a89f7ffa0bcf29b56&devicetype=iOS10.2&version=16050321&lang=zh_CN&nettype=WIFI&fontScale=100&pass_ticket=h8OyVvvRfeiN2m7DiCpkKAcBaUzUQxy%2BpS8O%2FqcRsdfVoJh9V72eOrWsAc1RHKvU&wx_header=1&scene=1"
                    },
                    {
                        "type": "view",
                        "name": "家长课堂",
                        "url": "https://mp.weixin.qq.com/mp/homepage?__biz=MjM5MDkyMTk5MQ==&hid=2&sn=ff4d86022b7ebc3a8358801950887e8e&uin=MjEzMDQ1MzkwNA==&key=4c9db2d052ce2383123a217167097281a9344fab4bf30da46fe12ddab9176d5a9b11131ecdd6ac7f708595b82ce522eb399bf5d298467265bf6e06bb1743a1268c69ca606224ec5d2268c957b41f033c&devicetype=iOS10.2&version=16050321&lang=zh_CN&nettype=WIFI&fontScale=100&pass_ticket=h8OyVvvRfeiN2m7DiCpkKAcBaUzUQxy%2BpS8O%2FqcRsdfVoJh9V72eOrWsAc1RHKvU&wx_header=1&scene=1"
                    }, {
                        "type": "view",
                        "name": "小E推荐",
                        "url": "https://mp.weixin.qq.com/mp/homepage?__biz=MjM5MDkyMTk5MQ==&hid=3&sn=bbd503ec52d1204cd3d68ccb8d202ea4&uin=MjEzMDQ1MzkwNA==&key=0ff5f4477b17d5ed29397ee4f9a8ee1ba9e1432b7de989f967fa3280eb0af56201efe2ae7057a58d8b9d46d3e44edf09e602fb923369b067d2155b5d91089544c32ae5fe03970172c03678ce6a6551ea&devicetype=iOS10.2&version=16050321&lang=zh_CN&nettype=WIFI&fontScale=100&pass_ticket=h8OyVvvRfeiN2m7DiCpkKAcBaUzUQxy%2BpS8O%2FqcRsdfVoJh9V72eOrWsAc1RHKvU&wx_header=1&scene=1"
                    }, {
                        "type": "view",
                        "name": "影音视听",
                        "url": "https://mp.weixin.qq.com/mp/homepage?__biz=MjM5MDkyMTk5MQ==&hid=4&sn=9e2ce18a97a1ec8c8e8d707dd54b9e7d&uin=MjEzMDQ1MzkwNA==&key=fc73eacee3c8d91fca74be0cb53503a79f3af4d8ecbdabb5cd21dfc5d13dd6c0c201877c9b081fbe91f8a659460a14529c4c19d027b668697d53055823204c323f545fc46ea851d3941f0e2846a9930a&devicetype=iOS10.2&version=16050321&lang=zh_CN&nettype=WIFI&fontScale=100&pass_ticket=h8OyVvvRfeiN2m7DiCpkKAcBaUzUQxy%2BpS8O%2FqcRsdfVoJh9V72eOrWsAc1RHKvU&wx_header=1&scene=1"
                    }, {
                        "type": "view",
                        "name": "一键搜索更多内容",
                        "url": "http://data.newrank.cn/m/s.html?s=NyoqNjQ6LjA8"
                    }]
            },
            {
                "name": "最新优惠",
                "sub_button": [
                    {
                        "type": "view",
                        "name": "最新优惠",
                        "url": "http://www.ef.com.cn/englishfirst/landing/mobilewinter17b?pid=c8cd260e2a5196a3675ac5f5b9aa9c3f&etag=EFCN_Wint17_KidsOwn-SNS-WeChat-Menu-Freecourse-testcn_mobilewinter17B"
                    }, {
                        "type": "view",
                        "name": "预约免费活动课",
                        "url": "http://www.ef.com.cn/englishfirst/landing/mobilelifeclub?ctr=cn&lng=cs&name=anna&pid=123&phone=110&etag=EFCN_Wint17_KidsOwn-SNS-WeChat-Nov-wclh"
                    }, {
                        "type": "view",
                        "name": "免费下载",
                        "url": "http://baike.ef.com.cn/archive/tag/xiazaiziliao?etag=EFCN_Wint17_KidsOwn-SNS-WeChat-Baike"
                    }, {
                        "type": "view",
                        "name": "往期精彩活动",
                        "url": "https://mp.weixin.qq.com/mp/homepage?__biz=MjM5MDkyMTk5MQ==&hid=5&sn=d968d2083ae08f7bfc02ea71f53d15b1&uin=MjEzMDQ1MzkwNA==&key=0ff5f4477b17d5edc25a2df08060b821162378e849a45052dcaa557c3983e2c8f9a8752a53bc6a21d15f0630455fd46411a54c66d1356f6a275b9876ccbf2c446400122b3700ced2853a33ee6a403eed&devicetype=iOS10.2&version=16050321&lang=zh_CN&nettype=WIFI&fontScale=100&pass_ticket=h8OyVvvRfeiN2m7DiCpkKAcBaUzUQxy%2BpS8O%2FqcRsdfVoJh9V72eOrWsAc1RHKvU&wx_header=1&scene=1"
                    },
                ]
            }, {
                'name': '胡歌@你',
                "sub_button": [
                    {
                        "type": "view",
                        "name": "在英孚遇见胡歌",
                        "url": "https://mp.weixin.qq.com/s?__biz=MjM5MDkyMTk5MQ==&mid=2650867319&idx=1&sn=5ee48d675fb5cdd721c1f4de377f3270&mpshare=1&scene=1&srcid=0116pynOO52YazSQK0BUibiR&key=dc8f4bb13741a2a441ab0e8a59d3aad14abb3cd395a00748fc8738c710f977b3875152351929264414aaea1dfac0b8120bf6a42be805c2bea03a94a89a9cf81d3c955eae70fed9daea6db62e5e5d90e0&ascene=0&uin=MjEzMDQ1MzkwNA%3D%3D&devicetype=iMac+MacBookPro12%2C1+OSX+OSX+10.11.6+build(15G31)&version=12010210&nettype=WIFI&fontScale=100&pass_ticket=h8OyVvvRfeiN2m7DiCpkKAcBaUzUQxy%2BpS8O%2FqcRsdfVoJh9V72eOrWsAc1RHKvU"
                    },
                    {
                        "type": "view",
                        "name": "最萌胡歌歌",
                        "url": "https://mp.weixin.qq.com/s?__biz=MjM5MDkyMTk5MQ==&mid=2650867557&idx=1&sn=a80fefc49cd21e5b4bc4ec39ff0906c3&mpshare=1&scene=1&srcid=0116mTqBeMedDFxGXAPt12je&key=7bf7b0f13d9b52e8cbd1facbba778619ff0415ef7470cbf74ff0c5be0fcf6238ca77f6db130de77847a46008582c54dc1d399172aa27c379c903e2e2864d603e41bd454e24bbd2becbcf637cb94fdb4d&ascene=0&uin=MjEzMDQ1MzkwNA%3D%3D&devicetype=iMac+MacBookPro12%2C1+OSX+OSX+10.11.6+build(15G31)&version=12010210&nettype=WIFI&fontScale=100&pass_ticket=h8OyVvvRfeiN2m7DiCpkKAcBaUzUQxy%2BpS8O%2FqcRsdfVoJh9V72eOrWsAc1RHKvU"
                    }, {
                        "type": "view",
                        "name": "胡歌高清壁纸1",
                        "url": "https://mp.weixin.qq.com/s?__biz=MjM5MDkyMTk5MQ==&mid=503383750&idx=1&sn=6bf11c2571411c9a045441c19c7a3b4a&mpshare=1&scene=1&srcid=0116Ssh9Ex1N30u3t4fGAqXe&key=06d84535fabd5b46a8c6c921a0757e823fec8ae66615c2576410eceb8f05c35d68442996267efe460b1d6dc0b7dc20ee8421d6738ff0c6df1248eddde6c6325ed85d34212d958a9cc004d37f5d0601d4&ascene=0&uin=MjEzMDQ1MzkwNA%3D%3D&devicetype=iMac+MacBookPro12%2C1+OSX+OSX+10.11.6+build(15G31)&version=12010210&nettype=WIFI&fontScale=100&pass_ticket=h8OyVvvRfeiN2m7DiCpkKAcBaUzUQxy%2BpS8O%2FqcRsdfVoJh9V72eOrWsAc1RHKvU"
                    }, {
                        "type": "view",
                        "name": "胡歌高清壁纸2",
                        "url": "https://mp.weixin.qq.com/s?__biz=MjM5MDkyMTk5MQ==&mid=2650867546&idx=2&sn=4d1672a5908ab6eadbe7bd265c7425e7&mpshare=1&scene=1&srcid=0116LgsQnsmlo1Ob5vK7ewE1&key=06d84535fabd5b46958ce571921cc0c2a76fcc17a78cd2b4d08fc6aa981ac1229d375c5370af40c41da5fe4e96b76275faaa50200e1d94501ca652bce1d266f031d37ff5625db88e8e0f7411cf0c69d7&ascene=0&uin=MjEzMDQ1MzkwNA%3D%3D&devicetype=iMac+MacBookPro12%2C1+OSX+OSX+10.11.6+build(15G31)&version=12010210&nettype=WIFI&fontScale=100&pass_ticket=h8OyVvvRfeiN2m7DiCpkKAcBaUzUQxy%2BpS8O%2FqcRsdfVoJh9V72eOrWsAc1RHKvU"
                    }, {
                        "type": "view",
                        "name": "与胡歌同框",
                        "url": "http://page.ctrlc.cc/yf-photo/start.php"
                    },
                ]
            }]
    };
    api.createMenu(Menu, function (result) {
        console.log(result);
    });

}


/*
 * {
 "type": "click",
 "name": "赞一下我们",
 "key": "V1001_GOOD"
 }
 */

module.exports = WXInitFunc;
