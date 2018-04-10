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

require(["d3"], function (d3) {
	var svgConfig = {
		width: 400,
		height: 300
	},
	dataset = [ 250 , 210 , 170 , 130 , 90 ],
	rectHeight = 25;

	d3.select("body")
		.append("svg")
		.attr("width",svgConfig.width)
		.attr("height",svgConfig.height)
		.selectAll("rect")
		.data(dataset)
		.enter()
		.append("rect")
		.attr("x",20)
		.attr("y", function (d, i) {
			return i*(rectHeight+10);
		})
		.attr("width", function (d, i) {
			return d;
		})
		.attr("height", rectHeight)
		.attr("fill","skyblue");











	// const svgWidth = 400,
	//       svgHeight = 400,
	//       svgSpacing = {left: 30, right: 30, top: 20, bottom: 20}
 //    ;
 //    let dataset = [10, 20, 30, 40, 33, 24, 12, 5];
 //    let svg = d3.select("body")
 //      .append("svg")
 //      .attr("width",svgWidth)
 //      .attr("height",svgHeight);
 //    // 添加 - X轴
 //    var xScale = d3.scaleBand()
 //      .domain(d3.range(dataset.length))
 //      .range([0,svgWidth-svgSpacing.left-svgSpacing.right])
 //      .padding(.3)
 //      .paddingOuter(.7);
 //    let xAxis = d3.axisBottom()
 //      .scale(xScale);
 //    svg.append("g")
 //      .attr("transform","translate("+svgSpacing.left+","+(svgHeight-svgSpacing.bottom)+")")
 //      .call(xAxis);
 //    // 添加 - Y轴
 //    var yScale = d3.scaleLinear()
 //      .domain([0,d3.max(dataset)])
 //      .range([svgHeight-svgSpacing.top-svgSpacing.bottom, 0]);
 //    let yAxis = d3.axisLeft()
 //      .scale(yScale)
 //      .ticks(10);
 //    svg.append("g")
 //      .attr("transform","translate("+svgSpacing.left+","+svgSpacing.top+")")
 //      .call(yAxis);
 //    // 添加 - 矩形图
 //    svg.selectAll(".MyRect")
 //      .data(dataset)
 //      .enter()
 //      .append("rect")
 //      .attr("class","MyRect")
 //      .attr("transform","translate("+svgSpacing.left+","+svgSpacing.top+")")
 //      .attr("x", function (d,i) {
 //        return i*xScale.step()+xScale.paddingOuter()*xScale.step();
 //      })
 //      .attr("y", function (d,i) {
 //        return 0;
 //      })
 //      .attr("width", function (d,i) {
 //        return xScale.bandwidth();
 //      })
 //      .attr("height", function (d,i) {
 //        return svgHeight-yScale(d)-svgSpacing.top-svgSpacing.bottom;
 //      })
 //    // 添加 - 说明文字
 //    svg.selectAll("MyText")
 //      .data(dataset)
 //      .enter()
 //      .append("text")
 //      .attr("class","MyText")
 //      .attr("transform", "translate("+svgSpacing.left+","+svgSpacing.top+")")
 //      .attr("x", function (d,i) {
 //        return i*xScale.step()+xScale.paddingOuter()*xScale.step();
 //      })
 //      .attr("y", function (d,i) {
 //        return 0;
 //      })
 //      .attr("dx", function (d,i) {
 //        return xScale.bandwidth()/2;
 //      })
 //      .attr("dy", function (d,i) {
 //        return 0;
 //      })
 //      .text(function (d,i) {
 //        return d;
 //      })
})