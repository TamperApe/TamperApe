require('dotenv').config()
const { injectBabelPlugin } = require('react-app-rewired');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const chromeConfig = require('./config-overrides/config-overrides.chrome');
const webpack = require('webpack');

module.exports = function override(config, env) {
    config = injectBabelPlugin(
        ['import',
            {
                libraryName: 'antd',
                libraryDirectory: 'es',
                style: 'css'
            }
        ], config);

    var platform = process.env.REACT_APP_platform;
    console.log(platform);
    if (platform === 'chrome')
        chromeConfig.setup(config, env);

    return config;
};