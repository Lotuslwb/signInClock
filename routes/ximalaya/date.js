var year = [],
    month = [],
    date = [];
for (var i = 1960; i <= 2018; i++) {
    year.push({
        value: i,
        text: i
    })

}
for (var i = 1; i <= 12; i++) {
    month.push({
        value: i,
        text: i
    })
}

for (var i = 1; i <= 31; i++) {
    date.push({
        value: i,
        text: i
    })
}




module.exports = {
    year: year,
    month: month,
    date: date,
};