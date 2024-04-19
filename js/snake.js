var game = {
    ticknumber: 0,
    score: 0,
    gameOn: false,
    board: [
        "####################",
        "#                  #",
        "#                  #",
	"#                  #",
	"#                  #",
        "#                  #",
	"#                  #",
	"#                  #",
        "####################",
        "=-=-=-=-=-=-=-=-=-=-"
	],
    fruit: [
        {x: 12, y: 2}
    ],
    tick: function() {
        window.clearTimeout(game.timer);
        game.ticknumber++;
        if(game.ticknumber % 2 == 0) {
            game.addRandomFruit();
        }
        var result = snake.move();
	if(result == "gameover") {
            document.getElementById("snake-game-over").innerText = "!!Game Over!!";
            window.clearTimeout(game.timer);
            game.gameOn = false;
            return;	
	}
	graphics.drawGame();
	game.timer = window.setTimeout("game.tick()", 500);
    },
    addRandomFruit: function() {
	var randomY = Math.floor(Math.random() * game.board.length) + 0;
	var randomX = Math.floor(Math.random() * game.board[randomY].length) + 0;
	var randomLocation = {x: randomX, y: randomY};
	if(game.isEmpty(randomLocation) && !game.isFruit(randomLocation)) {
            game.fruit.push(randomLocation);
	}
    },
    isEmpty: function(location) {
	return game.board[location.y][location.x] == ' ';
    },
    isWall: function(location) {
	return game.board[location.y][location.x] == '#';
    },
    isFruit: function(location) {
	for(var fruitNumber = 0; fruitNumber < game.fruit.length; fruitNumber++) {
            var fruit = game.fruit[fruitNumber];
            if(location.x == fruit.x && location.y == fruit.y) {
		game.fruit.splice(fruitNumber, 1);
		return true;
            }
	}
	return false;
    },
    isSnake: function(location) {
	for(var snakePart = 0; snakePart < snake.parts.length; snakePart++) {
            var part = snake.parts[snakePart];
            if(location.x == part.x && location.y == part.y) {
            return true;
            }
	}
	return false;
    }
};
var snake = {
    parts: [
        {x: 4, y: 2},
        {x: 3, y: 2},
        {x: 2, y: 2}
    ],
    facing: "E",
	nextLocation: function() {
            var snakeHead = snake.parts[0];
            var targetX = snakeHead.x;
            var targetY = snakeHead.y;
            targetY = snake.facing == "N" ? targetY-1 : targetY;
            targetY = snake.facing == "S" ? targetY+1 : targetY;
            targetX = snake.facing == "W" ? targetX-1 : targetX;
            targetX = snake.facing == "E" ? targetX+1 : targetX;
            return {x: targetX, y: targetY};
	},
	move: function() {
            var location = snake.nextLocation();
            if(game.isWall(location) || game.isSnake(location)) {
		return "gameover";
            }
            if(game.isEmpty(location)) {
		snake.parts.unshift(location);
                snake.parts.pop();
            }		
            if(game.isFruit(location)) {	
		snake.parts.unshift(location);
                game.score++;
		document.getElementById("snake-score").innerText = "Score: " + game.score;
            }	
	}
};	
var graphics = {
    canvas: document.getElementById("snake-canvas"),
    squareSize: 15,
    drawBoard: function(ctx) {
        var currentYoffset = 0;
        game.board.forEach(function checkLine(line) {
            line = line.split('');
            var currentXoffset = 0;
            line.forEach(function checkCharacter(character) {
                if(character == '#') {
                    var randomColor = Math.floor(Math.random()*16777215).toString(16);
                    var rc = "#" + randomColor;
                    ctx.fillStyle = rc;
                    ctx.fillRect(currentXoffset, currentYoffset, graphics.squareSize, graphics.squareSize);
                }
                if(character == '=') {
                    ctx.font = 'bold 10px';
                    ctx.fillText("=^_^=",currentXoffset, currentYoffset + 10, 50);
                    var randomColor = Math.floor(Math.random()*16777215).toString(16);
                    var rc = "#" + randomColor;
                    ctx.fillStyle = rc;
                }
                currentXoffset += graphics.squareSize;
            });
            currentYoffset += graphics.squareSize;
        });
    },
    draw: function(ctx, source, color) {
	source.forEach(function(part) {
            var partXlocation = part.x * graphics.squareSize;
            var partYlocation = part.y * graphics.squareSize;
            ctx.fillStyle = color;
            ctx.fillRect(partXlocation, partYlocation, graphics.squareSize, graphics.squareSize);
	});
    },
    drawGame: function () {
        var ctx = graphics.canvas.getContext("2d");
	ctx.clearRect(0, 0, graphics.canvas.width, graphics.canvas.height);
        graphics.drawBoard(ctx);
	graphics.draw(ctx, game.fruit, "red");
        graphics.draw(ctx, snake.parts, "green");
    }
};
var gameControl = { //change input type to button
    processInput: function() {
        const northBtn = document.querySelector("#snake-north-button");
        const southBtn = document.querySelector("#snake-south-button");
        const eastBtn = document.querySelector("#snake-east-button");
        const westBtn = document.querySelector("#snake-west-button");
        northBtn.addEventListener("click", northClick);
        southBtn.addEventListener("click", southClick);
        eastBtn.addEventListener("click", eastClick);
        westBtn.addEventListener("click", westClick);
        
	var targetDirection = snake.facing;      
        
        function northClick() {
            if(snake.facing != "S") targetDirection = "N";
            snake.facing = targetDirection;
        }
        function southClick() {
            if(snake.facing != "N") targetDirection = "S";
            snake.facing = targetDirection;
        }
        function eastClick() {
            if(snake.facing != "W") targetDirection = "E";
            snake.facing = targetDirection;
        }
        function westClick() {
            if(snake.facing != "E") targetDirection = "W";
            snake.facing = targetDirection;
        }
    },
    startGame: function() {
        window.addEventListener("click", gameControl.processInput, false);
	game.tick();
    }
};
function play(){
    if(game.gameOn == true) {return;};
    game.gameOn = true;
    for(var i = 0; i <= 27; i++) {
    	for(var j = 0; j <= 11; j++) {
            game.fruit.splice([{x: i, y: j}]);
	}
    }
    window.clearTimeout(game.timer);
    game.ticknumber = 0;
    snake.parts = [{x: 4, y: 2}, {x: 3, y: 2}, {x: 4, y: 2}];
    snake.facing = "E";
    snake.parts.splice(3, 100);
    document.getElementById("snake-game-over").innerText = "=^_^= =^_^=";
    game.score = 0;
    document.getElementById("snake-score").innerText = "Score: " + game.score;
    gameControl.startGame();
}