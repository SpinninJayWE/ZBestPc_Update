const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const CopyPlugin = require("copy-webpack-plugin")
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const htmlWebpackPlugins = [
    new HtmlWebpackPlugin({
        filename: 'home.html',
        template: path.resolve(__dirname, '../public/index.html'),
        chunks:['home']
    }),
    new HtmlWebpackPlugin({
        filename: 'login.html',
        template: path.resolve(__dirname, '../public/index.html'),
        chunks:['login']
    })
]
const config = {
    mode: 'development',
    devtool: 'eval',
    entry: {
        home: path.resolve(__dirname, '../src/mpa/home.js'),
        login: path.resolve(__dirname, '../src/mpa/login.js')
    },
    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, '../dist')
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist')
        },
        compress: true,
        port: 9000,
        hot: true
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 8 * 1024,
                    }
                },
                generator: {
                    filename: 'images/[name].[hash:6][ext]'
                }
            },
            {
                test: /\.ejs/,
                loader: 'ejs-loader',
                options: {
                    esModule: false
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }
        ]
    },
    optimization: {
        minimize: true,
        minimizer: [
            new UglifyJsPlugin({
                // sourceMap: true
            }),
            new CssMinimizerPlugin()
        ],
        splitChunks: {
            chunks: 'all',
            minSize: 300 * 1024,
            name: 'common',
            cacheGroups: {
                jquery: {
                    name: 'jquery',
                    test: /jquery\.js/,
                    chunks: 'all'
                },
                'lodash-es': {
                    name: 'lodash-es',
                    test: /lodash-es/,
                    chunks: 'all'
                }
            }
        }
    },
    plugins: [
        ...htmlWebpackPlugins,
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        new CopyPlugin({  
            patterns: [
                {
                    from: path.resolve(__dirname, '../src/img'),
                    to: path.resolve(__dirname, '../dist/img')
                }
            ]
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            chunkFilename: 'css/[name].chunk.css'
        }),
        new CleanWebpackPlugin(),
        new VueLoaderPlugin()
    ]
}


module.exports = config