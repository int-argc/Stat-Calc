// mainjs.js


$(document).ready(function() {
	// initialize
	$("#dataset").linedtextarea();
	
	$("#Reset").click(function() {
		document.getElementById("dataset").value = "";
	});
	
	// statistical calculations
	$("#calcMean").click(function() {
		$("#chart").empty();
		output(jStat.mean(getInput()));
	});
	
	$("#calcMedian").click(function() {
		$("#chart").empty();
		output(jStat.median(getInput()));
	});
	
	$("#calcMode").click(function() {
		$("#chart").empty();
		output(jStat.mode(getInput()));
	});
	
	$("#calcStdDev").click(function() {
		$("#chart").empty();
		output(jStat.stdev(getInput()));
	});
	
	$("#calcVariance").click(function() {
		$("#chart").empty();
		output(jStat.variance(getInput()));
	});
	
	$("#calcRange").click(function() {
		$("#chart").empty();
		output(jStat.range(getInput()));
	});
	
	$("#calcSkewness").click(function() {
		$("#chart").empty();
		output(jStat.skewness(getInput()));
	});
	
	$("#calcCoeffvar").click(function() {
		$("#chart").empty();
		output(jStat.coeffvar(getInput()));
	});
	
	$("#calcKurtosis").click(function() {
		$("#chart").empty();
		output(jStat.kurtosis(getInput()));
	});
	
	$("#quartiles").click(function() {
		$("#chart").empty();
		output(jStat.quartiles(getInput()));
	});
	
	$("#calcPercRank").click(function() {
		var x = parseInt(document.getElementById("refData").value);
		var arr = getInput();
		
		var ltX = 0;
		var eqX = 0;
		for(var i = 0; i < arr.length; i++) {
			if(arr[i] == x)
				eqX++;
			else if(arr[i] < x)
				ltX++;
		}
		
		if(eqX == 0)
			dispError(x + " does not exist in the dataset, cannot get percentile rank!");
		
		output(((ltX + 0.5 * eqX) / arr.length * 100) + " %");
	});
	
	$("#calcDecile").click(function() {
		var decout;
		for(var i = 1; i <= 10; i++)
			decout += "D " + i + " : " + getPercentile(i * 10) + "<br />";
		output(decout);
		
	});
	
	$("#calcIQR").click(function() {
		$("#chart").empty();
		output(iqr(getInput()));	// alt iqr2, compare with kurt's
	});
	
	$("#generateBarGraph").click(function() {
		$("#chart").empty();
		$("#answer").empty();
		$("#chart").append("<div class='bargraph'></div>");
		generateBarGraph();
	});
	
	$("#generateFreqTable").click(function() {
		$("#chart").empty();
		$("#answer").empty();
		var arr = getInput();
		var freq = Array.apply(null, new Array(arr.length)).map(Number.prototype.valueOf, 0);
		
		for(var i = 0; i < arr.length; i++)
			freq[arr.indexOf(arr[i])]++;
		
		$("#chart").append("<table border='1' id='freqtab'></table>");
		$("#freqtab").append("<tr><th>Data</th><th>Frequency</th></tr>");
		
		for(var i = 0; i < freq.length; i++) {
			if(freq[i] != 0)
				$("#freqtab").append("<tr><td>" + arr[i] + "</td><td>" + freq[i] + "</td></tr>");
		}
		
	});
	
	$("#generatePieChart").click(function() {
		$("#chart").empty();
		$("#answer").empty();
		$("#chart").append("<div class='bargraph'></div>");
		generatePieChart();
	});
	
	$("#generateRandData").click(function() {
		var numData = Math.floor((Math.random() * 100) + 1);
		var data = "";
		for(var i = 0; i < numData - 1; i++)
			data += Math.floor((Math.random() * 1000) + 1) + "\n";
		data += Math.floor((Math.random() * 1000) + 1);
		
		// $("#dataset").text(data);
		document.getElementById("dataset").value = data;
	});
	
	$("#generateBoxplot").click(function() {
		$("#chart").empty();
		$("#answer").empty();
		generateBoxplot();
	});
	
	$("#generateLineGraph").click(function() {
		$("#chart").empty();
		$("#answer").empty();
		generateLineGraph();
	});
	
	$("#generateScatterPlot").click(function() {
		$("#chart").empty();
		$("#answer").empty();
		generateScatterPlot();
	});
	
});	// end of document.ready

