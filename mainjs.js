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
	
	// new functions to be added on UI
	$("#quartiles").click(function() {
		output(jStat.quartiles(getInput()));
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
