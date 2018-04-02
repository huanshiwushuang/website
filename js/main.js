require.config({
	baseUrl: "/js/plugins",
	paths: {
		"jquery": "http://apps.bdimg.com/libs/jquery/2.1.4/jquery.min",
		"d3": "https://d3js.org/d3.v5.min.js",
		"underscore": "https://cdn.bootcss.com/underscore.js/1.8.3/underscore-min"
	},
	shim: {
		"underscore": {
			exports: "_"
		}
	}

})

require(["jquery","underscore"], function ($) {
	console.log($);
})