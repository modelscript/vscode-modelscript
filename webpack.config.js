/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */

//@ts-check
'use strict';

//@ts-check
/** @typedef {import('webpack').Configuration} WebpackConfig **/

const path = require('path');

/** @type WebpackConfig */
const browserExtensionConfig = {
	context: path.join(__dirname, 'extension'),
	mode: 'none',
	target: 'webworker',
	entry: {
		main: './src/main.ts',
	},
	output: {
		filename: '[name].js',
		path: path.join(__dirname, 'extension', 'dist'),
		libraryTarget: 'commonjs',
	},
	resolve: {
		mainFields: ['browser','module','main'],
		extensions: ['.ts', '.js'],
		extensionAlias: {
            ".js": [".ts", ".js"],
        },
		alias: {},
		fallback: {
			path: require.resolve('path-browserify'),
		},
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'ts-loader',
					},
				],
			},
		],
	},
	externals: {
		vscode: 'commonjs vscode',
	},
	performance: {
		hints: false,
	},
	devtool: 'source-map',
};

/** @type WebpackConfig */
const browserLspConfig = {
	context: path.join(__dirname, 'lsp'),
	mode: 'none',
	target: 'webworker',
	entry: {
		main: './src/main.ts',
	},
	output: {
		filename: '[name].js',
		path: path.join(__dirname, 'lsp', 'dist'),
		libraryTarget: 'var',
		library: 'lspExportVar',
	},
	resolve: {
		mainFields: ['browser','module','main'],
		extensions: ['.ts', '.js'],
		extensionAlias: {
            ".js": [".ts", ".js"],
        },
		alias: {},
		fallback: {
			assert: false,
			fs: false,
			path: false,
			url: false,
			util: false
		},
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'ts-loader',
					},
				],
			},
		],
	},
	externals: {
		vscode: 'commonjs vscode',
	},
	performance: {
		hints: false,
	},
	devtool: 'source-map',
};

module.exports = [browserExtensionConfig, browserLspConfig];
