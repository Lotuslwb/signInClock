* media 是所有媒体文件
* YingFuData  是mongodb 导出的所有用户数据。其中有一个USER 放置用户信息;一个article 放置文章信息.

Schema如下:



```
    var name = 'user';
    var Schema = {
        openid: String,
        level: String,
        nextLevel: String,
        personInfo: {
            nickname: String,
            sex: String,
            city: String,
            headimgurl: String,
            realname: String,
            cellphone: String,
            address: String,
            startTime: Number
        },
        recodeInfo: {
            lastRecodeTime: String,  //最近打卡时间
            totalRecodeCounts: String, //合计打卡次数
            currentRecodeCounts: String, // 当前打卡次数
            currentSerialRecodeCounts: String,// 当前连续打卡次数
            recodeTimeArray: Array, //打卡日期记录
            totalWordLength: String //阅读总字数
        },
        couponList: [{
            couponStatus: String,
            couponCode: String,
            couponGetTime: String,
            couponUseTime: String,
        }],
        readingInfo: [{
            readingTimeId: String, //阅读日期  20170102
            recordServerId: String, // 录音,微信服务器ID
            recordLocalId: String, //录音 本地服务器ID
            onlyVoice: Boolean,
            readingList: {
                bookId: String,  //今日书籍ID
                bookName: String, // 今日书籍名
                bookCover: String, //今天书籍封页
                bookDes: String, //今天书籍描述
                level: String //今天书籍描述
            }
        }],
        clockInfo: {
            clockTime: String,
            clockSwitch: String //on 开启, off 关闭
        }
    };
```


```


var name = 'article';
var Schema = {
    createTime: String,//创建时间
    articleDate: String,//使用日期
    articleList: [{
        wordLength: String,  //词汇量
        brief: String, //简介
        coverUrl: String, //封面
        needTime: String, //阅读耗时
        articleTitle: String, //文章标题
        articleText: String, //正文
        resourceType: String, //资源类型 , video  or audio
        videoURL: String, //视频URl
        audioURL: String, //音频URl
        difficulty: String, //难度等级
        wisdomCH: String, //名人名言 中文
        wisdomEN: String, //名人名言 英文
    }]
};

```