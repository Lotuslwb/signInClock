var path = '/root/signInClock/public/files/media';

var ffmpeg = require('fluent-ffmpeg');
var command = ffmpeg(path + '/0fY6gM-wmrptU7tgGhlCU6QPHXIuna2cwkJbwWa_m7Xvxak8lz8nFIHll3r6R3OB.amr')
    .on('end', function () {
        console.log('file has been converted succesfully');
    })
    .on('error', function (err) {
        console.log('an error happened: ' + err.message);
    })
    .save(path + '/content.mp3');