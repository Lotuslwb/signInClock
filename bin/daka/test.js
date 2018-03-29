var wxDownloadVoicePromise = require('../../module/wx/WXDownloadVoice');

wxDownloadVoicePromise({
    DOWNLOAD_DIR: '/root/signInClock/public/files/media/',
    mediaId: '9MCBBGU9zprutI32is30yDm4Qz4FcS07SAX566TzFe3II-Ncs0KdkgW1LtxN1E8g'
}).catch(function (e) {
    console.log(e);
});