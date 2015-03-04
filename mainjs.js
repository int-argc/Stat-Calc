// mainjs.js

var dataset;

$(document).ready(function() {
	// initialize
	$("#dataset").linedtextarea();
	
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
});	// end of document.ready

function output(out) {
	document.getElementById("answer").innerHTML = out;
}

// implement error checking here
function getInput() {
	var arr = new Array();
	var strArr = document.getElementById("dataset").value.split('\n');	// di ko alam ano yung whitespace na regex
	for(var i = 0; i < strArr.length; i++)
		arr[i] = parseInt(strArr[i]);
	return arr;
}

