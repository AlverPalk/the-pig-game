const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MinCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = (env, args) => {
    return {
        entry: './src/js/index.js',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'js/bundle.js'
        },

        optimization: {
            minimize: true,
            minimizer: [
                new OptimizeCSSAssetsPlugin({}),
                new UglifyJsPlugin({})
            ]
        },

        devServer: {
            contentBase: './dist'
        },

        plugins: [
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: 'index.html'
            }),
            new MinCssExtractPlugin({
                filename: 'css/main.css'
            }),
            new CopyWebpackPlugin([{
                from: 'src/img',
                to: './img'
            }])
        ],

        module: {
            rules: [
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [
                        (args.mode !== 'production') ? 'style-loader' : MinCssExtractPlugin.loader,
                        { loader: 'css-loader', options: { url: false, sourceMap: true } },
                        { loader: 'sass-loader', options: { sourceMap: true } }
                    ]
                }
            ]
        }
    };
};