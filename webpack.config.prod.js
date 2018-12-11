var webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: {
        Map3d: './src/app/components/ckg/index.js'
    },
    module: {
        rules:[{
            test: /\.(png|jpg|gif)$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 5*1024*1024,
                    mimetype: 'image/png'
                }
            }]
        }]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            template: './src/test/index.html'
        })
    ],
    output: {
        libraryTarget: 'amd',
        library: 'Map3d',
        path: __dirname + '/dist',
        filename: '[name].[hash].js'
    }
};
