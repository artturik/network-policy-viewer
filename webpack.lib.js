const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = merge(common, {
    entry: {
        index: './index.tsx',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'lib'),
        library: {
            name: 'network-policy-viewer',
            type: 'umd',
        }
    },
    externals: [nodeExternals()],
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),
    ]
});