// mainjs.js


function getMedian() {
	var x = median();
	document.getElementById("answer").innerHTML = "Median: " + x;
}


function median() {
	var arr = getInput();
	arr.sort(function(a, b){return a - b});
	var mid = Math.floor(arr.length / 2);
	if(arr.length % 2 == 0) {
		return (parseInt(arr[mid - 1]) + parseInt(arr[mid])) / 2;
	}
	else
		return arr[mid];
}

function getInput() {
	return document.getElementById("numbers").value.split(" ");
}



