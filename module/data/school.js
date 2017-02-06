/**
 * Created by lotuslwb on 16/10/22.
 */

var schoolList = [
    {
        cityNo: 'SH',
        schoolArray: ["徐家汇中心", "浦东时代广场中心", "金桥国际中心", "浦东川沙中心", "浦东联洋大拇指广场中心 ", "闵行仲盛商城中心", "闵行顾戴路中心", "中山公园中心", "长宁百联西郊中心", "五角场创智天地中心", "虹口龙之梦中心", "黄浦中心", "中环百联中心", "大宁中心", "宝山共康绿地中心", "我格广场中心", "英孚国际留学·备考中心（浦西中心）", "英孚国际留学·备考中心（浦东中心）", "宝山大华中心", "闵行春申中心"]
    },
    {
        cityNo: 'BJ',
        schoolArray: ["海淀万柳中心", "王府井中心", "朝阳北苑中心", "望京新世界中心", "海淀翠微中心", "朝阳公园中心", "东城安贞中心", "崇文新活馆中心", "清河五彩城中心", "丰台方庄中心", "太阳宫爱琴海中心", "亦庄华联力宝中心", "西直门枫蓝中心", "朝阳大悦城中心"]
    },
    {
        cityNo: 'GZ',
        schoolArray: ["越秀环市东中心", "天河中山大道中心 ", "天河北中心", "荔湾西门口中心", "番禺万博中心 ", "海珠工业大道乐峰中心", "海珠新港西中心 ", "海珠滨江中心", "越秀东山口中心", "英孚国际留学·备考中心"]
    },
    {
        cityNo: 'SZ',
        schoolArray: ["福田深南中中心", "福田景田中心", "福田百花中心", "福田区委中心", "南山后海中心", "南山前海中心", "南山西丽中心", "南山蛇口花园城中心", "宝安新安中心", "宝安海雅缤纷城中心", "龙华绿景1866中心", "龙岗世贸中心"]
    },
    {
        cityNo: 'FZ',
        schoolArray: ['东二环泰禾中心']
    },
    {
        cityNo: 'FS',
        schoolArray: ["顺德大良中心", "南海桂城中心"]
    },
    {
        cityNo: 'CQ',
        schoolArray: ["观音桥中心", "龙湖中心", "大坪时代天街中心", "南坪中心", "沙坪坝中心", "杨家坪中心"]
    },
    {
        cityNo: 'BT',
        schoolArray: ["包头中心"]
    },
    {
        cityNo: 'CC',
        schoolArray: ["桂林路中心", "汽车厂中心", "旗舰中心", "高新中心"]
    },
    {
        cityNo: 'CS',
        schoolArray: ["长沙中心"]
    },
    {
        cityNo: 'CShu',
        schoolArray: ["常熟中心"]
    },
    {
        cityNo: 'CZ',
        schoolArray: ["常州中心"]
    },
    {
        cityNo: 'CD',
        schoolArray: ['顺城中心', '紫荆中心', '沙湾中心', '优品道中心', '高新世豪广场中心', 'SM广场']
    },
    {
        cityNo: 'CX',
        schoolArray: ['慈溪中心']
    },
    {
        cityNo: 'DL',
        schoolArray: ['奥林匹克广场中心', '软件园中心']
    },
    {
        cityNo: 'DQ',
        schoolArray: ["西滨路中心", "新村中心"]
    },
    {
        cityNo: 'DG',
        schoolArray: ["东莞中心"]
    },
    {
        cityNo: 'DY',
        schoolArray: ["东营中心"]
    },
    {
        cityNo: 'GY',
        schoolArray: ["贵阳中心"]
    },
    {
        cityNo: 'HZ',
        schoolArray: ["城西中心", "城东中心", "城北中心", "武林中心", "临平中心"]
    },
    {
        cityNo: 'HEB',
        schoolArray: ["哈尔滨中心"]
    },
    {
        cityNo: 'HF',
        schoolArray: ['庐江路', '栢景湾', '马鞍山路中心', '滨湖中心']
    },
    {
        cityNo: 'HHHT',
        schoolArray: ['呼和浩特中心']
    },
    {
        cityNo: 'HuiZ',
        schoolArray: ['惠州中心']
    },
    {
        cityNo: 'HuZ',
        schoolArray: ['湖州中心']
    },
    {
        cityNo: 'JX',
        schoolArray: ['嘉兴中心']
    },
    {
        cityNo: 'JH',
        schoolArray: ['金华中心']
    },
    {
        cityNo: 'JZ',
        schoolArray: ['锦州中心']
    },
    {
        cityNo: 'LZ',
        schoolArray: ['兰州中心']
    },
    {
        cityNo: 'NJ',
        schoolArray: ['新街口中心', '山西路中心', '龙江中心']
    },
    {
        cityNo: 'NN',
        schoolArray: ['南宁中心']
    },
    {
        cityNo: 'NT',
        schoolArray: ['南通中心']
    },
    {
        cityNo: 'NB',
        schoolArray: ['海曙中心', '江东中心', '鄞州中心']
    },
    {
        cityNo: 'QD',
        schoolArray: ['青岛中心']
    },
    {
        cityNo: 'QHD',
        schoolArray: ['秦皇岛中心']
    },
    {
        cityNo: "RZ",
        schoolArray: ["日照中心"]
    },
    {
        cityNo: "RA",
        schoolArray: ["瑞安中心"]
    },
    {
        cityNo: 'SX',
        schoolArray: ['绍兴中心']
    },
    {
        cityNo: 'SY',
        schoolArray: ['和平中心', '皇姑中心']
    },
    {
        cityNo: 'SJZ',
        schoolArray: ['长安中心', '桥西中心', '裕华中心']
    },
    {
        cityNo: 'SZ2',
        schoolArray: ['新区中心', '工业园区中心', '湖西中心']
    },
    {
        cityNo: 'TY',
        schoolArray: ['湖西中心', '双西中心']
    },
    {
        cityNo: 'TZ',
        schoolArray: ['椒江中心', '路桥中心', '玉环中心']
    },
    {
        cityNo: 'TS',
        schoolArray: ['新华中心', '凤凰新城中心']
    },
    {
        cityNo: 'TJ',
        schoolArray: ['和平中心', '天塔中心', '塘沽中心', '晶采中心', '河东中心', '泰达中心']
    },
    {
        cityNo: 'WLMQ',
        schoolArray: ['民主路中心', '友好中心', '铁路局中心']
    },
    {
        cityNo: 'WHai',
        schoolArray: ['威海中心']
    }, {
        cityNo: 'WZ',
        schoolArray: ['下吕浦中心', '新城中心']
    },
    {
        cityNo: 'WH',
        schoolArray: ['机场河旗舰中心', '武昌中心', '永清路中心', '光谷中心', '武胜凯德中心']
    },
    {
        cityNo: 'WX',
        schoolArray: ['太湖广场中心', '宝龙中心', '胜利门中心', '大剧院中心']
    },
    {
        cityNo: 'XM',
        schoolArray: ['滨北中心', '五缘湾中心']
    },
    {
        cityNo: 'XA',
        schoolArray: ['小寨中心', '高新中心', '交大中心', '经开中心']
    },
    {
        cityNo: 'XS',
        schoolArray: ['萧山中心']
    },
    {
        cityNo: 'XZ',
        schoolArray: ['创意68中心', '万达中心']
    },
    {
        cityNo: 'YT',
        schoolArray: ['烟台中心']
    },
    {
        cityNo: 'YW',
        schoolArray: ['义乌中心']
    },
    {
        cityNo: 'YY',
        schoolArray: ['余姚中心']
    },
    {
        cityNo: 'ZJG',
        schoolArray: ['张家港中心']
    },
    {
        cityNo: 'ZZ',
        schoolArray: ['中环百货中心', '青少年宫中心', '宝龙广场中心']
    },
    {
        cityNo: 'ZJ',
        schoolArray: ['镇江中心']
    }
];

module.exports = schoolList;