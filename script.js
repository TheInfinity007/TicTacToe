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
var resultText = document.querySelector("#result");
var message = document.querySelector("#message");
startGame();
function startGame(){
	nineClick = 0;
	resultText.innerText = "";
	resultText.classList.remove("resultO");
	resultText.classList.remove("resultX");
	message.innerText = "Start Game";
	origBoard = Array.from(Array(9).keys());
	for(var i = 0; i < cells.length; i++){
		cells[i].innerText = '';
		cells[i].classList.remove("playerO");
		cells[i].classList.remove("playerX");
		cells[i].classList.remove("resultO");
		cells[i].classList.remove("resultX");
		cells[i].addEventListener("click", turnClick);
	}	
}

function turnClick(event){
	switchTurn();
	resultText.innerText = "";
	turn(event.target.id, player);
}

function turn(squareId, player){
	var box = document.getElementById(squareId);
	if(box.innerText == ""){
		origBoard[squareId] = player;
		if(player == "O"){
			box.innerText = player;		
			box.classList.add("playerO");
		}else{
			box.innerText = player;		
			box.classList.add("playerX");
		}		
	}else{
		switchTurn();
		resultText.innerHTML = "<span style='color: #ff1414;font-size:1em;'>This box already taken!</span>";
		nineClick--;
	}
	nineClick++;

	let result = checkWinner(origBoard, player);
	if(result){
		return gameOver(result);
	}else if(nineClick == 9){
		return gameOver(result);
	}
	message.innerText = (player == "O"? "X Turn": "O Turn");
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
		let color = result.player=="O"? "#aaece9": "#ffc136";
		// for(let index of winCombos[result.index]){
		// 	document.getElementById(index).style.background = color;
		// }
		if(result.player == "O"){
			for(let index of winCombos[result.index]){
				document.getElementById(index).classList.add("resultO");
			}
			resultText.classList.add("resultO");
			resultText.classList.remove("resultX");
		}else{
			for(let index of winCombos[result.index]){
				document.getElementById(index).classList.add("resultX");
			}
			resultText.classList.add("resultX");
			resultText.classList.remove("resultO");
		}
		resultText.innerText = "Player " + result.player + " won";
	}else{
		resultText.innerText = "Game Draw";
	}
	// resultText.classList.add("result");
	for(var i = 0; i < cells.length; i++){
		cells[i].removeEventListener("click", turnClick);
	}
	message.innerText = "Game Over";
}

document.getElementById("reset").addEventListener("click", function(){
	startGame();
});




// let color = result.player=="O"? "rgb(172, 0, 0)": "rgba(4, 4, 172, 0.8)";