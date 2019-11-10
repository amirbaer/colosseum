
function db_to_json(arr) {
    new_arr = []
    arr.forEach(function(obj){
        new_arr.push(obj.toJSON())
    })
    return new_arr
}

module.exports = {
    db_to_json,
}
