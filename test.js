db.users.find({'personInfo.nickname': '必嘎啾'})

db.users.find({'personInfo.nickname': /CC.G/});

db.users.find({'personInfo.nickname': '天晴'}).skip(1)
db.users.find({'personInfo.nickname': '珠珠子'}).forEach(function (x) {
    var recodeInfo = x.recodeInfo;
    x.recodeInfo.currentRecodeCounts = recodeInfo.currentRecodeCounts * 1 + 1;
    x.recodeInfo.currentSerialRecodeCounts = recodeInfo.currentSerialRecodeCounts * 1 + 1;
    x.recodeInfo.totalRecodeCounts = recodeInfo.totalRecodeCounts * 1 + 1;
    x.recodeInfo.totalWordLength = recodeInfo.totalWordLength * 1 + 52;
    db.getCollection('users').save(x);
});

db.users.find({'personInfo.nickname': '珠珠子'}).forEach(function (x) {
    var recodeInfo = x.recodeInfo;
    var recodeTimeArray = recodeInfo.recodeTimeArray;
    recodeTimeArray.push('20180122')
    x.recodeInfo.recodeTimeArray = recodeTimeArray;
    db.getCollection('users').save(x);
});


var a = {
    "_id": ObjectId("5a410f7884bc3e7ee6874f9b"),
    "articleList": [{
        "wordLength": null,
        "brief": null,
        "coverUrl": null,
        "needTime": null,
        "articleTitle": null,
        "articleText": null,
        "resourceType": null,
        "videoURL": null,
        "audioURL": null,
        "difficulty": null
    }, {
        "wordLength": null,
        "brief": null,
        "coverUrl": null,
        "needTime": null,
        "articleTitle": null,
        "articleText": null,
        "resourceType": null,
        "videoURL": null,
        "audioURL": null,
        "difficulty": null
    }],
    "clockInfo": {"clockTime": "17:30", "clockSwitch": "on"},
    "level": "1",
    "openid": "oKdUIuFzFxpjUGvDzdNvlehoDY0A",
    "personInfo": {
        "nickname": "天晴",
        "headimgurl": "http://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTL2mfyzB5upVKibGfwwq6n1DVSaJgbq2gCIkn8Nia7ic8FIzI1hDqms220NmYVg2GqjksBClZXMusABw/0"
    },
    "readingInfo": [{
        "readingList": {
            "bookId": "5a5770c9e6bdbb6774af2821",
            "bookName": "Frisbee Chase",
            "bookCover": "/files/daka/qVfanPr5jnNGXXG7d9zshzmz.png",
            "bookDes": "Fleet and Elise usually play frisbee chase on Sundays. ",
            "level": "1"
        },
        "readingTimeId": "20180130",
        "recordServerId": "XRBf_SUjYeMOgisqthalLEEvdIulg4N3F-zExTWnVGkr8sbA85tmW9jhedefg6aI",
        "recordLocalId": "",
        "_id": ObjectId("5a70556b926f7039490c9943")
    }, {
        "readingList": {
            "bookId": "5a5ec5808aadef789ff8af61",
            "bookName": "The Model Family",
            "bookCover": "/files/daka/bXNsAA7aXGr5Kq6KvIQBrBq6.png",
            "bookDes": "Anna makes models every evening at her grandpa&#39;s home. ",
            "level": "1"
        },
        "readingTimeId": "20180131",
        "recordServerId": "_0BwmLK1co7NBzQFivJU3UjfIJMy14C6fd6kYx4eSFBpzeFQpQxMEkw4o956G83y",
        "recordLocalId": "",
        "_id": ObjectId("5a71bfc07238c9366a277c3c")
    }, {
        "readingList": {
            "bookId": "5a5ec7158aadef789ff8af64",
            "bookName": "Who is the King?",
            "bookCover": "/files/daka/OSYk6ioC6cswjqBoO5l2mSsJ.png",
            "bookDes": "Mo is in Savannia. He wants to meet King Scissors – the king of the animals.",
            "level": "1"
        },
        "readingTimeId": "20180201",
        "recordServerId": "hv7s4aDG3qF_HmZrgVa3sUhwZgQmQXj9pYMRbrJMF9TiDwkE2PgovDAhNicFN9ij",
        "recordLocalId": "",
        "_id": ObjectId("5a72486f33743b49f626edbe")
    }, {
        "readingList": {
            "bookId": "5a5ec89b8aadef789ff8af68",
            "bookName": "Meet the Big Cats",
            "bookCover": "/files/daka/NCOuGcocT1Wzf-t7e83sgXKb.png",
            "bookDes": "Leo is eight years old. He has a long body and a tail.",
            "level": "1"
        },
        "readingTimeId": "20180202",
        "recordServerId": "1G5MLaWgqPAkCGBccfv5bGVl8NZJshTXT5aDmMmGGScWMlJLwhhlpIq46tH1unwC",
        "recordLocalId": "",
        "_id": ObjectId("5a73b630ec9dc94619d8f2ad")
    }, {
        "readingList": {
            "bookId": "5a5eca658aadef789ff8af6b",
            "bookName": "The Instant Vincent",
            "bookCover": "/files/daka/D8CFvma_bmY3F2spLuHRU1Yw.png",
            "bookDes": "Clora is visiting Clarence in the Book Patrol because she needs some things for her art project. ",
            "level": "1"
        },
        "readingTimeId": "20180203",
        "recordServerId": "Vjg-YpG8OdkcKFL9c8ksn7u7xmDdWDhenyjmnNZbhNInLhIzuf4-p7xWI2CzC8le",
        "recordLocalId": "",
        "_id": ObjectId("5a75aa72201c4d62ccbd54cd")
    }, {
        "readingList": {
            "bookId": "5a5ee3f8880add0fe378e378",
            "bookName": "Crazy about Comics",
            "bookCover": "/files/daka/yqfZX-3gjVuQVauZBqKos8nh.png",
            "bookDes": "I love comics. I have more than 500. ",
            "level": "1"
        },
        "readingTimeId": "20180204",
        "recordServerId": "R9bui0nmkxZvI2XnxgK6LE5PkekV1uPuYKO3hbyTiczjcquq4GqIUUdomg8HrJMB",
        "recordLocalId": "",
        "_id": ObjectId("5a76d8c3a80ef50ff2133056")
    }, {
        "readingList": {
            "bookId": "5a5eebf0880add0fe378e37e",
            "bookName": "Around the World",
            "bookCover": "/files/daka/Pc9CVOKMrRgUaK6Az2ARfRWx.png",
            "bookDes": "Sam and Dan Trip didn&#39;t go to school. They went on vacation...for 13 years!",
            "level": "1"
        },
        "readingTimeId": "20180206",
        "recordServerId": "z9E2k4ehNS7yWwfxOhKfYgoWVCAfxWSjE8VT66qlzc2UxB_pfkTbqw9Gchxf6yfk",
        "recordLocalId": "",
        "_id": ObjectId("5a78eae9801da15b9a2a8b68")
    }, {
        "readingList": {
            "bookId": "5a5eeed0880add0fe378e381",
            "bookName": "The Ballad of Brittle Ben",
            "bookCover": "/files/daka/n102TVu3t_X157WmHgomBkeW.png",
            "bookDes": "Brittle Ben was laughing, His teeth were black and brown. ",
            "level": "1"
        },
        "readingTimeId": "20180207",
        "recordServerId": "dHzA023umNpOr5nfMmeQjvebl5cTaVS9O5dj9Wp0h-kjstMBtWMRrr0DNywwd79m",
        "recordLocalId": "",
        "_id": ObjectId("5a7af928196cc67db6b2c29d")
    }, {
        "readingList": {
            "bookId": "5a5ef7376548b31b56b94e52",
            "bookName": "Villain Number One",
            "bookCover": "/files/daka/_jiRFLul7UFTH0Q75lL9qIQC.png",
            "bookDes": "&#34;Who was that?&#34; King Scissors looked scared: &#34;Oh no! Not him. Please - not him!&#34;",
            "level": "1"
        },
        "readingTimeId": "20180208",
        "recordServerId": "gwRH0KzBg9LQUh-5Fued9yIz6zYhVqqfc_G0rRkz11hxMO3rOq0oGrgKIwTzAFtV",
        "recordLocalId": "",
        "_id": ObjectId("5a7c517d0b8ea227e8401e7f")
    }, {
        "readingList": {
            "bookId": "5a5f3cc0ce0a4b2edd1368e9",
            "bookName": "Ancient Superheroes",
            "bookCover": "/files/daka/zIGuo4G0VyEVAjcyZ8jiutOx.png",
            "bookDes": "Superheroes are people who can do amazing things. They can fly and run quickly.",
            "level": "1"
        },
        "readingTimeId": "20180210",
        "recordServerId": "48OuDOg6fAShNn4isRWlaIjiZxNqX3tIqjVDEwnH7OHBrd4qbNM8R2cj3_cMmItI",
        "recordLocalId": "",
        "_id": ObjectId("5a7edb4c4eb2003e3cdfa854")
    }, {
        "readingList": {
            "bookId": "5a5f6ebf78b92c36ec778f44",
            "bookName": "Fun Day Out",
            "bookCover": "/files/daka/HTMoswA-nJg_dgi-XZUYtMAZ.png",
            "bookDes": "Tom and Jones were at the theme park. Tom wanted to go on the roller coaster, but Jones said no.",
            "level": "1"
        },
        "readingTimeId": "20180219",
        "recordServerId": "GLnEj1kyb-hMMuF0gJG2PxuuuVlUdVdhQZ7SR0WiWMnxI-MSqyK26AesLjNLWZfX",
        "recordLocalId": "",
        "_id": ObjectId("5a8ae230f283653758a9bf33")
    }, {
        "readingList": {
            "bookId": "5a5f6fa578b92c36ec778f47",
            "bookName": "Amazing Rides",
            "bookCover": "/files/daka/QSgRZ3nRIyHY_V2YLqauYjj7.png",
            "bookDes": "When the roller coaster &#39;Cyclone&#39; opened in 1925, people were surprised. ",
            "level": "1"
        },
        "readingTimeId": "20180220",
        "recordServerId": "fY2CWMMtc7mMVkrLTlZ9yrqPG4071wBWcV9Vm6zlrYW4O2jufoOPBfqATEZYqYfA",
        "recordLocalId": "",
        "_id": ObjectId("5a8c2ce91e01f645b9bf131a")
    }, {
        "readingList": {
            "bookId": "5a7ac4f8196cc67db6b2bc72",
            "bookName": "Stuntwoman",
            "bookCover": "/files/daka/wic5dhnP4qCciho39vJ8Bo1Y.jpg",
            "bookDes": "Kylie has a very dangerous job. She has to fight people and fall from high places.",
            "level": "1"
        },
        "readingTimeId": "20180221",
        "recordServerId": "2KwA3NW3KDXAdL99AKwZLjRRwcID2IoaTFLNbabnraj64YqmlAq8qs9dxRbIOZBn",
        "recordLocalId": "",
        "_id": ObjectId("5a8d75c28948e74857a0b7d1")
    }, {
        "readingList": {
            "bookId": "5a89ddcf84471428136a71af",
            "bookName": "Don&#39;t Be Late",
            "bookCover": "/files/daka/MiqOVplUkhzVFwobPfu5Ewfd.png",
            "bookDes": "Ring! Ring! It&#39;s 9:30 a.m. - Elise is calling Tom. &#34;Let&#39;s go to the island!&#34; she says. ",
            "level": "1"
        },
        "readingTimeId": "20180223",
        "recordServerId": "e7ZwMw8l2owHQWrtfL-FL9-2bu5yFv_kTQnjRaEv6WVOie3tP8jLe60zV-a_okpw",
        "recordLocalId": "",
        "_id": ObjectId("5a9012d32f476c59438f2da3")
    }, {
        "readingList": {
            "bookId": "5a89de8e84471428136a71b2",
            "bookName": "Lazy Saturdays",
            "bookCover": "/files/daka/5YfphifmAeyhoK_3qhnrZX0r.png",
            "bookDes": "Today is Saturday. Fleet and Tom need to finish their science project before Monday.",
            "level": "1"
        },
        "readingTimeId": "20180224",
        "recordServerId": "KXME_P0aLb4n5S1xmIIQ6Yorgem4DK7POINEa2cZ-CbrEMk4bMbKnHru7htpB5Pd",
        "recordLocalId": "",
        "_id": ObjectId("5a917680f4f649477392b42c")
    }, {
        "readingList": {
            "bookId": "5a89df2084471428136a71b5",
            "bookName": "The Birthday Surprise",
            "bookCover": "/files/daka/WCEjIehmVNnf9caIMQIeFHkQ.png",
            "bookDes": "Clora is drawing a birthday card. Mo is making a cake.",
            "level": "1"
        },
        "readingTimeId": "20180225",
        "recordServerId": "wjsPsiwcLxGEBWzgYG4dQH2BdR1555GcPj_UaOOuUKrmKjs10gaRALT5EAWK6GJx",
        "recordLocalId": "",
        "_id": ObjectId("5a92b58237756a1e2c87f6d8")
    }, {
        "readingList": {
            "bookId": "5a89dfc084471428136a71b8",
            "bookName": "The Cupcake Tree",
            "bookCover": "/files/daka/TroVXNaxueuC6_e0q9OWqrIg.png",
            "bookDes": "Blackteeth the Pirate is on his ship in Whisper Bay. He&#39;s looking for the Cupcake Tree. ",
            "level": "1"
        },
        "readingTimeId": "20180226",
        "recordServerId": "0WXLnFs_badmuVC0AzU2NJhq0D-ygyTDVrpIjftDvLLqBNKJRX24A1kcqwxFQu5A",
        "recordLocalId": "",
        "_id": ObjectId("5a9412891515ae055b8497da")
    }],
    "recodeInfo": {
        "currentRecodeCounts": "17",
        "currentSerialRecodeCounts": "3",
        "lastRecodeTime": "1519653513204",
        "totalRecodeCounts": "17",
        "recodeTimeArray": ["20180130", "20180131", "20180201", "20180202", "20180203", "20180204", "20180206", "20180207", "20180208", "20180210", "20180219", "20180220", "20180221", "20180223", "20180224", "20180225", "20180226"],
        "totalWordLength": "2411"
    }
}


