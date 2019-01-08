'use strict';

const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractor = new ExtractTextPlugin({
    filename: "styles/styles.css",
});

module.exports = merge(common, {
    mode: 'production',
    devtool: 'none',
    stats: 'errors-only',
    optimization: {
        minimize: true
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new ExtractTextPlugin({filename: 'bundle.css'}),
        // compiling mode “scope hoisting”
        new webpack.optimize.ModuleConcatenationPlugin(),
        extractor,
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader'
            },
            {
                test: /\.(less|css)$/,
                use: extractor.extract(['css-loader?minimize=true', 'resolve-url-loader', 'less-loader'])
            },
            {
                test: /\.scss$/,
                use: extractor.extract(['css-loader?minimize=true', 'resolve-url-loader', 'sass-loader'])
            },
        ]
    }
});
