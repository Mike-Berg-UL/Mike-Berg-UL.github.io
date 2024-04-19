var snailFirst = true;
var turtleFirst = false;
var snailWins = 0;
var turtleWins = 0;
var won = false;
var winBoxElement;
var turnBoxBlinker;
var winnerBoxBlinker;
var currentPlayer;
if(snailFirst == true) {
    currentPlayer = "──────▄▄▄──────────\n\────▄▀░▄░▀▄────────\n\────█░█▄▀░█────────\n\────█░▀▄▄▀█▄█▄▀────\n\──▄▄█▄▄▄▄███▀──────";
    function place(box) {
        if (box.innerText != "" || won) return;
        box.innerText = currentPlayer;
        checkGameBoard();
        currentPlayer == "──────▄▄▄──────────\n\────▄▀░▄░▀▄────────\n\────█░█▄▀░█────────\n\────█░▀▄▄▀█▄█▄▀────\n\──▄▄█▄▄▄▄███▀──────"
        ? currentPlayer = "─▄▀▀▀▄────▄▀█▀▀█▄────\n\▄▀─▀─▀▄▄▀█▄▀─▄▀─▄▀▄──\n\█▄▀█───█─█▄▄▀─▄▀─▄▀▄─\n\──█▄▄▀▀█▄─▀▀▀▀▀▀▀─▄█─\n\─────▄████▀▀▀▀████─▀▄"
        : currentPlayer = "──────▄▄▄──────────\n\────▄▀░▄░▀▄────────\n\────█░█▄▀░█────────\n\────█░▀▄▄▀█▄█▄▀────\n\──▄▄█▄▄▄▄███▀──────";
    }
}
if(turtleFirst == true) {
    currentPlayer = "─▄▀▀▀▄────▄▀█▀▀█▄────\n\▄▀─▀─▀▄▄▀█▄▀─▄▀─▄▀▄──\n\█▄▀█───█─█▄▄▀─▄▀─▄▀▄─\n\──█▄▄▀▀█▄─▀▀▀▀▀▀▀─▄█─\n\─────▄████▀▀▀▀████─▀▄";
    function place(box) {
        if (box.innerText != "" || won) return;
        box.innerText = currentPlayer;
        checkGameBoard();
        currentPlayer == "─▄▀▀▀▄────▄▀█▀▀█▄────\n\▄▀─▀─▀▄▄▀█▄▀─▄▀─▄▀▄──\n\█▄▀█───█─█▄▄▀─▄▀─▄▀▄─\n\──█▄▄▀▀█▄─▀▀▀▀▀▀▀─▄█─\n\─────▄████▀▀▀▀████─▀▄"
        ? currentPlayer = "──────▄▄▄──────────\n\────▄▀░▄░▀▄────────\n\────█░█▄▀░█────────\n\────█░▀▄▄▀█▄█▄▀────\n\──▄▄█▄▄▄▄███▀──────"
        : currentPlayer = "─▄▀▀▀▄────▄▀█▀▀█▄────\n\▄▀─▀─▀▄▄▀█▄▀─▄▀─▄▀▄──\n\█▄▀█───█─█▄▄▀─▄▀─▄▀▄─\n\──█▄▄▀▀█▄─▀▀▀▀▀▀▀─▄█─\n\─────▄████▀▀▀▀████─▀▄";
    }
}
function checkWinner(first, second, third) {
    if(first != "" && first == second && first == third) {
        won = true;
        var blink_speed = 1000; // every 1000 == 1 second, adjust to suit
           
        winnerBoxBlinker = setInterval(function () {
            winBoxElement = document.getElementById('ascii-winner-box');
            winBoxElement.style.visibility = (winBoxElement.style.visibility == 'hidden' ? '' : 'hidden');
        }, blink_speed);
          
        turnBoxBlinker = setInterval(function () {
            turnBoxElement = document.getElementById('ascii-turn-box');
            turnBoxElement.style.visibility = (turnBoxElement.style.visibility == 'hidden' ? '' : 'hidden');
        }, blink_speed);
            
        if(currentPlayer == "──────▄▄▄──────────\n\────▄▀░▄░▀▄────────\n\────█░█▄▀░█────────\n\────█░▀▄▄▀█▄█▄▀────\n\──▄▄█▄▄▄▄███▀──────")
        {
        snailWins++;
	document.getElementById("ascii-turn-box").innerText = "********Snail Wins!!*******";
	document.getElementById("ascii-winner-box").innerText = "********Snail Wins!!*******";
	document.getElementById("ascii-snail-wins").innerText = "Snail Wins: " + snailWins;
        }
        if(currentPlayer == "─▄▀▀▀▄────▄▀█▀▀█▄────\n\▄▀─▀─▀▄▄▀█▄▀─▄▀─▄▀▄──\n\█▄▀█───█─█▄▄▀─▄▀─▄▀▄─\n\──█▄▄▀▀█▄─▀▀▀▀▀▀▀─▄█─\n\─────▄████▀▀▀▀████─▀▄")
        {
	turtleWins++;
	document.getElementById("ascii-turn-box").innerText = "********Turtle Wins!!*******";
	document.getElementById("ascii-winner-box").innerText = "********Turtle Wins!!*******";
	document.getElementById("ascii-turtle-wins").innerText = "Turtle Wins: " + turtleWins;
        }
    }
}
function resetBoard() {
    for(var i = 0; i <= 2; i++) {
        for(var j = 0; j <= 2; j++) {
            document.getElementById(i + "_" + j).innerText = "";
        }
    }
    clearInterval(winnerBoxBlinker);
    clearInterval(turnBoxBlinker);
    won = false;
    if(snailFirst == true) {
        turtleFirst = true;
        snailFirst = false;
        document.getElementById("ascii-turn-box").style.visibility = "visible";
        document.getElementById("ascii-winner-box").style.visibility = "visible";
        document.getElementById("ascii-turn-box").innerText = "Up First: Turtle";
        document.getElementById("ascii-winner-box").innerText = "May the hardest shell win!!";
        currentPlayer = "─▄▀▀▀▄────▄▀█▀▀█▄────\n\▄▀─▀─▀▄▄▀█▄▀─▄▀─▄▀▄──\n\█▄▀█───█─█▄▄▀─▄▀─▄▀▄─\n\──█▄▄▀▀█▄─▀▀▀▀▀▀▀─▄█─\n\─────▄████▀▀▀▀████─▀▄";
    } else {
        snailFirst = true;
        document.getElementById("ascii-turn-box").style.visibility = "visible";
        document.getElementById("ascii-winner-box").style.visibility = "visible";
        document.getElementById("ascii-turn-box").innerText = "Up First: Snail";
        document.getElementById("ascii-winner-box").innerText = "May the hardest shell win!!";
        currentPlayer = "──────▄▄▄──────────\n\────▄▀░▄░▀▄────────\n\────█░█▄▀░█────────\n\────█░▀▄▄▀█▄█▄▀────\n\──▄▄█▄▄▄▄███▀──────";
    }
}
function resetScores() {
    snailWins = 0;
    turtleWins = 0;
    document.getElementById("ascii-turtle-wins").innerText = "Turtle Wins: " + turtleWins;
    document.getElementById("ascii-snail-wins").innerText = "Snail Wins: " + snailWins;
    clearInterval(winnerBoxBlinker);
    clearInterval(turnBoxBlinker);
}
function checkGameBoard() {    
    for(var i = 0; i <= 2; i++) {
    	checkWinner(document.getElementById("0_" + i).innerText,
            document.getElementById("1_" + i).innerText,
            document.getElementById("2_" + i).innerText,);//horizontal
    }
    for(var i = 0; i <= 2; i++) {
	checkWinner(document.getElementById(i + "_0").innerText,
            document.getElementById(i + "_1").innerText,
            document.getElementById(i + "_2").innerText);//vertical
    }
    checkWinner(document.getElementById("0_0").innerText,
        document.getElementById("1_1").innerText,
        document.getElementById("2_2").innerText);//diagonal right
    checkWinner(document.getElementById("2_0").innerText,
        document.getElementById("1_1").innerText,
        document.getElementById("0_2").innerText);//diagonal left
}