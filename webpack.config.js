const webpack = require('webpack');
const path = require('path');
const libraryName = 'Scalable';

module.exports = {
    entry: {
        'scalable': './src/scalable.js',
        'scalable.min': './src/scalable.js'
    },
    devtool: "source-map",
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        library: libraryName,
        libraryTarget: 'umd',
        libraryExport: "default",
        umdNamedDefine: true
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            include: /\.min\.js$/,
            minimize: true
        })
    ],
    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
        ]
        /*loaders: [
            {
                test: /\.es6$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015']
                }
            }
        ]*/
    }
};