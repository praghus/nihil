const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = merge(common, {
    mode: 'production',
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin({
            cleanAfterEveryBuildPatterns: ['dist']
        }),
        new MiniCssExtractPlugin({
            filename: 'style.[contenthash].css'
        }),
        new HtmlWebpackPlugin({
            template: path.join(process.cwd(), 'src/index.html'),
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                minifyJS: true,
                minifyCSS: true
            },
            inject: true
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
        })
    ],
    output: {
        filename: '[name].[hash].js',
        chunkFilename: '[name].[hash].chunk.js'
    },
    performance: {
        assetFilter: (assetFilename) => !(/(\.map$)|(^(main\.|favicon\.))/.test(assetFilename))
    }
})
