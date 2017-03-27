
var express = require('express');
var app = express();

app.get('/spiralmatrixexpjs/test1', function(req, res) {
	console.log("calling test1 - output in console");
	var spiralArray = start(5, false);
	console.log(spiralArray);
	res.send('Read the console for output');
});


app.get('/spiralmatrixexpjs/test2', function(req, res) {
	console.log("calling test2 - output rendered in html page");
	var table = start(4, true);
	res.send(
		'<!DOCTYPE html><html><head><title>test 1</title></head><body><div><h2> my test 2d </h2></div><div id="demo1">' + table + '</div></body></html>'
	);	
});

app.get('/spiralmatrixexpjs/test3/:tagId', function(req, res) {
	console.log("calling test3 - passing the input through url");
	var inp = parseFloat(req.params.tagId);
	if(inp <= 0 || isNaN(inp)) {
		console.log("Enter number only : error");
		res.send('<!DOCTYPE html><html><body><script>console.log("Enter number");alert("Error: Enter number only. Decimals, letters and characters not allowed");</script></body></html>');
	}
	else {
	var table = start(inp, true);
	res.send(
		'<!DOCTYPE html><html><head><title>test 1</title></head><body><div><h2> my test 2d </h2></div><div id="demo1">' + table + '</div></body></html>'
	);
	}
});

app.get('/spiralmatrixexpjs/test4', function(req, res) {
	console.log("calling test4 - input and submit");
	res.sendfile("test4spiralinput.html");	
});

app.get('/spiralmatrixexpjs/test4/getData', function(req, res) {
	var inp = req.query.inp;
	console.log("calling test4 separate page");

	if ( inp <= 0) {
		res.status(400).send("please enter a positive integer");
	} else {
		var table = start(inp, true);
		res.status(200).send(table);	
	}
	
});

app.get('/spiralmatrixexpjs/angular', function(req,res) {
	console.log("calling angular js - input and submit");
	res.sendfile("spiralinputangular.html");
});

app.get('/spiralmatrixexpjs/angular/getData', function(req,res) {
	var inp = req.query.inp;
	console.log("calling angular separate page");

	if(inp <= 0) {
		console.log("enter positive number");
		res.status(400).send("please enter positive number");
	} else {
		var spiralarr = start(inp, false);
		console.log(spiralarr );
		res.status(200).send(spiralarr);
	}
});

app.listen(8081);

function start(inp, isHTML)
{
	if(isNaN(inp)) {
		console.log("Enter number only");
	} else {
		var spiralArray=[];
		for(i=0;i<inp;i++)
		{
			spiralArray[i]=[];
			for(j=0;j<inp;j++)
				spiralArray[i][j]=0;
		}

		//maxCount=inp*inp;
		sprialArray = spiral(inp, spiralArray);
		if (isHTML) {
			return printTable(spiralArray, inp);
		} else {
			return spiralArray;
		}
	}
}

function spiral(inp, spiralArray) 
{

	var count = 0;
	var direction = "right";
	for (var i=0,j=0 ; ; ) 
	{

		if ( i >= 0 && i < inp && j >=0 && j < inp && spiralArray[i][j] == 0) 
		{
			count++;
			spiralArray[i][j] = count;
			switch(direction) 
			{
				case "right":
					j++;
					break;
				case "down":
					i++;
					break;
				case "left":
					j--;
					break;
				case "up":
					i--;
					break;		
			}
		} 
		else 
		{
			switch(direction) 
			{
				case "right":
					j--;
					i++;
					direction = "down";
					break;
				case "down":	
					i--;
					j--;
					direction = "left";
					break;
				case "left":
					j++;
					i--;
					direction = "up";
					break;
				case "up":
					i++;
					j++;
					direction = "right";
					break;		
			}
		}

		if (count == (inp * inp)) {
			return spiralArray;
		}

	}
}

function printTable(spiralArray, inp)
{
	console.log(spiralArray);

	var myTable= "<table><tr><td style='width: 100px; color: red; text-align: right;'></td></tr>";
  	for(var a=0; a<inp; a++)
	{
		myTable+="<tr>";
		for(var b=0; b<inp; b++)
		{
	    	myTable+="<td style='width: 100px; text-align: right;'>" + spiralArray[a][b] + "</td>";
		}
		myTable+="</tr>";
  	}  
    myTable += "</table>";
	return myTable;	
}









