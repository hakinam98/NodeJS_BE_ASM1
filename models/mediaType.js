const fs = require('fs');
const part = require('path');

const mediaType = JSON.parse(fs.readFileSync('./data/mediaType.json', 'utf8'));
module.exports = mediaType;