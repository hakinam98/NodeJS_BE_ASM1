const fs = require('fs');
const part = require('path');

const genreList = JSON.parse(fs.readFileSync('./data/genreList.json', 'utf8'));

module.exports = genreList;