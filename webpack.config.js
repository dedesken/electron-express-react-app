const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        app: './views/index.js'
    },
    output: {
        filename: 'app.bundle.js',
        path: path.resolve(__dirname, './public'),
        publicPath: '/'
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
        }, {
            test: /\.css$/,
            loader: ['style-loader', 'css-loader', 'postcss-loader'],
        }, {
            test: /\.(png|jpg|jpeg|gif|svg)$/,
            loader: 'file-loader?limit=8192&name=assets/[name].[ext]?[hash]'
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './views/index.ejs'
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: './views/favicon.ico' },
                { from: './views/assets', to: 'assets' }
            ],
        })
    ],
    resolve: {
        extensions: ['.js', '.ts', '.jsx']
    },
    devtool: 'eval'
};
