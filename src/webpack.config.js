var path = require("path");
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require("webpack");

module.exports = {
	devtool: 'source-map',
	entry: ['./js/main.js', './scss/main.scss'],
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
          use: [{
						loader: 'css-loader',
						options: {
							minimize: true
						}
					}, {
						loader: 'sass-loader',
						options: {
							includePaths: ['node_modules']
						}
					}]
				})
			}
		]
	},

	output: {
    path: path.join(__dirname, "./../static"),
		filename: '[name].bundle.js',
	},

	resolve: {
		modules: [path.resolve(__dirname, 'src'), 'node_modules'],
	},

	plugins: [
		new UglifyJSPlugin({
      sourceMap: true
    }),
		new ExtractTextPlugin("main.css"),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
	],
	watchOptions: {
		watch: true
	}
}
