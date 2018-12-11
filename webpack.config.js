var webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        libs: './src/libs/index.js',
        zdPlugin: './src/index.js'
    },
    devServer: {
        contentBase: './dist',
        hot: true,
        open: false
    },
    module: {
        rules:[{
            test: /\.(png|jpg|gif)$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 1024*1024,
                    mimetype: 'image/png'
                }
            }]
        }]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    resolve: {
        alias: {
            components: './app/components'
        }
    },
    output: {
        path: __dirname + '/dist',
        filename: '[name].[hash].js',
    }
};
