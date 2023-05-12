function dateformatter(date) {
    var dateonly = date.split("T");
    var dateArray = dateonly[0].split("-")
    newdate = `${dateArray[2]}/${dateArray[1]}/${dateArray[0]}`
    return newdate;
}