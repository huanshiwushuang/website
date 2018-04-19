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
		})
		.attr('fill','steelblue')
		.on('mouseover', function (d,i) {
			d3.select(this)
				.attr('fill','yellow');
		})
		.on('mouseout', function (d,i) {
			d3.select(this)
				.transition()
				.duration(500)
				.attr('fill','steelblue');
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
		.ease(d3.easeBounce)
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

	svg2.on('click', function () {
		durationRect.transition()
		.duration(2000)
		.ease(d3.easeBounce)
		.attr('x',280)
		.attr('y',180)
		.attr('fill','#0f0')
		.attr('width',50)
		.attr('height',50)
		.delay(function (d,i) {
			return 500;
		});
	})
	// 研究 update、enter和exit
	var svg3 = 
		d3.select('body')
		.append('svg')
		.attr('width',svgConfig.width)
		.attr('height',svgConfig.height)
		.style('background','#ccc');
	var arr3 = [1,2,3];

	svg3.selectAll('text')
		.data(arr3)
		.enter()
		.append('text')
		.attr('class','myText3')
		.attr('x', function (d,i) {
			return i*40;
		})
		.attr('y', function (d,i) {
			return i*20;
		})
		.text(123);
	// --------------------------------------------------
	var arr33 = ['a','b','c','d','e','f'];
	var myText3 = svg3.selectAll('.myText3');
	var update = myText3.data(arr33);
	update.text(function (d,i) {
		return i+' update '+d;
	})
	var enter = update.enter();
	enter.append('text')
		.attr('class','myText3')
		.attr('x', function (d,i) {
			return i*40;
		})
		.attr('y', function (d,i) {
			return i*20;
		})
		.text(function (d,i) {
			return i+' enter '+d;
		})
	// -------------------------------------------------
	var update2 = 
		svg3.selectAll('.myText3')
		.data(arr3);
	update2.text(function (d,i) {
		return i+' 我是 update 和 exit的 update---> '+d;
	})
	var exit = update2.exit();
	exit.text(function (d,i) {
		return i+' 我是 update 和 exit的 exit---> 删除';
	});
	// *****************************************************
	// 饼图
	var svg4 = 
		d3.select('body')
		.append('svg')
		.attr('id','svg4')
		.attr('width',svgConfig.width)
		.attr('height',svgConfig.height)
		.style('background','#999');
	// 1、布局（原始数据转换->为作图数据）
	var arr4 = [30,10,43,55,13];
	var pie = d3.pie();
	var pieData = pie(arr4);
	// 2、生成器
	var arcConfig = {
		innerRadius: 0,
		outerRadius: 150
	}
	var arcConstructor = 
		d3.arc()
		.innerRadius(arcConfig.innerRadius)
		.outerRadius(arcConfig.outerRadius);
	// 3、使用生成器，根据作图数据转换为 path 数据绘制
	var color = ['#f00','#0f0','#00f','#ccc','#666','#000']
	var arcs = 
		svg4.selectAll('g')
		.data(pieData)
		.enter()
		.append('g')
		.attr('transform','translate('+svgConfig.width/2+','+svgConfig.height/2+')');
	arcs.append('path')
		.attr('fill', function (d,i) {
			return d3.schemeCategory10[i];
		})
		.attr('d', function (d,i) {
			return arcConstructor(d);
		})
	arcs.append('text')
		.attr('text-anchor','middle')
		.attr('transform', function (d) {
			return 'translate('+arcConstructor.centroid(d)+')';
		})
		.text(function (d) {
			return d.data;
		})
	// 力导向图
	var svg5 = 
		d3.select('body')
		.append('svg')
		.attr('width',svgConfig.width)
		.attr('height',svgConfig.height)
		.style('background','#ccc');
	var nodes = [ { name: "桂林" }, { name: "广州" },
              { name: "厦门" }, { name: "杭州" },
              { name: "上海" }, { name: "青岛" },
              { name: "天津" } ];
    var links = [ { source : 0 , target: 1 } , { source : 0 , target: 2 } ,
               { source : 0 , target: 3 } , { source : 1 , target: 4 } ,
               { source : 1 , target: 5 } , { source : 1 , target: 6 } ];
    var simulation = 
    	d3.forceSimulation(nodes)
    	.force('link',d3.forceLink(links))
    	.force('charge',d3.forceManyBody())
    	.force('center',d3.forceCenter());

    debugger


})