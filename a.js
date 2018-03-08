db.users.find({'personInfo.nickname': '李文字彬'}).forEach(function (x) {
    x.readingInfo = [];
    x.clockInfo = {
        clockTime: '18:00',
        clockSwitch: 'on'
    };
    x.recodeInfo = {
        lastRecodeTime: '0',
        totalRecodeCounts: '0',
        currentRecodeCounts: '0',
        currentSerialRecodeCounts: '0',
        recodeTimeArray: [],
        totalWordLength: '0'
    };
    db.getCollection('users').save(x);
})


db.users.find().limit(40000).skip(35000).forEach(function (x) {
    x.clockInfo = {
        clockTime: '20:30',
        clockSwitch: 'on'
    };
    db.getCollection('users').save(x);
})

