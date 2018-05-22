const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackHarddiskPlugin = require("html-webpack-harddisk-plugin");

const ROOT = __dirname;
const DOCS = path.resolve(ROOT, "docs");
const {NODE_ENV} = process.env;

const prod = NODE_ENV === "production";
module.exports = {
	entry: path.resolve(ROOT, "app/index.js"),
	output: {
		path: DOCS,
		filename: "[name].js",
		libraryTarget: "umd"
	},
	mode: NODE_ENV || "development",
	devtool: "source-map",
	module: {
		rules: [
			{
				test: /\.js?$/,
				loader: "babel-loader",
				exclude: /(node_modules)/
			},
			{
				test: /\.(png|jpg|gif)$/,
				use: [
					{
						loader: "file-loader"
					}
				]
			}
		]
	},
	devServer: {
		contentBase: DOCS,
		compress: false,
		historyApiFallback: true,
		hot: true
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: "Demo",
			filename: "index.html",
			template: "app/index.html",
			alwaysWriteToDisk: true,
			minify: {
				collapseWhitespace: true,
				html5: true,
				minifyCSS: false,
				quoteCharacter: '"',
				removeComments: false,
				removeRedundantAttributes: true,
				removeScriptTypeAttributes: true,
				removeStyleLinkTypeAttributes: true,
				sortClassName: false,
				sortAttributes: false,
				useShortDoctype: true
			}
		}),
		new HtmlWebpackHarddiskPlugin({
			outputPath: DOCS
		})
	]
};
