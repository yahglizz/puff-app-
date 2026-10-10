const { getDefaultConfig } = require('expo/metro-config');
const fs = require('node:fs');
const path = require('node:path');

const config = getDefaultConfig(__dirname);
// External-drive development may use a local node_modules symlink.
config.watchFolders = [fs.realpathSync(path.join(__dirname, 'node_modules'))];
module.exports = config;
