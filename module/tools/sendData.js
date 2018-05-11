function sendData(status, data, errmsg) {
    return {
        status: status,
        data: data,
        errmsg: errmsg
    }
}


module.exports = sendData;