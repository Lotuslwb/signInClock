var path = '/root/signInClock/public/files/media';
var ffmpeg = require('fluent-ffmpeg');
var command = ffmpeg(path + '/1Mzulsh1vcveqylz0Ir6REd9OH2RZDIU72Icl2cv1tVm57qXb4dy5Tm-n-NFgt0B.amr')
    .on('end', function () {
        console.log('file has been converted succesfully');
    })
    .on('error', function (err) {
        console.log('an error happened: ' + err.message);
    })
    .save(path + '/content.mp3');