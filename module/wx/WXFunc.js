var WXFunc = function (req, res, next) {
    // 微信输入信息都在req.weixin上
    var message = req.weixin;
    console.log(message);
    // res.reply("耶，小E又交到新朋友啦！孩子在学习英语中遇到问题，可以点击家长课堂，总有一款回答适合你。\n \n 12月【英孚亲子英语阅读】打卡系统上线啦，每天精选一个趣味英语故事，让孩子跟外教一起朗读，每天3分钟培养孩子英语阅读兴趣！ \n \n 猛戳立即参加<a href='http://ma.eldesign.cn/daka/start'>【英孚亲子英语阅读】</a>  \n \n 已参加？请点击左下方【阅读打卡】！让我们一起见证孩子的点滴进步！");
    res.reply("耶，小E又交到新朋友啦！\n 孩子学习英语遇到问题？请点击家长课堂，总有一款回答适合你。\n 不知道如何取一个适合孩子的英文名？点击英文名神器，一键获取孩子的完美英文名！\n 本月注册免费试听课，即获500元学习大礼包，更可免费获取胡歌电子签名版亲子英语杂志一本！'");
    // if (message.Event === 'subscribe') {
    //
    // }
};

module.exports = WXFunc;
