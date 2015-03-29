// mainjs.js


$(document).ready(function() {
	// initialize
	$("#dataset").linedtextarea();
	
	// statistical calculations
	$("#calcMean").click(function() {
		output(jStat.mean(getInput()));
	});
	
	$("#calcMedian").click(function() {
		output(jStat.median(getInput()));
	});
	
	$("#calcMode").click(function() {
		output(jStat.mode(getInput()));
	});
	
	$("#calcStdDev").click(function() {
		output(jStat.stdev(getInput()));
	});
	
	$("#calcVariance").click(function() {
		output(jStat.variance(getInput()));
	});
	
	$("#calcRange").click(function() {
		output(jStat.range(getInput()));
	});
	
	$("#calcSkewness").click(function() {
		output(jStat.skewness(getInput()));
	});
	
	$("#calcCoeffvar").click(function() {
		output(jStat.coeffvar(getInput()));
	});
	
	$("#calcKurtosis").click(function() {
		output(jStat.kurtosis(getInput()));
	});
	
	$("#quartiles").click(function() {
		output(jStat.quartiles(getInput()));
	});
	
	$("#generateBarGraph").click(function() {
		generateBarGraph();
	});
	
	$("#generateFreqTable").click(function() {
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
	
	$("#generateRandData").click(function() {
		var numData = Math.floor((Math.random() * 100) + 1);
		var data = "";
		for(var i = 0; i < numData - 1; i++)
			data += Math.floor((Math.random() * 1000) + 1) + "\n";
		data += Math.floor((Math.random() * 1000) + 1);
		
		$("#dataset").text(data);
	});
	
});	// end of document.ready

function output(out) {
	document.getElementById("answer").innerHTML = out;
}

// implement error checking here, pls add comments about "what kind of error check"
function getInput() {
	if(validDataSet()) {
		var arr = new Array();
		var strArr = document.getElementById("dataset").value.split('\n');	// replace with whitespace regex
		for(var i = 0; i < strArr.length; i++) {
			if(strArr[i] == '') errorOccured();
			arr[i] = parseInt(strArr[i]);
		}
		return arr;
	}
	errorOccured();
}

function errorOccured() {
	alert("ERROR IN DATA SET");
	// exit status
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

