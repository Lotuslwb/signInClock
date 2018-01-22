var WXFunc = function (req, res, next) {
    // 微信输入信息都在req.weixin上
    var message = req.weixin;
    console.log(message);
    if (message.Event === 'subscribe') {
        res.reply("耶，小E又交到新朋友啦！孩子在学习英语中遇到问题，可以点击<a href ='http://suo.im/1dvh2X'>【家长课堂】</a>，总有一款回答适合你。 /n /n /n 第二期英孚亲子英语阅读打卡开始啦，全新系统增加分级阅读和回顾往期功能！听上去是不是很棒？赶紧来参加吧【<a href ='https://ma.eldesign.cn/daka/index'>英孚亲子英语阅读</a>】！，小E依然为你们准备了精美礼品哟！/n /n /n 已参加？请点击右下方【阅读打卡】阅读今天的打卡内容！让我们一起见证孩子的点滴进步！ /n /n /n 后台关键字回复");
    } else if (message.MsgType == 'text' && message.Content.indexOf('打卡') > -1) {
        res.reply("第二期英孚亲子英语阅读打卡开始啦，全新系统增加分级阅读和回顾往期功能！听上去是不是很棒？ /n /n 赶紧来参加吧<a href ='https://ma.eldesign.cn/daka/index'>【英孚亲子英语阅读】</a>！，小E依然为你们准备了精美礼品哟！");
    } else {
        // res.reply("耶，小E又交到新朋友啦！孩子在学习英语中遇到问题，可以点击<a href='http://mp.weixin.qq.com/mp/homepage?__biz=MjM5MDkyMTk5MQ==&hid=2&sn=ff4d86022b7ebc3a8358801950887e8e&scene=18#wechat_redirect'>【家长课堂】</a>，总有一款回答适合你。\n \n 12月【英孚亲子英语阅读】打卡系统上线啦，每天精选一个趣味英语故事，让孩子跟外教一起朗读，每天3分钟培养孩子英语阅读兴趣！ \n \n 猛戳立即参加<a href='http://ma.eldesign.cn/daka/start'>【英孚亲子英语阅读】</a>  \n \n 已参加？请点击左下方【阅读打卡】！让我们一起见证孩子的点滴进步！");
        res.reply("");
    }
};

module.exports = WXFunc;
