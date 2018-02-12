db.users.find({'personInfo.nickname': 'selinakangkang'})

db.users.find({'openid': 'oKdUIuGfPpl2oJYeKvnaVk09JPl8'}).forEach(function (x) {
    x.recodeInfo = {
        "lastRecodeTime": "0",
        "totalRecodeCounts": "14",
        "currentRecodeCounts": "14",
        "currentSerialRecodeCounts": "14",
        "recodeTimeArray": [],
        "totalWordLength": "0"
    };
    db.getCollection('users').save(x);
});

var c = {
    "_id": ObjectId("5a410f7784bc3e7ee6872231"),
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
    "clockInfo": {"clockTime": "18:30", "clockSwitch": "on"},
    "level": "0",
    "openid": "oKdUIuGkrz4KcMOBErYImpxpJtDc",
    "personInfo": {
        "nickname": "niuniu",
        "headimgurl": "http://wx.qlogo.cn/mmopen/vi_32/sypWicdelicn6riaEjHtVKqG0CzicXa0HHt6ooRlo7qtpHl4NenVJl1nyXN8iaXCb9ibwBl2jhzibtGHfspw022LjicEbA/0"
    },
    "readingInfo": [],
    "recodeInfo": {
        "lastRecodeTime": "0",
        "totalRecodeCounts": "0",
        "currentRecodeCounts": "0",
        "currentSerialRecodeCounts": "0",
        "recodeTimeArray": [],
        "totalWordLength": "0"
    }
}
{
    "openid"
:
    "oKdUIuBxwZ54AN6ihnQckQLa26nE", "_id"
:
    ObjectId("5a72962971c35419f2b735f4"), "clockInfo"
:
    {
        "clockTime"
    :
        "18:00", "clockSwitch"
    :
        "on"
    }
,
    "readingInfo"
:
    [], "couponList"
:
    [], "recodeInfo"
:
    {
        "lastRecodeTime"
    :
        "", "totalRecodeCounts"
    :
        "0", "currentRecodeCounts"
    :
        "0", "currentSerialRecodeCounts"
    :
        "0", "recodeTimeArray"
    :
        []
    }
,
    "personInfo"
:
    {
        "nickname"
    :
        "niuniu", "sex"
    :
        "0", "city"
    :
        "", "headimgurl"
    :
        "http://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLicaa1GtVzuLNWwJmia8WuHr2dqrTRoBqAJEuvRck1TVswPNomic6MqBTicEsKlnIYWzEblficYLyvusg/132", "startTime"
    :
        1517458985665
    }
,
    "__v"
:
    0
}
{
    "_id"
:
    ObjectId("5a410f7784bc3e7ee687265f"), "articleList"
:
    [{
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
    }], "clockInfo"
:
    {
        "clockTime"
    :
        "19:30", "clockSwitch"
    :
        "on"
    }
,
    "level"
:
    "0", "openid"
:
    "oKdUIuIS_KGdUvOjPwgfuPYHQfTI", "personInfo"
:
    {
        "nickname"
    :
        "niuniu", "sex"
    :
        "2", "city"
    :
        "滨海新区", "headimgurl"
    :
        "http://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKyuuhxu0HH4ROUYjxPiaCp1jmrOAA2Ht17ibSdOsibWF8HnbxyIojKKBy6jKCY7fNGMgKZwiaicK3goIw/0"
    }
,
    "readingInfo"
:
    [{
        "readingList": {
            "bookId": "5a56f09e79acd04172c6c431",
            "bookName": "Hello Song",
            "bookCover": "/files/daka/aO6M3lGfmjWSNzgGm4uBQz9J.png",
            "bookDes": "EF Small Star kids! Hello everyone! We are here to learn and play!",
            "level": "0"
        },
        "readingTimeId": "20180122",
        "recordServerId": "_87-lU2CpOjna4FTU1xYEN71urDt939Uv519MT3RmsGAOOaCJjnUefC0ZCoMVSLp",
        "recordLocalId": "/root/signInClock/public/files/media/_87-lU2CpOjna4FTU1xYEN71urDt939Uv519MT3RmsGAOOaCJjnUefC0ZCoMVSLp.mp3",
        "onlyVoice": true,
        "_id": ObjectId("5a65f7f1a9fe6e16c0cf7b39")
    }, {
        "readingList": {
            "bookId": "5a56f09e79acd04172c6c431",
            "bookName": "Hello Song",
            "bookCover": "/files/daka/aO6M3lGfmjWSNzgGm4uBQz9J.png",
            "bookDes": "EF Small Star kids! Hello everyone! We are here to learn and play!",
            "level": "0"
        },
        "readingTimeId": "20180122",
        "recordServerId": "9eAImQXolUdDiwCDPxGXHiDhFJ4WGTAyb79VuJsTFHX1vRtvRB2yUNRKVtLKMlIc",
        "recordLocalId": "/root/signInClock/public/files/media/9eAImQXolUdDiwCDPxGXHiDhFJ4WGTAyb79VuJsTFHX1vRtvRB2yUNRKVtLKMlIc.mp3",
        "_id": ObjectId("5a65f866a9fe6e16c0cf7b64")
    }, {
        "readingList": {
            "bookId": "5a575a269ad8685dc845d64d",
            "bookName": "What Do You Do",
            "bookCover": "/files/daka/guCAYBQDFvWehyFm0qbLSIao.png",
            "bookDes": "What can I do in the morning, afternoon, evening and at night? ",
            "level": "0"
        },
        "readingTimeId": "20180123",
        "recordServerId": "ImTxtAmAC4zuYXcnPKd292ty5LTHeGnxov4e16C5Ltw2ReDapJBDJQhOgfrExYck",
        "recordLocalId": "/root/signInClock/public/files/media/ImTxtAmAC4zuYXcnPKd292ty5LTHeGnxov4e16C5Ltw2ReDapJBDJQhOgfrExYck.mp3",
        "_id": ObjectId("5a67276e0679fe3793549c2c")
    }, {
        "readingList": {
            "bookId": "5a575ce69ad8685dc845d651",
            "bookName": "Hello What&#39;s Your Name",
            "bookCover": "/files/daka/9o9TKb3OJjUgvni2iFheOphC.png",
            "bookDes": "What&#39;s your name? I’m ....",
            "level": "0"
        },
        "readingTimeId": "20180124",
        "recordServerId": "exWp2liwXPHu1rwCWGg_X7LvulBTXv6qz00TrqyKplUP-Bs0P-HyGbdTuFyGYNS1",
        "recordLocalId": "",
        "_id": ObjectId("5a68072c08952750d3139507")
    }, {
        "readingList": {
            "bookId": "5a5763df9ad8685dc845d655",
            "bookName": "Roddy&#39;s Family",
            "bookCover": "/files/daka/7iv2dDmN3mt5pjCVKdQf62YO.png",
            "bookDes": "I like your photo album. Look at my photo album! ",
            "level": "0"
        },
        "readingTimeId": "20180125",
        "recordServerId": "A8Sa5O11waGGedj9yg7r0G06DyUYOEDwbyXZ7qTaOAi9XQ7m1srrTLb5xyiB4r6i",
        "recordLocalId": "",
        "_id": ObjectId("5a69c1f2392950089325f820")
    }, {
        "readingList": {
            "bookId": "5a5765d59ad8685dc845d658",
            "bookName": "The Color Song",
            "bookCover": "/files/daka/Z2vR-xdAkzZK_pnHT5SB5eiM.png",
            "bookDes": "Red, yellow, blue and green. Colors, colors, colors. ",
            "level": "0"
        },
        "readingTimeId": "20180126",
        "recordServerId": "PKsXMm2UqygBK-Jr5o1QHPiF3oArnEIwSb0WlvOnc0C_RIw5XIRtI0RhkAG5XjaU",
        "recordLocalId": "",
        "_id": ObjectId("5a6a86df58a6f41e5356c267")
    }, {
        "readingList": {
            "bookId": "5a5767eb9ad8685dc845d65b",
            "bookName": "The Pizza Party",
            "bookCover": "/files/daka/KOo-DFBQQqOIjEPM0zDvlxJX.png",
            "bookDes": "Hmm.. I like cake. I like bread. I like pizza. I want pizza!",
            "level": "0"
        },
        "readingTimeId": "20180127",
        "recordServerId": "R7f1QTcsj95bnrJYB_48RQDjKgVxYQ0AumpErKTF-6XM2RRSkSDfb17tcXmXxO0J",
        "recordLocalId": "",
        "_id": ObjectId("5a6c8e430e276d3c480403dc")
    }, {
        "readingList": {
            "bookId": "5a5769e99ad8685dc845d66a",
            "bookName": "The Alphabet Song",
            "bookCover": "/files/daka/OjR0ZZvgKsjBc8kxk4fsB_cw.png",
            "bookDes": "Now I know my ABC&#39;s. Next time won&#39;t you sing with me.",
            "level": "0"
        },
        "readingTimeId": "20180128",
        "recordServerId": "p99CPagm1rc-3_4mv-wF958u8uI_Z9VBgSmiwlPOZLNwzsc4k4fPm15PcbGTrXDQ",
        "recordLocalId": "",
        "_id": ObjectId("5a6daefdbf4339187854a98a")
    }, {
        "readingList": {
            "bookId": "5a576c819ad8685dc845d66d",
            "bookName": "Catch the Ball",
            "bookCover": "/files/daka/4jYPG3T5-y5WqinmzBMOKHqH.png",
            "bookDes": "Vic: What is he doing? Roddy: Hmm…I don&#39;t know. Is he kicking the ball? ",
            "level": "0"
        },
        "readingTimeId": "20180129",
        "recordServerId": "x241yFhiOQt5JtZ7u0Bx_iI2FKBMUdHRMN91YyIxFpixo2D-ReLmefYxMQXeMsqw",
        "recordLocalId": "",
        "_id": ObjectId("5a6f12427d318d2d368076f4")
    }, {
        "readingList": {
            "bookId": "5a5770c9e6bdbb6774af2821",
            "bookName": "The Dog Says Woof",
            "bookCover": "/files/daka/ZYjbtf75iISwavBwSvsLiChw.png",
            "bookDes": "The dog says: &#39;Woof.&#39; The cat says: &#39;Meow.&#39; The cow says: &#39;Moo.&#39;",
            "level": "0"
        },
        "readingTimeId": "20180130",
        "recordServerId": "Jdz8TmgnX23j7noK8Gop40yoVDzfZsXZPeTfXVBSmKGbtKYy7EDAvyWs8QalsUy2",
        "recordLocalId": "",
        "_id": ObjectId("5a70500f926f7039490c9888")
    }, {
        "readingList": {
            "bookId": "5a5ec5808aadef789ff8af61",
            "bookName": "Let&#39;s Take a Photo",
            "bookCover": "/files/daka/0j92CcXyvBPmfpR3XRxw6s6w.png",
            "bookDes": "Let&#39;s take a photo. One, two, three, smile! ",
            "level": "0"
        },
        "readingTimeId": "20180131",
        "recordServerId": "1Lq--t1kMArF8STtqqx0IURh2bMf8ByDgWeulslpBWdObYxH7u50fwr9r3PRZJrl",
        "recordLocalId": "",
        "_id": ObjectId("5a7190d72cf50709f6363cb8")
    }, {
        "readingList": {
            "bookId": "5a5ec7158aadef789ff8af64",
            "bookName": "How Many Fingers",
            "bookCover": "/files/daka/TrOTgAWIrh6EAODi4fUxqVYV.png",
            "bookDes": "One, two, three, four, five. How many fingers? ",
            "level": "0"
        },
        "readingTimeId": "20180201",
        "recordServerId": "ShUxlQ79SebIlLH-w5Fucv7EuzDx2Bj1Zc9whjJ7qudJkjnGzZa3sBqyKjxG7Bjh",
        "recordLocalId": "",
        "_id": ObjectId("5a72e7753e393a634f51220a")
    }, {
        "readingList": {
            "bookId": "5a5ec89b8aadef789ff8af68",
            "bookName": "Let&#39;s Go to the Aquarium",
            "bookCover": "/files/daka/LMKhPFdEGcOSnZciQUWvfRiB.png",
            "bookDes": "That is a shark. It&#39;s very dangerous and has big teeth. ",
            "level": "0"
        },
        "readingTimeId": "20180202",
        "recordServerId": "AxmLZdAROxfiYmzV9YZb2WejSG-hIO-cZGpEDU_cmXMh5J7kYHH16HZSrY0GNsog",
        "recordLocalId": "",
        "_id": ObjectId("5a748972b809b61db513ef2f")
    }, {
        "readingList": {
            "bookId": "5a5eca658aadef789ff8af6b",
            "bookName": "I Like Fruit",
            "bookCover": "/files/daka/Iscni_PTEiJtsjBK_PAblXVe.png",
            "bookDes": "I like apples, I like apples, I like apples; yes I do. ",
            "level": "0"
        },
        "readingTimeId": "20180203",
        "recordServerId": "ZpPYGSdW9mmSO_JbrfOMSM_tMdFFkQeGJsdoOVb0DV2tK3ShmpfzHDO1vGCoeBHQ",
        "recordLocalId": "",
        "_id": ObjectId("5a7566a7fb5ce45573349cad")
    }, {
        "readingList": {
            "bookId": "5a5ee3f8880add0fe378e378",
            "bookName": "Vic&#39;s Tea Party",
            "bookCover": "/files/daka/aDFDGISnAg_HH4wSvaNlPTju.png",
            "bookDes": "One day Vic goes shopping. ",
            "level": "0"
        },
        "readingTimeId": "20180204",
        "recordServerId": "y2S0c7an2xNRU2hmymUSNbPBceHMyHF8MaCzYyHj4czVP0sgHuE1DV5-y31fANlR",
        "recordLocalId": "",
        "_id": ObjectId("5a76fde8a80ef50ff2133423")
    }, {
        "readingList": {
            "bookId": "5a5ee69c880add0fe378e37b",
            "bookName": "Things in My Classroom",
            "bookCover": "/files/daka/xSj6fTuwLVpTS2roH5oCCwqo.png",
            "bookDes": "I have a book a pencil and glue. I can draw!",
            "level": "0"
        },
        "readingTimeId": "20180205",
        "recordServerId": "OsoMCfNXL4R_7TJ4Yz3j_XnYrgepnghgzmsW8nUO-nVG-P9xlCwqhhYr5oOeHdJJ",
        "recordLocalId": "",
        "_id": ObjectId("5a77f21d33b7b64ac55f9098")
    }, {
        "readingList": {
            "bookId": "5a5eebf0880add0fe378e37e",
            "bookName": "Are There Sinks",
            "bookCover": "/files/daka/ymODjVhOhwkvPHouxfhu5gT7.png",
            "bookDes": "I want to wash my hands. Is there a sink in the garage? ",
            "level": "0"
        },
        "readingTimeId": "20180206",
        "recordServerId": "AUCj1twYnxm4kFPfJqHY61sGel3uNJh2_3uWpNcIK69rCcsxqCW1xF2KanSWJBC_",
        "recordLocalId": "",
        "_id": ObjectId("5a79a034e86c545b235248d8")
    }, {
        "readingList": {
            "bookId": "5a5eeed0880add0fe378e381",
            "bookName": "Face Rhyme",
            "bookCover": "/files/daka/CBMBPd20oE-mA045bwtH8Qsn.png",
            "bookDes": "Eyes, ears, mouth and nose. Touch your hair, touch your nose. ",
            "level": "0"
        },
        "readingTimeId": "20180207",
        "recordServerId": "JGZMtdJc2IU8hNfgffcCjiirUrpGs8fgBYXA0-jENKo2DOExFmhZ6Wl5c5QwlFUm",
        "recordLocalId": "",
        "_id": ObjectId("5a7ace82196cc67db6b2bcde")
    }, {
        "readingList": {
            "bookId": "5a5ef7376548b31b56b94e52",
            "bookName": "The Socer Games",
            "bookCover": "/files/daka/EBV940vZxn_T_KaT5fL8EYA8.png",
            "bookDes": "It&#39;s a sunny day. Kev and Mel are playing soccer. ",
            "level": "0"
        },
        "readingTimeId": "20180208",
        "recordServerId": "i8Q9qaJKV_6vLgDyvfTFv9EgSmSdUGrW6gFoqI-dlzmgaUSnWCMX9az3WLBDiGn6",
        "recordLocalId": "",
        "_id": ObjectId("5a7c54200b8ea227e8401f0c")
    }, {
        "readingList": {
            "bookId": "5a5f3b3ace0a4b2edd1368e6",
            "bookName": "This Is The Way",
            "bookCover": "/files/daka/PVchq8mhSlIE5g2CSo-qH4HQ.png",
            "bookDes": "This is the way we touch our hair, can you touch your hair? ",
            "level": "0"
        },
        "readingTimeId": "2018029",
        "recordServerId": "r8kcLfxSXmOk0PY8OZiOpVMeaCbBEV1z-ltkILZ2Eu_70fBdBwUeiG0g3gMzGgqp",
        "recordLocalId": "",
        "_id": ObjectId("5a7db3a967a24c68c0bb25ad")
    }, {
        "readingList": {
            "bookId": "5a5f3b3ace0a4b2edd1368e6",
            "bookName": "This Is The Way",
            "bookCover": "/files/daka/PVchq8mhSlIE5g2CSo-qH4HQ.png",
            "bookDes": "This is the way we touch our hair, can you touch your hair? ",
            "level": "0"
        },
        "readingTimeId": "20180209",
        "recordServerId": "ZQuk6d-udhz_Up04ElBTNBgY5qR49YAcrBl4QNfeaQLpdoZz4Zz2UC4-Xy04CLTg",
        "recordLocalId": "",
        "onlyVoice": true,
        "_id": ObjectId("5a7db3fc67a24c68c0bb25c0")
    }, {
        "readingList": {
            "bookId": "5a5f3cc0ce0a4b2edd1368e9",
            "bookName": "Goodbye Song",
            "bookCover": "/files/daka/4YA21ZXva6-XX3ZyJl9jOMSP.png",
            "bookDes": "Goodbye friends. Goodbye friends. We&#39;ll have fun another day. ",
            "level": "0"
        },
        "readingTimeId": "20180210",
        "recordServerId": "PyFjBlM82s962DEYbTQNFNuB5sv3EvDqjpd2wKmlyPCZRaLFIejTs6hP1qwQ8gqB",
        "recordLocalId": "",
        "_id": ObjectId("5a7e5bd467a24c68c0bb2981")
    }, {
        "readingList": {
            "bookId": "5a5f3f514d0c11334bb72d70",
            "bookName": "The Clothes Song",
            "bookCover": "/files/daka/K7j2j9rajPCg2jtAJNW8knIN.png",
            "bookDes": "What is in your bag? There are gloves and a hat. Gloves and a hat.",
            "level": "0"
        },
        "readingTimeId": "20180211",
        "recordServerId": "SUUfHNWh_xqbMLY0sjIa_Ef3WoJ0sMzOf3i9ddoIg8fPmZr5cLUdek_LqCq5JXdz",
        "recordLocalId": "",
        "_id": ObjectId("5a803b37a94fc93d9f79dd1e")
    }], "recodeInfo"
:
    {
        "currentRecodeCounts"
    :
        "21", "currentSerialRecodeCounts"
    :
        "10", "lastRecodeTime"
    :
        "1518353207968", "totalRecodeCounts"
    :
        "21", "recodeTimeArray"
    :
        ["20180122", "20180123", "20180124", "20180125", "20180126", "20180127", "20180128", "20180129", "20180130", "20180131", "20180201", "20180202", "20180203", "20180204", "20180205", "20180206", "20180207", "20180208", "2018029", "20180210", "20180211"], "totalWordLength"
    :
        "1497"
    }
}
var b = {
    "__v": 0,
    "_id": ObjectId("5a56dfdc1f563f3cdef4d661"),
    "clockInfo": {"clockSwitch": "on", "clockTime": "09:30"},
    "couponList": [],
    "level": "0",
    "openid": "oKdUIuDXWO5Ek3IswpcRvESoOUVI",
    "personInfo": {
        "nickname": "李文字彬",
        "sex": "1",
        "city": "",
        "headimgurl": "http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLyV1Ir9mstNAOmvyNzpTFcibv3xWVSCp135dehaicLbhWY6hRDnadIibZq3V1V6PNETobaDXXLIBibMw/132"
    },
    "readingInfo": [{
        "readingList": {
            "bookId": "5a575a269ad8685dc845d64d",
            "bookName": "Don&#39;t Be Late",
            "bookCover": "/files/daka/b5bEeWJWt3ZwVmOTek_cKvWi.png",
            "bookDes": "Ring! Ring! It&#39;s 9:30 a.m. - Elise is calling Tom. &#34;Let&#39;s go to the island!&#34; she says. ",
            "level": "1"
        },
        "readingTimeId": "20180123",
        "recordServerId": "huCHKq8yz6_4QdzGQ0OIknBeh45nkfYL2_MhwbiGb9jPDavC7U6G-66BydrS-TZ7",
        "recordLocalId": "/root/signInClock/public/files/media/huCHKq8yz6_4QdzGQ0OIknBeh45nkfYL2_MhwbiGb9jPDavC7U6G-66BydrS-TZ7.mp3",
        "_id": ObjectId("5a66169916aa96230265a897")
    }, {
        "readingList": {
            "bookId": "5a56f09e79acd04172c6c431",
            "bookName": "Please Don&#39;t Turn Off the Light",
            "bookCover": "/files/daka/7O0QMAhGc_aax_3HMyAgk-nK.png",
            "bookDes": "Please, Dad, don&#39;t turn off the light -bad kids hide in my room at night. ",
            "level": "1"
        },
        "readingTimeId": "20180122",
        "recordServerId": "8_ZQfdEDWuiMu1XRN77BFnyNfiz1WPojvMC0RvO0VS_7prWx1QtBOPpb8kcZe0KG",
        "recordLocalId": "/root/signInClock/public/files/media/8_ZQfdEDWuiMu1XRN77BFnyNfiz1WPojvMC0RvO0VS_7prWx1QtBOPpb8kcZe0KG.mp3",
        "onlyVoice": true,
        "_id": ObjectId("5a6616b716aa96230265a898")
    }, {
        "readingList": {
            "bookId": "5a5763df9ad8685dc845d655",
            "bookName": "Roddy&#39;s Family",
            "bookCover": "/files/daka/7iv2dDmN3mt5pjCVKdQf62YO.png",
            "bookDes": "I like your photo album. Look at my photo album! ",
            "level": "0"
        },
        "readingTimeId": "20180125",
        "recordServerId": "1237378768e7q8e7r8qwesafdasdfasdfaxss111",
        "recordLocalId": "",
        "_id": ObjectId("5a6985552d3b7d7681942bb2")
    }, {
        "readingList": {
            "bookId": "5a5f3cc0ce0a4b2edd1368e9",
            "bookName": "Goodbye Song",
            "bookCover": "/files/daka/4YA21ZXva6-XX3ZyJl9jOMSP.png",
            "bookDes": "Goodbye friends. Goodbye friends. We&#39;ll have fun another day. ",
            "level": "0"
        },
        "readingTimeId": "20180210",
        "recordServerId": "cFYyMYMg7sv3smLOjA4_c56_zz02zV0WCF1K_dBBLC4ktZz_acwNrsPRotdFi6xv",
        "recordLocalId": "/root/signInClock/public/files/media/cFYyMYMg7sv3smLOjA4_c56_zz02zV0WCF1K_dBBLC4ktZz_acwNrsPRotdFi6xv.mp3",
        "_id": ObjectId("5a7f068478fe38113b16d6e2")
    }],
    "recodeInfo": {
        "currentRecodeCounts": "3",
        "currentSerialRecodeCounts": "0",
        "lastRecodeTime": "1518274180861",
        "totalRecodeCounts": "3",
        "recodeTimeArray": ["20180123", "20180125", "20180210"],
        "totalWordLength": "353"
    }
};


