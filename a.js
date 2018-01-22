db.users.find({'personInfo.nickname':'李文字彬'}).forEach(function (x) {
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