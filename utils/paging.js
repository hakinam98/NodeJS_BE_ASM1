
const pagination = (arr, page) => {
    limit = 20;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const newArr = arr.slice(startIndex, endIndex)
    return newArr;
}

module.exports = pagination;