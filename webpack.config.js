const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

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
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    ]
}