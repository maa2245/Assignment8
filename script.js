/**
 * @author
 */

//This is my key
var myKey = "&key=AIzaSyDgXCjc_6-rhgi4hlZ8B38upvpVu8nXd-4";

//This is the URL to my data, which I have uploaded to google fusion table.
var myTableURL = "https://www.googleapis.com/fusiontables/v1/query?sql=SELECT+*+FROM+1PoY0Neevzt4EX3lNK3--RI3GKvz6LcY8JG-kj18S+WHERE+DATE>";

//UEMPDATA is the local name of the json file I just loaded

function ColumbiaLoaded(UNEMPDATA) {

	console.log(UNEMPDATA);

	var gDataTable = new google.visualization.DataTable();

	// when I add columns, the first parameter is the data type in that column
	//the second parameter is the name of the column

	gDataTable.addColumn('string', UNEMPDATA.columns[0]);
	gDataTable.addColumn('number', UNEMPDATA.columns[1]);
	
	//Here I am going to add annotations and make sure that they can be written in html. 
	gDataTable.addColumn({type:'string', role:'tooltip','p':{'html':true}});


	gDataTable.addRows(UNEMPDATA.rows);

	var ChartOptions = {
		title : "Unemployment since 1980",
		tooltip: { isHtml: true }
		
	};

	// Now I am going to create a linechart. 
	var gChart = new google.visualization.LineChart(document.getElementById("myMathiasDiv"));

	// What do I pass to .draw?
	gChart.draw(gDataTable, ChartOptions);
}

function UnempData (e) {
	//e is my click event; I will use its target property to get the id of the div.
	
	var myID = e.target.id; // such as for example the year 1980.
	console.log(myID);
	var myMathiasArray = myID.split("_"); //splits it into an array, "1980"
	var myYear = myMathiasArray[1]; // grab the year
	
	//Here is my get request. I will split it up into segments so that I don't have to write several functions with different URLs.
	$.get(myTableURL+"'"+myYear+"-01-01'"+myKey, ColumbiaLoaded, "json");	
	
	History.pushState({year:myYear}, "Unemployment from - "+myYear, "?year="+myYear);
	
	
}


function MathiasLoaded() {
	
	var myURL = History.getState().cleanUrl;
	var queryArray = myURL.split("?"); //This will split the URL on the question mark.
	
	var defaultYear = "1980"; //I picked 1980 since it is the earliest button I have. 
	
	if(queryArray.length >1){
		// Get the query string, break it on equal and then take the right half, which contains the year.
		defaultYear = queryArray[1].split("=")[1];
		
	}

	// I am creating a click event 
	$(".btn-success").on("click", UnempData); 

	
	//grab the button with the id that is year_"defaultYear" (1980) 
	$("#year_"+defaultYear).click();
	//$.get(myTableURL+"'1980-01-01'"+myKey, ColumbiaLoaded, "json");

}

function UnempLoaded() {

	console.log("got to page loaded");

	//load the google viz library
	google.load("visualization", "1", {
		packages : ["corechart"],
		callback : "MathiasLoaded"
	});

}
	

//This is my document ready function.
$(document).ready(UnempLoaded); 