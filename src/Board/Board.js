import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Cell from './Cell/Cell';
import snakeGame from './snake-game';
import './board.css';

let stepInterval;
let gameSpeed = snakeGame.getGameSpeed();

class Board extends Component {
	constructor () {
		super()
		snakeGame.initGame();
		this.state = {
			board: snakeGame.getBoard(),
			score: snakeGame.getScore(),
			gameOver: snakeGame.checkGameOverStatus()
		}
		this.startGame = this.startGame.bind(this);
		this.updateStep = this.updateStep.bind(this);
		this.updateView = this.updateView.bind(this);
	}

	startGame () {
		snakeGame.startGame();
		this.updateView();
		stepInterval = setInterval(this.updateStep, gameSpeed);
	}

	updateStep () {
		if(snakeGame.checkGameOverStatus()) {
			clearInterval(stepInterval);
		};
		snakeGame.oneStep();
		this.updateView();
	}

	updateView () {
		this.setState({
			board: snakeGame.getBoard(),
			score: snakeGame.getScore(),
			gameOver: snakeGame.checkGameOverStatus()
		});
	}

	render() {
		let boardCells = this.state.board.map((cell) => {
			return <Cell x={cell.x} y={cell.x} snake={cell.snake} head={cell.head} food={cell.food}/>
		});

		return (
			<div>
				<div>Score: {this.state.score}</div>
				<div className='board-wrapper'>{boardCells}</div>
				<div className={"start-button " + (!this.state.gameOver ? 'disabled' : '')}
					 onClick={this.startGame}>Start game</div>
			</div>
		)
	}
}

export default Board;
