var WXFunc = function (req, res, next) {
    // 微信输入信息都在req.weixin上
    var message = req.weixin;
    if (message.Event === 'subscribe') {
        res.reply('耶，小E又交到新朋友啦！<br/>孩子学习英语遇到问题？请点击家长课堂，总有一款回答适合你。<br/>不知道如何取一个适合孩子的英文名？点击英文名神器，一键获取孩子的完美英文名！<br/>本月注册免费试听课，即获500元学习大礼包，更可免费获取胡歌电子签名版亲子英语杂志一本！');
    }
};

module.exports = WXFunc;
