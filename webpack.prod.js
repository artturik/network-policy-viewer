const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');

module.exports = merge(common, {
    mode: 'production',
    plugins: [
        new webpack.DefinePlugin({
            'TERMINAL_URL': JSON.stringify('dev.devopsrank-terminal-server.com'),
            'TERMINAL_PORT': JSON.stringify(80),
            'FILES_URL': JSON.stringify('http://dev.devopsrank-files.com'),
        })
    ]
});