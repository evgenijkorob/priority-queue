module.exports = {
	entry: { app: './index.js' },
	output: {
		path: __dirname,
		filename: 'app.bundle.js'
	},
	devtool: 'source-map'
};
