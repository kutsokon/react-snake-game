import _ from 'lodash';

const boardSize = 20;
const boardHeight = Array(boardSize);
const boardWidth = Array(boardSize);
const gameSpeed = 500;
const DIRECTIONS = {
	LEFT: 37,
	UP: 38,
	RIGHT: 39,
	DOWN: 40
};
const initialSnakeHead = {
	x: 10,
	y: 10
};
let score = 0;
let board = [];
let currentDirection = 'LEFT';
let initialSnakeWidth = 5;
let snakeParts = [];
let isGameOver = true;

let getGameSpeed = () => {
	return gameSpeed;
}

let getScore = () => {
	return score;
}

let initGame = () => {
	board = [];

	_.forEach(boardHeight, (row, yIndex) => {
		_.forEach(boardWidth, (column, xIndex) => {
			board.push({
				x: xIndex + 1,
				y: yIndex + 1,
				snake: false,
				head: false,
				food: false
			})
		});
	});

	window.addEventListener('keyup', (e) => {
		if(DIRECTIONS.LEFT === e.keyCode) {
			currentDirection = 'LEFT';
		} else if(DIRECTIONS.RIGHT === e.keyCode) {
			currentDirection = 'RIGHT'
		} else if(DIRECTIONS.DOWN === e.keyCode) {
			currentDirection = 'DOWN';
		} else if(DIRECTIONS.UP === e.keyCode) {
			currentDirection = 'UP';
		}
	})
}

let getBoard = () => {
	return board;
}

let startGame = () => {
	score = 0;
	isGameOver = false;
	initSnake();
	resetFood();
}

let initSnake = () => {
	initSnakeHead();
	initSnakeBody(initialSnakeWidth);
}

let initSnakeHead = () => {
	let snakeHead = _.find(board, {
		x: initialSnakeHead.x,
		y: initialSnakeHead.y
	});

	snakeHead.head = true;
	snakeParts.push(_.clone(snakeHead));
}

let initSnakeBody = (snakeLength) => {
	for (var i = 1; i < snakeLength; i++) {
		let snakeBody = _.find(board, {
			x: initialSnakeHead.x + i,
			y: initialSnakeHead.y
		});

		snakeBody.snake = true;
		snakeParts.push(_.clone(snakeBody));
	}
}

let resetFood = () => {
	let oldFood = _.find(board, {food: true});

	if(oldFood) {
		oldFood.food = false;
	}

	let xCoord = Math.floor(Math.random() * boardWidth.length + 1);
	let yCoord = Math.floor(Math.random() * boardHeight.length + 1);

	let foodCell = _.find(board, {
		x: xCoord,
		y: yCoord
	});

	foodCell.food = true;
}

let oneStep = () => {
	if(isGameOver) {
		return;
	}

	let newHead = getNewHead();
	let oldHead = snakeParts[0];
	let newHeadOnBoard = _.find(board, {x: newHead.x, y: newHead.y})
	let oldHeadOnBoard = _.find(board, {x: oldHead.x, y: oldHead.y})

	if(boardCollision(newHead) || selfCollision(newHead)) {
		gameOver();
		return;
	}

	if(foodCollision(newHead)) {
		score++;
		resetFood();
	} else {
		removeLastTail();
	}

	newHeadOnBoard.head = true;
	oldHeadOnBoard.head = oldHead.head = false;
	oldHeadOnBoard.snake = oldHead.snake = true;

	snakeParts.unshift(newHead);
}

let removeLastTail = () => {
	let lastSnakePart = snakeParts.pop();
	let lastSnakePartOnBoard = _.find(board, lastSnakePart);
	lastSnakePartOnBoard.snake = false;
}

let getNewHead = () => {
	let newHead = _.clone(snakeParts[0]);

	if(currentDirection === 'LEFT') {
		newHead.x -= 1;
	} else if(currentDirection === 'RIGHT') {
		newHead.x += 1;
	} else if(currentDirection === 'UP') {
		newHead.y -= 1;
	} else if (currentDirection === 'DOWN') {
		newHead.y += 1;
	}

	return newHead;
}

let boardCollision = (part) => {
	return part.x === -1 || part.y === -1 || part.x === boardSize || part.y === boardSize;
}

let selfCollision = (part) => {
	let snakeBody = _.find(snakeParts, {x: part.x, y: part.y});

	if(snakeBody) {
		return snakeBody.snake || snakeBody.head;
	}
}

let foodCollision = (part) => {
	let food = _.find(board, {x: part.x, y: part.y});

	if(food) {
		return food.food;
	}
}

let eatFood = () => {
	let additionalPart = _.clone(snakeParts[snakeParts.length - 1]);
	snakeParts.push(additionalPart);
}

let gameOver = () => {
	snakeParts = [];
	isGameOver = true;
	initGame();
}

let checkGameOverStatus = () => {
	return isGameOver;
}

module.exports = {
	getGameSpeed: getGameSpeed,
	initGame: initGame,
	startGame: startGame,
	checkGameOverStatus: checkGameOverStatus,
	getBoard: getBoard,
	getScore: getScore,
	oneStep: oneStep
};
