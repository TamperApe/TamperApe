const CopyWebpackPlugin = require('copy-webpack-plugin');

var chromeConfig = {
    setup: function (config, env) {
        config.plugins.push(
            new CopyWebpackPlugin(
                [{
                    from: 'src/platform/chrome/*',
                    //不拷贝文件夹
                    flatten: true,
                }]
                , { debug: 'debug' }
            )
        );
    }
}


module.exports = chromeConfig;