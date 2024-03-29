const StateRegion = [{
    'text': '北京',
    'value': '11'
}, {
    'text': '天津',
    'value': '12'
}, {
    'text': '上海',
    'value': '31'
}, {
    'text': '重庆',
    'value': '50'
}, {
    'text': '河北',
    'value': '13'
}, {
    'text': '河南',
    'value': '41'
}, {
    'text': '云南',
    'value': '53'
}, {
    'text': '辽宁',
    'value': '21'
}, {
    'text': '黑龙江',
    'value': '23'
}, {
    'text': '湖南',
    'value': '43'
}, {
    'text': '安徽',
    'value': '34'
}, {
    'text': '山东',
    'value': '37'
}, {
    'text': '新疆',
    'value': '65'
}, {
    'text': '江苏',
    'value': '32'
}, {
    'text': '浙江',
    'value': '33'
}, {
    'text': '江西',
    'value': '36'
}, {
    'text': '湖北',
    'value': '42'
}, {
    'text': '广西',
    'value': '45'
}, {
    'text': '甘肃',
    'value': '62'
}, {
    'text': '山西',
    'value': '14'
}, {
    'text': '内蒙古',
    'value': '15'
}, {
    'text': '陕西',
    'value': '61'
}, {
    'text': '吉林',
    'value': '22'
}, {
    'text': '福建',
    'value': '35'
}, {
    'text': '贵州',
    'value': '52'
}, {
    'text': '广东',
    'value': '44'
}, {
    'text': '青海',
    'value': '63'
}, {
    'text': '西藏',
    'value': '54'
}, {
    'text': '四川',
    'value': '51'
}, {
    'text': '宁夏',
    'value': '64'
}, {
    'text': '海南',
    'value': '46'
}];


