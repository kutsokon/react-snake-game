import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './board.css';



class Board extends Component {
	render() {
		const boardHeight = 20;
		const boardWidth = 20;
		let board = [];

		// initialize cells
		for (var i = 0; i <= boardHeight; i++) {
			board[i] = [];

			for (var j = 0; j <= boardWidth; j++) {
				board[i][j] = {
					x: i,
					y: j
				}
			}
		}

		let boardCells = board.map((column) => {
			return column.map((cell) => {
				return <div key={cell.toString()} className="board-cell"></div>
			})
		});

		return <div className="board-wrapper">{boardCells}</div>
	}
}

export default Board;