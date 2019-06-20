const makeDate = function() {
    let d = new Date();
    let formattedDate = "";
    formattedDate += (d.getMonth() + 1 ) + "-";
    formattedDate += d.getDate() + "-";
    formattedDate += d.getFullYear();
    return formattedDate;
}

module.exports = makeDate;