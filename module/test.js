/**
 * Created by lotuslwb on 16/7/19.
 */

var obj = require('../module/connectDB');


var options = {
    'name': 'test12',
    'Schema': {
        name: String,
        tel: String,
        mac1: String,
        mac2: String,
        mac3: String
    }
}
var User = new obj(options);

var json = {
    name: 'liwenb2',
    tel: '12132',
    mac1: 'mac1',
    mac2: 'mac2',
    mac3: 'mac3'
}
User.add(json, function (docs) {
    console.log(docs);
})
