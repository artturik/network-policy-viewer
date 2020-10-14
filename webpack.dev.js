const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    plugins: [
        new webpack.DefinePlugin({
            'TERMINAL_URL': JSON.stringify('localhost'),
            'TERMINAL_PORT': JSON.stringify(3010),
            'FILES_URL': JSON.stringify('http://localhost:3020'),
        })
    ]
});