function output(out) {
	document.getElementById("answer").innerHTML = out;
}

function dispError(errMess) {
	setTimeout(function() {
		document.getElementById("err").innerHTML = ""
	}, 2000);
	
	document.getElementById("err").innerHTML = errMess;
}

// implement error checking here, pls add comments about "what kind of error check"
function getInput() {
	if(validDataSet()) {
		var arr = new Array();
		var strArr = document.getElementById("dataset").value.split('\n');	// replace with whitespace regex
		for(var i = 0; i < strArr.length; i++) {
			if(strArr[i] == '') dispError("ERROR IN DATA SET");
			arr[i] = parseInt(strArr[i]);
		}
		return arr;
	}
	dispError("ERROR IN DATA SET");
}

function validDataSet() {
	var content = document.getElementById("dataset").value;
	for(var i = 0; i < content.length; i++)
		if((content[i] > '9' || content[i] < '0') && content[i] != '\n')
			return false;
	return true;
}

function getPercentile(k) {
	var arr = getInput();
	arr.sort(function(a, b) {return a - b;});
	
	var n = arr.length;
	var index = Math.round(k / 100 * n);
	
	return arr[index - 1];
}

// initial iqr implementation
function iqr(arr) {
	var mid = Math.floor(arr.length / 2);
	var q1 = arr[Math.floor(mid / 2)];
	var q3 = arr[Math.floor(arr.length - mid + 1)];
	return q3 - q1;
}

// backup iqr implementation
// uses d3
function iqr2(arr) {
	return d3.quantile(arr, .75) - d3.quantile(arr, .25);
}

function generateBarGraph() {
	var arr = getInput();
	var x = d3.scale.linear()
    .domain([0, d3.max(arr)])
    .range([0, 420]);
	
	d3.select(".bargraph")
	.selectAll("div")
	.data(arr)
	.enter().append("div")
	.style("width", function(d){
		return x(d) + "px";
	})
	.text(function(d) {
		return d;
	});
}

function generateLineGraph(){
	var arr=getInput();
	var arr_len=arr.length;
	var values=[];
	var cattext=[];
	for (var i=0;i<arr_len;i++)      
    values[i]=arr[i];
	for (var i=0;i<arr_len;i++)      
    cattext[i]="Data #"+(i+1);
	$('#chart').highcharts({
        title: {
            text: 'Line Chart'
        },
        xAxis: {
            categories: cattext
        },
        series: [{
            data: values,
            step: 'right',
            name: 'Values of the collected data'
        },]

    });

}

function generateScatterPlot(){
	var arr=getInput();
	var arr_len=arr.length;
	var values=[];
	var cattext=[];
	var k=0;
	for (var i=0;i<arr_len;i++){
		k=i;
		if( (k+1) % 2===0)
		values[k-1]=values.push(arr[k]);
		else
		values[i]=arr[i];}
	for (var i=0;i<arr_len;i++)      
    cattext[i]="Data #"+(i+1);
    $('#chart').highcharts({
        chart: {
            type: 'scatter',
            
        },
        title: {
            text: 'Scatter Plot'
        },
        xAxis: {
            title: {
                enabled: true,
                text: 'Values of the collected Data' + values
            },
            startOnTick: true,
            endOnTick: true,
            showLastLabel: true
        },
        yAxis: {
            title: {
                text: 'Numbers'
            }
        },
        legend: {
            layout: 'vertical',
            align: 'left',
            verticalAlign: 'top',
            x: 100,
            y: 70,
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF',
            borderWidth: 1
        },
        plotOptions: {
            scatter: {
                marker: {
                    radius: 5,
                    states: {
                        hover: {
                            enabled: true,
                            lineColor: 'rgb(100,100,100)'
                        }
                    }
                },
                states: {
                    hover: {
                        marker: {
                            enabled: false
                        }
                    }
                },
                tooltip: {
                    headerFormat: '<b>{series.name}</b><br>',
                }
            }
        },
        series: [{
            name: 'Value',
            color: 'rgba(223, 83, 83, .5)',
            data: values

        }]
    });


}

