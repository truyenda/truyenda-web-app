const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin'); 
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'index.bundle.js'
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './build',
		hot: true,
		open: true,
        port: 3000
    },
    module:{
        rules: [
		{
		  test: /\.m?js$/,
		  exclude: /(node_modules|bower_components)/,
		  use: {
			loader: 'babel-loader',
			options: {
				  presets: ['@babel/preset-env'],
				  plugins: ['@babel/plugin-proposal-object-rest-spread']
				}
			}
        },
       {
           test: /\.s?css$/,
           use: [
                MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader'
                },
                {
                    loader: 'sass-loader'
                }
           ],
       },
        {
            test: /\.(png|jpg|gif|svg)$/,
            use: [{
                loader: 'file-loader'
            } ],
        },
        ]
    },
	optimization: {
		minimizer: [
			new UglifyJsPlugin(),
			new OptimizeCSSAssetsPlugin({})
		]
	},
    plugins: [
		new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
		new HtmlWebpackPlugin({
		  title: 'My App',
		  template: path.resolve(__dirname, 'src', 'index.html'),
		  filename: path.resolve('.', 'build', 'index.html')
		}
		)
    ]
}