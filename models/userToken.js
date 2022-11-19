const fs = require('fs');
const part = require('path');

const userToken = JSON.parse(fs.readFileSync('./data/userToken.json', 'utf8'));


module.exports = userToken;