function generatePieChart() {
	var w = 600;
	var h = 600;
	var r = h/2;
	var color = d3.scale.category20c();

	var dataset = getInput();
	var chartData = new Array(dataset.length);
	for(var i = 0; i < dataset.length; i++)
		chartData[i] = {"label":"" + dataset[i], "value":dataset[i]};

	var vis = d3.select('#chart').append("svg:svg").data([chartData]).attr("width", w).attr("height", h).append("svg:g").attr("transform", "translate(" + r + "," + r + ")");
	var pie = d3.layout.pie().value(function(d){return d.value;});

	var arc = d3.svg.arc().outerRadius(r);

	var arcs = vis.selectAll("g.slice").data(pie).enter().append("svg:g").attr("class", "slice");
	arcs.append("svg:path")
		.attr("fill", function(d, i){
			return color(i);
		})
		.attr("d", function (d) {
			return arc(d);
		});

	arcs.append("svg:text").attr("transform", function(d){
				d.innerRadius = 0;
				d.outerRadius = r;
		return "translate(" + arc.centroid(d) + ")";}).attr("text-anchor", "middle").text( function(d, i) {
		return chartData[i].label;}
			);
}

function generateBoxplot() {
	var margin = {top: 10, right: 10, bottom: 10, left: 10},
		width = 800 - margin.left - margin.right,
		height = 100 - margin.top - margin.bottom,
		padding = 20
		midline = (height - padding) / 2;
	 
	var xScale = d3.scale.linear().range([padding, width - padding]);  
	 
	var xAxis = d3.svg.axis()
				  .scale(xScale)
				  .orient("bottom");
	 
	var data = getInput().sort(d3.ascending),
		outliers = [],
		minVal = Infinity,
		lowerWhisker = Infinity,
		q1Val = Infinity,
		medianVal = 0,
		q3Val = -Infinity,
		iqr = 0,
		upperWhisker = -Infinity,
		maxVal = -Infinity;
	
	
	minVal = data[0],
		maxVal = data[data.length - 1],
		q1Val = d3.quantile(data, .25),
		medianVal = d3.quantile(data, .5),
		q3Val = d3.quantile(data, .75),
		iqr = q3Val - q1Val;
	 
	var index = 0;
	
	//search for the lower whisker, the mininmum value within q1Val - 1.5*iqr
	while (index < data.length && lowerWhisker == Infinity) {
		if (data[index] >= (q1Val - 1.5*iqr))
			lowerWhisker = data[index];
		else
			outliers.push(data[index]);
		index++;
	}
	index = data.length-1;
	
	//search for the upper whisker, the maximum value within q1Val + 1.5*iqr
	while (index >= 0 && upperWhisker == -Infinity) {
		if (data[index] <= (q3Val + 1.5*iqr))
			upperWhisker = data[index];
		else
			outliers.push(data[index]);
		index--;
	}
	
	xScale.domain([0,maxVal*1.10]);

	var svg = d3.select("#chart")
			  .append("svg")
			  .attr("width", width)
			  .attr("height", height);
	
	// append the axis
	svg.append("g")
	 .attr("class", "axis")
	 .attr("transform", "translate(0, " + (height - padding) + ")")
	 .call(xAxis);

	// draw upperWhisker
	svg.append("line")
	 .attr("class", "whisker")
	 .attr("x1", xScale(lowerWhisker))
	 .attr("x2", xScale(lowerWhisker))
	 .attr("stroke", "green")
	 .attr("y1", midline - 10)
	 .attr("y2", midline + 10);

	// draw upperWhisker
	svg.append("line")  
	 .attr("class", "whisker")
	 .attr("x1", xScale(upperWhisker))
	 .attr("x2", xScale(upperWhisker))
	 .attr("stroke", "green")
	 .attr("y1", midline - 10)
	 .attr("y2", midline + 10);

	//draw horizontal line from lowerWhisker to upperWhisker
	svg.append("line")
	 .attr("class", "whisker")
	 .attr("x1",  xScale(lowerWhisker))
	 .attr("x2",  xScale(upperWhisker))
	 .attr("stroke", "green")
	 .attr("y1", midline)
	 .attr("y2", midline);

	//draw rect for iqr
	svg.append("rect")    
	 .attr("class", "box")
	 .attr("stroke", "green")
	 .attr("stroke-width", "3")
	 .attr("fill", "white")
	 .attr("x", xScale(q1Val))
	 .attr("y", padding)
	 .attr("width", xScale(iqr) - padding)
	 .attr("height", 20);

	// draw median
	svg.append("line")
	 .attr("class", "median")
	 .attr("stroke", "green")
	 .attr("x1", xScale(medianVal))
	 .attr("x2", xScale(medianVal))
	 .attr("y1", midline - 10)
	 .attr("y2", midline + 10); 
}


