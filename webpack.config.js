const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const config = {
	entry: './src/app',
	output: {
		filename: 'build.js',
		path: path.resolve(__dirname, 'dist')
	},
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 9000
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
	},
    plugins: [
            new CopyWebpackPlugin([{ from: path.resolve(__dirname, 'index.html'), to: path.resolve(__dirname, 'dist')}])
    ]
};

module.exports = config;