const StateCode = [{
        id: "110000",
        name: "北京",
        fullname: "北京市",
        pinyin: [
            "bei",
            "jing"
        ],
        location: {
            lat: 39.90469,
            lng: 116.40717
        },
        cidx: [
            0,
            15
        ]
    },
    {
        id: "120000",
        name: "天津",
        fullname: "天津市",
        pinyin: [
            "tian",
            "jin"
        ],
        location: {
            lat: 39.0851,
            lng: 117.19937
        },
        cidx: [
            16,
            31
        ]
    },
    {
        id: "130000",
        name: "河北",
        fullname: "河北省",
        pinyin: [
            "he",
            "bei"
        ],
        location: {
            lat: 38.03599,
            lng: 114.46979
        },
        cidx: [
            32,
            42
        ]
    },
    {
        id: "140000",
        name: "山西",
        fullname: "山西省",
        pinyin: [
            "shan",
            "xi"
        ],
        location: {
            lat: 37.87343,
            lng: 112.56272
        },
        cidx: [
            43,
            53
        ]
    },
    {
        id: "150000",
        name: "内蒙古",
        fullname: "内蒙古自治区",
        pinyin: [
            "nei",
            "meng",
            "gu"
        ],
        location: {
            lat: 40.81733,
            lng: 111.76522
        },
        cidx: [
            54,
            65
        ]
    },
    {
        id: "210000",
        name: "辽宁",
        fullname: "辽宁省",
        pinyin: [
            "liao",
            "ning"
        ],
        location: {
            lat: 41.83571,
            lng: 123.42925
        },
        cidx: [
            66,
            79
        ]
    },
    {
        id: "220000",
        name: "吉林",
        fullname: "吉林省",
        pinyin: [
            "ji",
            "lin"
        ],
        location: {
            lat: 43.89616,
            lng: 125.3268
        },
        cidx: [
            80,
            88
        ]
    },
    {
        id: "230000",
        name: "黑龙江",
        fullname: "黑龙江省",
        pinyin: [
            "hei",
            "long",
            "jiang"
        ],
        location: {
            lat: 45.74208,
            lng: 126.66285
        },
        cidx: [
            89,
            101
        ]
    },
    {
        id: "310000",
        name: "上海",
        fullname: "上海市",
        pinyin: [
            "shang",
            "hai"
        ],
        location: {
            lat: 31.23037,
            lng: 121.4737
        },
        cidx: [
            102,
            117
        ]
    },
    {
        id: "320000",
        name: "江苏",
        fullname: "江苏省",
        pinyin: [
            "jiang",
            "su"
        ],
        location: {
            lat: 32.06071,
            lng: 118.76295
        },
        cidx: [
            118,
            130
        ]
    },
    {
        id: "330000",
        name: "浙江",
        fullname: "浙江省",
        pinyin: [
            "zhe",
            "jiang"
        ],
        location: {
            lat: 30.26555,
            lng: 120.1536
        },
        cidx: [
            131,
            141
        ]
    },
    {
        id: "340000",
        name: "安徽",
        fullname: "安徽省",
        pinyin: [
            "an",
            "hui"
        ],
        location: {
            lat: 31.86157,
            lng: 117.28565
        },
        cidx: [
            142,
            157
        ]
    },
    {
        id: "350000",
        name: "福建",
        fullname: "福建省",
        pinyin: [
            "fu",
            "jian"
        ],
        location: {
            lat: 26.09982,
            lng: 119.29659
        },
        cidx: [
            158,
            166
        ]
    },
    {
        id: "360000",
        name: "江西",
        fullname: "江西省",
        pinyin: [
            "jiang",
            "xi"
        ],
        location: {
            lat: 28.67417,
            lng: 115.91004
        },
        cidx: [
            167,
            177
        ]
    },
    {
        id: "370000",
        name: "山东",
        fullname: "山东省",
        pinyin: [
            "shan",
            "dong"
        ],
        location: {
            lat: 36.66826,
            lng: 117.02076
        },
        cidx: [
            178,
            194
        ]
    },
    {
        id: "410000",
        name: "河南",
        fullname: "河南省",
        pinyin: [
            "he",
            "nan"
        ],
        location: {
            lat: 34.76571,
            lng: 113.75322
        },
        cidx: [
            195,
            212
        ]
    },
    {
        id: "420000",
        name: "湖北",
        fullname: "湖北省",
        pinyin: [
            "hu",
            "bei"
        ],
        location: {
            lat: 30.54539,
            lng: 114.34234
        },
        cidx: [
            213,
            229
        ]
    },
    {
        id: "430000",
        name: "湖南",
        fullname: "湖南省",
        pinyin: [
            "hu",
            "nan"
        ],
        location: {
            lat: 28.11266,
            lng: 112.9834
        },
        cidx: [
            230,
            243
        ]
    },
    {
        id: "440000",
        name: "广东",
        fullname: "广东省",
        pinyin: [
            "guang",
            "dong"
        ],
        location: {
            lat: 23.13171,
            lng: 113.26627
        },
        cidx: [
            244,
            264
        ]
    },
    {
        id: "450000",
        name: "广西",
        fullname: "广西壮族自治区",
        pinyin: [
            "guang",
            "xi"
        ],
        location: {
            lat: 22.81521,
            lng: 108.32754
        },
        cidx: [
            265,
            278
        ]
    },
    {
        id: "460000",
        name: "海南",
        fullname: "海南省",
        pinyin: [
            "hai",
            "nan"
        ],
        location: {
            lat: 20.01997,
            lng: 110.34863
        },
        cidx: [
            279,
            297
        ]
    },
    {
        id: "500000",
        name: "重庆",
        fullname: "重庆市",
        pinyin: [
            "chong",
            "qing"
        ],
        location: {
            lat: 29.56471,
            lng: 106.55073
        },
        cidx: [
            298,
            335
        ]
    },
    {
        id: "510000",
        name: "四川",
        fullname: "四川省",
        pinyin: [
            "si",
            "chuan"
        ],
        location: {
            lat: 30.65089,
            lng: 104.07572
        },
        cidx: [
            336,
            356
        ]
    },
    {
        id: "520000",
        name: "贵州",
        fullname: "贵州省",
        pinyin: [
            "gui",
            "zhou"
        ],
        location: {
            lat: 26.5982,
            lng: 106.70722
        },
        cidx: [
            357,
            365
        ]
    },
    {
        id: "530000",
        name: "云南",
        fullname: "云南省",
        pinyin: [
            "yun",
            "nan"
        ],
        location: {
            lat: 25.0453,
            lng: 102.70973
        },
        cidx: [
            366,
            381
        ]
    },
    {
        id: "540000",
        name: "西藏",
        fullname: "西藏自治区",
        pinyin: [
            "xi",
            "zang"
        ],
        location: {
            lat: 29.64725,
            lng: 91.11748
        },
        cidx: [
            382,
            388
        ]
    },
    {
        id: "610000",
        name: "陕西",
        fullname: "陕西省",
        pinyin: [
            "shan",
            "xi"
        ],
        location: {
            lat: 34.26486,
            lng: 108.95424
        },
        cidx: [
            389,
            398
        ]
    },
    {
        id: "620000",
        name: "甘肃",
        fullname: "甘肃省",
        pinyin: [
            "gan",
            "su"
        ],
        location: {
            lat: 36.05942,
            lng: 103.82634
        },
        cidx: [
            399,
            412
        ]
    },
    {
        id: "630000",
        name: "青海",
        fullname: "青海省",
        pinyin: [
            "qing",
            "hai"
        ],
        location: {
            lat: 36.62087,
            lng: 101.78011
        },
        cidx: [
            413,
            420
        ]
    },
    {
        id: "640000",
        name: "宁夏",
        fullname: "宁夏回族自治区",
        pinyin: [
            "ning",
            "xia"
        ],
        location: {
            lat: 38.47117,
            lng: 106.25867
        },
        cidx: [
            421,
            425
        ]
    },
    {
        id: "650000",
        name: "新疆",
        fullname: "新疆维吾尔自治区",
        pinyin: [
            "xin",
            "jiang"
        ],
        location: {
            lat: 43.79343,
            lng: 87.6271
        },
        cidx: [
            426,
            448
        ]
    },
    {
        id: "710000",
        name: "台湾",
        fullname: "台湾省",
        pinyin: [
            "tai",
            "wan"
        ],
        location: {
            lat: 25.030724,
            lng: 121.520076
        },
        cidx: [
            449,
            468
        ]
    },
    {
        id: "810000",
        name: "香港",
        fullname: "香港特别行政区",
        pinyin: [
            "xiang",
            "gang"
        ],
        location: {
            lat: 22.27534,
            lng: 114.16546
        },
        cidx: [
            469,
            486
        ]
    },
    {
        id: "820000",
        name: "澳门",
        fullname: "澳门特别行政区",
        pinyin: [
            "ao",
            "men"
        ],
        location: {
            lat: 22.19875,
            lng: 113.54913
        },
        cidx: [
            487,
            490
        ]
    }
];


const CenterList = [
    "其他 - 我不是EF的学员",
    "成都万象城中心",
    "成都天府广场中心",
    "成都银泰中心",
    "重庆观音桥中心",
    "武汉天地中心",
    '武汉汉街中心（ 知音广场）',
    "西安西高新中心",
    "西安长安国际中心",
    "上海徐家汇中心",
    "上海中山公园中心",
    "上海八佰伴中心",
    "上海人民广场中心",
    "上海张江中心",
    "杭州滨江中心",
    "杭州武林中心",
    "南京中心",
    "昆山中心",
    "苏州中心",
    "无锡中心",
    "宁波中心",
    "北京崇文门中心",
    "北京东直门中心",
    "北京国贸中心",
    "北京万寿路中心",
    "北京亚运村中心",
    "北京中关村中心",
    "天津南京路中心",
    "天津大悦城中心",
    "长沙悦方IDC中心",
    "佛山祖庙中心",
    "福州仓山CSC中心",
    "广州高德置地中心",
    "广州公园前中心",
    "广州万菱汇中心",
    "深圳CBD福田中心",
    "深圳万象中心",
]

module.exports = {
    StateRegion,
    StateCode,
    CenterList
};