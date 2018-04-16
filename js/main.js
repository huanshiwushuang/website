require.config({
	baseUrl: "/js/plugins",
	paths: {
		"jquery": "http://apps.bdimg.com/libs/jquery/2.1.4/jquery.min",
		"d3": "https://d3js.org/d3.v5.min",
		"underscore": "https://cdn.bootcss.com/underscore.js/1.8.3/underscore-min"
	},
	shim: {
		"underscore": {
			exports: "_"
		}
	}

})

require(["jquery","d3"], function ($,d3) {
	window.d3 = d3;
	var svgConfig = {
		width: 500,
		height: 400,
		marginLeft: 30,
		marginRight: 1,
		marginTop: 10,
		marginBottom: 30
	}
	var dataConfig = {
		data: [87,24,17,66,45,93]
	}

	var svg = 
		d3.select('body')
		.append('svg')
		.attr('width', svgConfig.width)
		.attr('height', svgConfig.height);
	// 添加 x 轴
	var xScale = 
		d3.scaleBand()
		.domain(d3.range(dataConfig.data.length))
		.range([0, svgConfig.width - svgConfig.marginLeft - svgConfig.marginRight])
		.paddingInner(.3)
		.paddingOuter(.4);
	var xAxis = 
		d3.axisBottom()
		.scale(xScale);
	svg.append('g')
		.attr('transform','translate('+svgConfig.marginLeft+','+(svgConfig.height-svgConfig.marginBottom)+')')
		.call(xAxis);
	//  添加 y 轴
	var yScale = 
		d3.scaleLinear()
		.domain([100, 0])
		.range([0, svgConfig.height - svgConfig.marginTop - svgConfig.marginBottom]);
	var yAxis = 
		d3.axisLeft()
		.scale(yScale);
	svg.append('g')
		.attr('transform', 'translate('+svgConfig.marginLeft+','+svgConfig.marginTop+')')
		.call(yAxis);
	// 添加 矩形数据
	svg.selectAll('.myRect')
		.data(dataConfig.data)
		.enter()
		.append('rect')
		.attr('class','myRect')
		.attr('transform','translate('+svgConfig.marginLeft+','+svgConfig.marginTop+')')
		.attr('x', function (d,i) {
			return i*xScale.step()+xScale.paddingOuter()*xScale.step();
		})
		.attr('y', function (d,i) {
			return yScale(d);
		})
		.attr('width', function (d,i) {
			return xScale.bandwidth();
		})
		.attr('height', function (d,i) {
			return svgConfig.height - svgConfig.marginTop - svgConfig.marginBottom - yScale(d);
		});
	// 添加 文字数据
	svg.selectAll('.myText')
		.data(dataConfig.data)
		.enter()
		.append('text')
		.attr('class','myText')
		.attr('transform','translate('+svgConfig.marginLeft+','+svgConfig.marginTop+')')
		.attr('x', function (d,i) {
			return xScale.paddingOuter()*xScale.step()+i*xScale.step();
		})
		.attr('y', function (d,i) {
			return yScale(yScale.domain()[0]);
		})
		.attr('dx', function (d,i) {
			return xScale.bandwidth()/2;
		})
		.attr('dy', function (d,i) {
			return 5;
		})
		.text(function (d,i) {
			return d;
		})
		.transition()
		.duration(function (d,i) {
			return 2000;
		})
		.attr('y', function (d,i) {
			return yScale(d);
		})

	// 过渡效果
	var svg2 = 
		d3.select('body')
		.append('svg')
		.attr('width',svgConfig.width)
		.attr('height',svgConfig.height)
		.style('background','#ccc');
	var durationRect = 
		svg2.append('rect')
		.attr('x',30)
		.attr('y',30)
		.attr('width',20)
		.attr('height',20)
		.attr('fill','#f00');
	svg2.append('text')
		.attr('x', 100)
		.attr('y', 100)
		.text('点击svg，执行 transition 过渡效果 延时 2秒');
	$(svg2._groups[0][0]).click(function () {
		durationRect.transition()
		.duration(2000)
		.attr('x',280)
		.attr('y',180)
		.attr('fill','#0f0')
		.attr('width',50)
		.attr('height',50)
		.delay(function (d,i) {
			return 2000;
		});
	})



})