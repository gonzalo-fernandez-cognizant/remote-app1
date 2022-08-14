const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
    mode: 'development',
    entry: {
        app1: './component/index.js',
    },
    output: {
        filename: '[name].bundle.js',
        path:  path.resolve(__dirname, '../dist'),
        publicPath: 'http://localhost:9000/',
    },
    devServer: {
        port: 9000,
        static: {
            directory: path.resolve(__dirname, '../dist'),
        },
        devMiddleware: {
            index: 'index.html',
            writeToDisk: true
        }
    },
    devtool: false, // for more readable output (but no source maps)
    module: {
     rules: [
        {
            test: /\.(png|jpg|jpeg)$/,
            type: 'asset/resource',
            parser: {
                dataUrlCondition: {
                    maxSize: 3 * 1024
                }
            }
        },
        {
            test: /\.txt/,
            type: 'asset/source'
        },
        // {
        //     test: /\.css/,
        //     type: 'asset/source'
        // },
        {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        },
        {
            test: /\.scss$/,
            use: [
                'style-loader', 'css-loader', 'sass-loader'
            ]
        },
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: [ '@babel/env' ],
                    plugins: []
                }
            }
        }
     ]   
    },
    plugins: [
        new CleanWebpackPlugin(),
        // new webpack.SourceMapDevToolPlugin(),
        new HtmlWebpackPlugin({
            template: './component/index.html',
            meta: {
                description: 'Meta tag inserted from webpack'
            },
            filename: 'index.html',
            minify: false

        }),
        new ModuleFederationPlugin({
            name: 'MyApp1',
            filename: 'remoteApp1.js',
            exposes: {
                //generates as many code bundles as remotes, and then remoteEntry (or any name put on "filename") ochestrates exposed remotes
                './Page': './component/add-image.js',
                // './Index': './component/index.js',
            }
        })
    ]
};
