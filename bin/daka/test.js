var wxDownloadVoicePromise = require('../../module/wx/WXDownloadVoice');

wxDownloadVoicePromise({
    DOWNLOAD_DIR: '/root/signInClock/public/files/media/',
    mediaId: 'f_zAQiKrC5b78H7e8vAjaTGnfp_H2gMO8ohLjeX7XPELIchnm065QcX4u7UXFIlb'
}).catch(function (e) {
    console.log(e);
});