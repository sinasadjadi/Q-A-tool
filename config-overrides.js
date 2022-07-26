// config-overrides.js
module.exports = function override(config, env) {
	config.module.rules[1].oneOf.splice(2, 0, {
		test: /\.s[ac]ss$/i,
		use: [
			{ loader: "style-loader" },
			{ loader: "css-loader" },
			{
				loader: "sass-loader",
				// options: {
				// 	lessOptions: {
				// 		javascriptEnabled: true,
				// 	},
				// },
			},
		],
	})

	return config
}
