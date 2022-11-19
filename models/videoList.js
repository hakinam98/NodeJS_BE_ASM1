const fs = require('fs');
const part = require('path');

const videosList = JSON.parse(fs.readFileSync('./data/videoList.json', 'utf8'));

module.exports = videosList;