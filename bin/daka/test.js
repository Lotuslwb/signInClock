var wxDownloadVoicePromise = require('../../module/wx/WXDownloadVoice');

wxDownloadVoicePromise({
    DOWNLOAD_DIR: '/root/signInClock/public/files/media/',
    mediaId: 'Vh7BhZI25vbNVelTVawBFYYEqGQ7Wr3FUp6JQZ5G2ezkSHjXSg-QLH-28J5n_3B3'
}).catch(function (e) {
    console.log(e);
});