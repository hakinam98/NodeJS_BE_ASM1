const fs = require('fs');
const part = require('path');

const moviesList = JSON.parse(fs.readFileSync('./data/movieList.json', 'utf8'));

module.exports = moviesList;