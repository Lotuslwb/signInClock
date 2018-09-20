var leadsDB = require('../module/DB/LeadsDB');
var all = 0;
leadsDB.User.find({
    'tag': 'v8',
    'createTime': /Sep 19/
}, function (err, docs) {
    var count = docs.length;
    console.log(count);
});


leadsDB.User.find({
    'tag': 'v8',
    'createTime': /Sep 20/
}, function (err, docs) {
    var count = docs.length;
    console.log(docs[0]);
    sendData(docs[0]);
});

function sendData(doc) {
    const body = getBody(doc);
    // For Online 
    var host = 'https://services.ef.com/';

    var submissionURL = host + 'secureformsapi/Campaignsubmission';
    var superagent = require('superagent');

    superagent.post(submissionURL).send(body).then((res) => {
        console.log(res.body);
        all++;
        console.log(all);
    }).catch((e) => {
        console.log(e);
    });
}

function getBody(doc) {

    //The main object to be sent with the submission request
    var submissionData = new Object();
    //Individual properties of the main object
    var customer = new Object();
    var extendedDetail = new Object();
    var weChatData = new Object();
    var trackingData = new Object();
    var campaigndata = new Object();

    customer.FirstName = doc.realName || '';
    customer.LastName = '-';
    customer.MobilePhone = doc.cellPhone;
    customer.DateOfBirth = null; // January 9th, 1975 (0-based index for months)
    customer.StateRegionName = doc.cityName;
    customer.StateRegionCode = "CN-";
    customer.CountryOfResidence = "CN";
    customer.Gender = '-';
    customer.Comments = '类型:-';
    customer.Email = doc.cellPhone + "@noemail.com";


    // Tracking
    trackingData.Etag = 'voluntour2015_180919' + "_Restart";
    trackingData.EntrySourceCode = '007278';

    //Campaign Data
    campaigndata.CampaignName = "Restart";
    campaigndata.CampaignAllocationPrograms = "ILS,LY";
    campaigndata.CampaignAllocationCode = "mixed";

    //Extended Details
    extendedDetail.WantsMoreInfo = true;
    extendedDetail.WantsBrochure = true;



    //Assigning individual classes to the main object
    submissionData.customer = customer;
    submissionData.extendedDetail = extendedDetail;
    submissionData.tracking = trackingData;
    submissionData.weChat = weChatData;
    submissionData.campaignData = campaigndata;

    console.log(submissionData);
    return submissionData;
}