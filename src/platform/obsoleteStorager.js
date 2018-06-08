var platform = process.env.REACT_APP_platform;
if (platform === 'chrome') {
    module.exports = require('./chrome/Storager.js');
} else {
    module.exports = require('./node/Storager.js');
}