var a = {
    "_id": ObjectId("5a410f7784bc3e7ee686f81f"),
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
    "clockInfo": {"clockSwitch": "on", "clockTime": "19:00"},
    "level": "0",
    "openid": "oKdUIuNA8hh4JWq1TnTZgiGL2MCU",
    "personInfo": {
        "nickname": "selinakangkang",
        "headimgurl": "http://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83epPh4ySfe5icOricpRPdiaiczDKey4Py8l69Y1p6LsSCcRlLbLnGoJZR0EibhMJJedl9e0oZiaFQia2icxRoQ/0"
    },
    "readingInfo": [{
        "readingList": {
            "bookId": "5a575a269ad8685dc845d64d",
            "bookName": "What Do You Do",
            "bookCover": "/files/daka/guCAYBQDFvWehyFm0qbLSIao.png",
            "bookDes": "What can I do in the morning, afternoon, evening and at night? ",
            "level": "0"
        },
        "readingTimeId": "20180123",
        "recordServerId": "dTLhR_ZW7t_yIxHB1PR0N4E_bZhwA2M1CL-xBdjc3uIQLAu5G6DLnVnDjQvkBjQs",
        "recordLocalId": "/root/signInClock/public/files/media/dTLhR_ZW7t_yIxHB1PR0N4E_bZhwA2M1CL-xBdjc3uIQLAu5G6DLnVnDjQvkBjQs.mp3",
        "_id": ObjectId("5a6719d4d5ab992f38c61124")
    }, {
        "readingList": {
            "bookId": "5a575ce69ad8685dc845d651",
            "bookName": "Hello What&#39;s Your Name",
            "bookCover": "/files/daka/9o9TKb3OJjUgvni2iFheOphC.png",
            "bookDes": "What&#39;s your name? I’m ....",
            "level": "0"
        },
        "readingTimeId": "20180124",
        "recordServerId": "kVeqaWeuXHK4Ym2o6XJTThdY_OHbDTA1ifLhWEf2GjHeThTmjOocbwXPjtfHvgtm",
        "recordLocalId": "/root/signInClock/public/files/media/kVeqaWeuXHK4Ym2o6XJTThdY_OHbDTA1ifLhWEf2GjHeThTmjOocbwXPjtfHvgtm.mp3",
        "_id": ObjectId("5a686ba2c3d0831f6421f298")
    }, {
        "readingList": {
            "bookId": "5a5763df9ad8685dc845d655",
            "bookName": "Roddy&#39;s Family",
            "bookCover": "/files/daka/7iv2dDmN3mt5pjCVKdQf62YO.png",
            "bookDes": "I like your photo album. Look at my photo album! ",
            "level": "0"
        },
        "readingTimeId": "20180125",
        "recordServerId": "StHqo2Ap6oqydKNyJGu1KTAtjkFmsAx5glORerKXCK6FxMUhbk3GKQBmBlTRi4RA",
        "recordLocalId": "/root/signInClock/public/files/media/StHqo2Ap6oqydKNyJGu1KTAtjkFmsAx5glORerKXCK6FxMUhbk3GKQBmBlTRi4RA.mp3",
        "_id": ObjectId("5a69d25c392950089325fbf4")
    }, {
        "readingList": {
            "bookId": "5a5765d59ad8685dc845d658",
            "bookName": "The Color Song",
            "bookCover": "/files/daka/Z2vR-xdAkzZK_pnHT5SB5eiM.png",
            "bookDes": "Red, yellow, blue and green. Colors, colors, colors. ",
            "level": "0"
        },
        "readingTimeId": "20180126",
        "recordServerId": "ohHwm2RDc_MeOWOC7s2jHoxEXIc-iikB036DiWDV19S5X5suHF5UKYBwIUGnNIWW",
        "recordLocalId": "",
        "_id": ObjectId("5a6afe2684a96e064789df66")
    }, {
        "readingList": {
            "bookId": "5a5767eb9ad8685dc845d65b",
            "bookName": "The Pizza Party",
            "bookCover": "/files/daka/KOo-DFBQQqOIjEPM0zDvlxJX.png",
            "bookDes": "Hmm.. I like cake. I like bread. I like pizza. I want pizza!",
            "level": "0"
        },
        "readingTimeId": "20180127",
        "recordServerId": "dTLhR_ZW7t_yIxHB1PR0N68OFyayZ0uZT9GaGECVQvq7bYG5bSZjm8AuBg2p4tFL",
        "recordLocalId": "",
        "_id": ObjectId("5a6c46b2e5406510b2dc9d0d")
    }, {
        "readingList": {
            "bookId": "5a56f09e79acd04172c6c431",
            "bookName": "Hello Song",
            "bookCover": "/files/daka/aO6M3lGfmjWSNzgGm4uBQz9J.png",
            "bookDes": "EF Small Star kids! Hello everyone! We are here to learn and play!",
            "level": "0"
        },
        "readingTimeId": "20180122",
        "recordServerId": "aLipPUwk80WoE0-9UjfUVyNq_uZfy8jooeG5MyTeWfofpbluRINAGnUD9SF9QM_0",
        "recordLocalId": "",
        "onlyVoice": true,
        "_id": ObjectId("5a6c4720e5406510b2dc9d15")
    }, {
        "readingList": {
            "bookId": "5a5769e99ad8685dc845d66a",
            "bookName": "The Alphabet Song",
            "bookCover": "/files/daka/OjR0ZZvgKsjBc8kxk4fsB_cw.png",
            "bookDes": "Now I know my ABC&#39;s. Next time won&#39;t you sing with me.",
            "level": "0"
        },
        "readingTimeId": "20180128",
        "recordServerId": "0mLQMmLE6f1QBVwAFdhEuiFq-5fUKgHgzNAgUjd9aNQXh2ysCsdOa9tvKD8DgLp8",
        "recordLocalId": "",
        "_id": ObjectId("5a6d68a7ef89da5a3c200fbb")
    }, {
        "readingList": {
            "bookId": "5a576c819ad8685dc845d66d",
            "bookName": "Catch the Ball",
            "bookCover": "/files/daka/4jYPG3T5-y5WqinmzBMOKHqH.png",
            "bookDes": "Vic: What is he doing? Roddy: Hmm…I don&#39;t know. Is he kicking the ball? ",
            "level": "0"
        },
        "readingTimeId": "20180129",
        "recordServerId": "sRjI-W71gQbkiZnWNPlNYFLLcBwel7mz0xN0g5Sxbw5QmVC9b_15xHzxY5iswKUm",
        "recordLocalId": "",
        "_id": ObjectId("5a6f13ba7d318d2d36807747")
    }, {
        "readingList": {
            "bookId": "5a5770c9e6bdbb6774af2821",
            "bookName": "The Dog Says Woof",
            "bookCover": "/files/daka/ZYjbtf75iISwavBwSvsLiChw.png",
            "bookDes": "The dog says: &#39;Woof.&#39; The cat says: &#39;Meow.&#39; The cow says: &#39;Moo.&#39;",
            "level": "0"
        },
        "readingTimeId": "20180130",
        "recordServerId": "tyFfebk1gSLuAjAVttiMZrjCtNN5eReJRGj-Bmx4jxzX3kpZhBSR_2J1tTtU1AW0",
        "recordLocalId": "",
        "_id": ObjectId("5a704936926f7039490c97d3")
    }, {
        "readingList": {
            "bookId": "5a5ec5808aadef789ff8af61",
            "bookName": "Let&#39;s Take a Photo",
            "bookCover": "/files/daka/0j92CcXyvBPmfpR3XRxw6s6w.png",
            "bookDes": "Let&#39;s take a photo. One, two, three, smile! ",
            "level": "0"
        },
        "readingTimeId": "20180131",
        "recordServerId": "StHqo2Ap6oqydKNyJGu1KXc2RdWWA0OZsP2YHBbGXSqFflkB_CwSUnw7o6HjmTf0",
        "recordLocalId": "",
        "_id": ObjectId("5a71b65f20ec3c22f16489a1")
    }, {
        "readingList": {
            "bookId": "5a5ec7158aadef789ff8af64",
            "bookName": "How Many Fingers",
            "bookCover": "/files/daka/TrOTgAWIrh6EAODi4fUxqVYV.png",
            "bookDes": "One, two, three, four, five. How many fingers? ",
            "level": "0"
        },
        "readingTimeId": "20180201",
        "recordServerId": "DLHY0MOzCTbhtFjnc2oY2gMqDL-eKa32sJJgbsZO__vwpjqvxKsJ2VDBYyRzcL72",
        "recordLocalId": "",
        "_id": ObjectId("5a7307ea3e393a634f5126bc")
    }, {
        "readingList": {
            "bookId": "5a5ec89b8aadef789ff8af68",
            "bookName": "Let&#39;s Go to the Aquarium",
            "bookCover": "/files/daka/LMKhPFdEGcOSnZciQUWvfRiB.png",
            "bookDes": "That is a shark. It&#39;s very dangerous and has big teeth. ",
            "level": "0"
        },
        "readingTimeId": "20180202",
        "recordServerId": "dTLhR_ZW7t_yIxHB1PR0N6opHrn2YFjucbyCddsjpG0eSyhfOh6boZBuOsACemfu",
        "recordLocalId": "",
        "_id": ObjectId("5a746cf43eb21113374199fe")
    }, {
        "readingList": {
            "bookId": "5a5eca658aadef789ff8af6b",
            "bookName": "I Like Fruit",
            "bookCover": "/files/daka/Iscni_PTEiJtsjBK_PAblXVe.png",
            "bookDes": "I like apples, I like apples, I like apples; yes I do. ",
            "level": "0"
        },
        "readingTimeId": "20180203",
        "recordServerId": "StHqo2Ap6oqydKNyJGu1KUPx51Lz59LOwX1iSH4h5aWFsUdzRowQRi6DuVszXaUw",
        "recordLocalId": "",
        "_id": ObjectId("5a75a0e6201c4d62ccbd5359")
    }, {
        "readingList": {
            "bookId": "5a5ee3f8880add0fe378e378",
            "bookName": "Vic&#39;s Tea Party",
            "bookCover": "/files/daka/aDFDGISnAg_HH4wSvaNlPTju.png",
            "bookDes": "One day Vic goes shopping. ",
            "level": "0"
        },
        "readingTimeId": "20180204",
        "recordServerId": "9MCBBGU9zprutI32is30yNSuCAupxVmSWF1KGMdaUHSiY_PmuRPRmaIb_1LdrceX",
        "recordLocalId": "",
        "_id": ObjectId("5a76b410a80ef50ff2132f09")
    }, {
        "readingList": {
            "bookId": "5a5ee69c880add0fe378e37b",
            "bookName": "Things in My Classroom",
            "bookCover": "/files/daka/xSj6fTuwLVpTS2roH5oCCwqo.png",
            "bookDes": "I have a book a pencil and glue. I can draw!",
            "level": "0"
        },
        "readingTimeId": "20180205",
        "recordServerId": "luLUdUY8IE2pWWvDorpVuadANQ463EdBCHiNW3-NCk04LtO3F9nUiaJavdCBAy0g",
        "recordLocalId": "",
        "_id": ObjectId("5a779d22a80ef50ff2133b93")
    }, {
        "readingList": {
            "bookId": "5a5eebf0880add0fe378e37e",
            "bookName": "Are There Sinks",
            "bookCover": "/files/daka/ymODjVhOhwkvPHouxfhu5gT7.png",
            "bookDes": "I want to wash my hands. Is there a sink in the garage? ",
            "level": "0"
        },
        "readingTimeId": "20180206",
        "recordServerId": "9MCBBGU9zprutI32is30yDwt03cl3IKLp3AOjtAgZus59uQYD-kCG7vVs4sOpqLu",
        "recordLocalId": "",
        "_id": ObjectId("5a79a97ae86c545b23524aed")
    }, {
        "readingList": {
            "bookId": "5a5eeed0880add0fe378e381",
            "bookName": "Face Rhyme",
            "bookCover": "/files/daka/CBMBPd20oE-mA045bwtH8Qsn.png",
            "bookDes": "Eyes, ears, mouth and nose. Touch your hair, touch your nose. ",
            "level": "0"
        },
        "readingTimeId": "20180207",
        "recordServerId": "Sk3cN2aodMkDKwL1DLOS-mfCUzxzbYYLhTALwBpEhSzzsJ0qXJ5y9CKQxe-36Zlp",
        "recordLocalId": "",
        "_id": ObjectId("5a7a46f109a9a556a2caa369")
    }, {
        "readingList": {
            "bookId": "5a5ef7376548b31b56b94e52",
            "bookName": "The Socer Games",
            "bookCover": "/files/daka/EBV940vZxn_T_KaT5fL8EYA8.png",
            "bookDes": "It&#39;s a sunny day. Kev and Mel are playing soccer. ",
            "level": "0"
        },
        "readingTimeId": "20180208",
        "recordServerId": "sRjI-W71gQbkiZnWNPlNYDh0Vc48enMoCifS5CUHKnNxDhM8CF3xr1iYam8CMBNG",
        "recordLocalId": "",
        "_id": ObjectId("5a7c1e7b15865250cdc1cd0b")
    }, {
        "readingList": {
            "bookId": "5a5f3b3ace0a4b2edd1368e6",
            "bookName": "This Is The Way",
            "bookCover": "/files/daka/PVchq8mhSlIE5g2CSo-qH4HQ.png",
            "bookDes": "This is the way we touch our hair, can you touch your hair? ",
            "level": "0"
        },
        "readingTimeId": "2018029",
        "recordServerId": "9MCBBGU9zprutI32is30yFJTuMOdhPwb02-5DEPqqZkyKuwYTYdq0BrNJYi1Zjat",
        "recordLocalId": "",
        "_id": ObjectId("5a7d59f7e72e223a4dd61ec5")
    }, {
        "readingList": {
            "bookId": "5a5f3b3ace0a4b2edd1368e6",
            "bookName": "This Is The Way",
            "bookCover": "/files/daka/PVchq8mhSlIE5g2CSo-qH4HQ.png",
            "bookDes": "This is the way we touch our hair, can you touch your hair? ",
            "level": "0"
        },
        "readingTimeId": "20180209",
        "recordServerId": "yOsBo1X0V3zbJ-Ca1wKRcja1Ul0igPC5xwVV_Azz4UFH-NSVWpnYPdqkgVmQHvE4",
        "recordLocalId": "",
        "onlyVoice": true,
        "_id": ObjectId("5a7d5a88e72e223a4dd61ecd")
    }, {
        "readingList": {
            "bookId": "5a5f3cc0ce0a4b2edd1368e9",
            "bookName": "Goodbye Song",
            "bookCover": "/files/daka/4YA21ZXva6-XX3ZyJl9jOMSP.png",
            "bookDes": "Goodbye friends. Goodbye friends. We&#39;ll have fun another day. ",
            "level": "0"
        },
        "readingTimeId": "20180210",
        "recordServerId": "9xJb9zru7HNhaRSfS9Pf6UH_XJRxFeGd4wsCZHqIOminuavrBgQg5E3ak2n6ZBhQ",
        "recordLocalId": "",
        "_id": ObjectId("5a7ef61a78fe38113b16d449")
    }, {
        "readingList": {
            "bookId": "5a5f3f514d0c11334bb72d70",
            "bookName": "The Clothes Song",
            "bookCover": "/files/daka/K7j2j9rajPCg2jtAJNW8knIN.png",
            "bookDes": "What is in your bag? There are gloves and a hat. Gloves and a hat.",
            "level": "0"
        },
        "readingTimeId": "20180211",
        "recordServerId": "FujlPaJeq1gJ4-QfV8nYwMAvlJr3vbZnyX_MY2x1M5Cf7uVk5YTQYCURdyAwvPgX",
        "recordLocalId": "",
        "_id": ObjectId("5a804266a94fc93d9f79de69")
    }],
    "recodeInfo": {
        "currentRecodeCounts": "20",
        "currentSerialRecodeCounts": "10",
        "lastRecodeTime": "1518355046538",
        "totalRecodeCounts": "20",
        "recodeTimeArray": ["20180123", "20180124", "20180125", "20180126", "20180127", "20180128", "20180129", "20180130", "20180131", "20180201", "20180202", "20180203", "20180204", "20180205", "20180206", "20180207", "20180208", "2018029", "20180210", "20180211"],
        "totalWordLength": "1474"
    }
}