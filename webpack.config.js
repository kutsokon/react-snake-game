const path = require('path');
const config = {
	entry: './src/app',
	output: {
		filename: 'build.js',
		path: path.resolve(__dirname, 'dist')
	},
	devtool: 'source-map',
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				use: 'babel-loader'
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			}
		]
	}
}

module.exports = config;