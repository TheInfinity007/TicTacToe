var winCombos = 	[ 	[0,1,2],
									[3,4,5],
									[6,7,8],
									[0,3,6],
									[1,4,7],
									[2,5,8],
									[0,4,8],
									[2,4,6]
								];
var turnCounter = 0;
var origBoard = [];
var nineClick = 0;
var player;

var cells = document.querySelectorAll(".cell");
var resultText = document.querySelector("#result h2");
var gameStatus = document.querySelector("#gameStatus");
startGame();
function startGame(){
	nineClick = 0;
	resultText.innerText = "";
	gameStatus.innerText = "Start Game";
	origBoard = Array.from(Array(9).keys());
	for(var i = 0; i < cells.length; i++){
		cells[i].innerText = '';
		cells[i].style.background = "pink";
		cells[i].addEventListener("click", turnClick);
	}	
}

function turnClick(event){
	switchTurn();
	resultText.innerText = "";
	console.log(player);
	turn(event.target.id, player);
}

function turn(squareId, player){
	var box = document.getElementById(squareId);
	if(box.innerText === ""){
		origBoard[squareId] = player;
		document.getElementById(squareId).innerText = player;	
	}else{
		switchTurn();
		resultText.innerText = "This box already taken!";
		// alert("This box already taken!");
		nineClick--;
	}
	console.log(origBoard);
	nineClick++;
	console.log("nineClick " + nineClick);

	let result = checkWinner(origBoard, player);
	if(result){
		return gameOver(result);
	}else if(nineClick == 9){
		return gameOver(result);
	}
	gameStatus.innerText = player == "O"? "X Turn": "O Turn";
}

function switchTurn(){
	turnCounter = turnCounter ^ 1;
	if(turnCounter === 0){
		player = "X";
	}else{
		player = "O";
	}
}


function checkWinner(board, player){
	let plays = board.reduce((a, e, i)=>(e === player)? a.concat(i): a, []);
	//plays is the array of the indexes of the player0
	console.log("Plays = " + plays);
	let result = null;
	for(let[index, combo] of winCombos.entries()){
		if(combo.every(elem => plays.indexOf(elem) > -1)){
			result = {index: index, player: player};
			break;
		}	
	}
	return result;
}

function gameOver(result){
	if(result){
		for(let index of winCombos[result.index]){
			document.getElementById(index).style.background = result.player=="O"? "red": "blue";
		}
		console.log("Player " + result.player + " won");
		resultText.innerText = "Player " + result.player + " won";
	}else{
		resultText.innerText = "Game Draw";
		console.log("Game Draw");
	}
	for(var i = 0; i < cells.length; i++){
		cells[i].removeEventListener("click", turnClick);
	}
	gameStatus.innerText = "Game Over";
}

document.getElementById("reset").addEventListener("click", function(){
	startGame();
});
