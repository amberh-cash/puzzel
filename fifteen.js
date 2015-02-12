/*
Mengyuan Huang
CSE154 AJ
this is the JavaScript code for the puzzle website.
*/

"use strict";

var row = "300px"; // default blank tile is in position (300px, 300px)
var col = "300px"; 

window.onload = function(){
	createSqr();
	displayIt();
	document.getElementById("shufflebutton").onclick = shuffle; 
};

function createSqr(){ // create the 15 tiles
	for(var i = 0; i < 15; i++){
		var square = document.createElement("div");
		square.className = "square";
		document.getElementById("puzzlearea").appendChild(square);
	}
}

function displayIt(){ //display tiles in order.
	var squares = document.querySelectorAll("#puzzlearea .square");
	var area = document.getElementById("puzzlearea");
	for(var i = 0; i < squares.length; i++){
		squares[i].style.left = 100 * parseInt(i % 4) + "px"; 
		squares[i].style.top = parseInt(i / 4) * 100 + "px"; 
		var text = document.createTextNode(i + 1);
		squares[i].appendChild(text);
		squares[i].id = "square" + parseInt(i / 4 + 1) + parseInt(i % 4 + 1) ;
		squares[i].style.backgroundImage = "url('background.jpg')";
		squares[i].style.backgroundPosition = -100 * parseInt(i % 4) + "px " + -100 * parseInt(i / 4) + "px";
		squares[i].onclick = clickIt;
		squares[i].onmousemove = highlight;
		squares[i].onmouseout = reset;
	}
}
function clickIt() { //swap the position of the blank tile and the tile next to it.
	var getCol = this.style.left;
	var getRow = this.style.top;
	if (movable(parseInt(getCol), parseInt(getRow))){
		this.style.left = col;
		this.style.top = row;
		this.id = "string" + parseInt(parseInt(row)/100 + 1) + "" + parseInt(parseInt(col)/100 + 1);
		row = getRow;
		col = getCol;
	}	
}


function movable(y, x){ // check if the tile that has been clicked is next to the blank tile.
	return (y + 100 == parseInt(col) && x == parseInt(row)) || (y - 100 == parseInt(col) && x == parseInt(row)) ||
		 (x + 100 == parseInt(row) && y == parseInt(col)) || (x - 100 == parseInt(row) && y == parseInt(col));

}

function highlight(){ //highlight the movable tile.
	var getCol = this.style.left;
	var getRow = this.style.top;
	if (movable(parseInt(getCol), parseInt(getRow))){
		this.className = "hover";
	} 
}

function reset(){
	this.className = "square";
}

function shuffle(){ // shuffle the puzzle.
	for(var i = 0; i < 1000; i++){
		var neighbors = [];

		var squares = document.querySelectorAll("#puzzlearea .square");
		var xBlank = parseInt(row)/100 + 1;
		var yBlank = parseInt(col)/100 + 1;

		var n1 = document.getElementById("square" + parseInt(xBlank - 1) + yBlank);
		var n2 = document.getElementById("square" + parseInt(xBlank + 1) + yBlank);
		var n3 = document.getElementById("square" + xBlank + parseInt(yBlank - 1));
		var n4 = document.getElementById("square" + xBlank + parseInt(yBlank+1));
		push(neighbors, n1);
		push(neighbors, n2);
		push(neighbors, n3);
		push(neighbors, n4);		
		var n = neighbors[parseInt(Math.random() * neighbors.length)];
			
		var getY = n.style.left;
		var getX = n.style.top;

		n.style.left = col;
		n.style.top = row;

		n.id = "square" + (parseInt(row)/100 + 1) + "" + (parseInt(col)/100 + 1);

		row = getX;
		col = getY;
	}
}

	function push(neighbors, n){ // put neighbor tile that is movable to the neighbor array.
		if(n){
			neighbors.push(n);
		}
	}
	















