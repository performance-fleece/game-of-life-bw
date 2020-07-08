import React, { Component } from "react";
import "./App.css";
import Game from "./components/Game";

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			size: [50, 25],
			gameRunning: false,
			game: new Game(),
		};
		this.handleColumnChange = this.handleColumnChange.bind(this);
		this.handleRowChange = this.handleRowChange.bind(this);
		this.startGame = this.startGame.bind(this);
		this.stopGame = this.stopGame.bind(this);
		this.renderGame = this.renderGame.bind(this);
		this.updateCell = this.updateCell.bind(this);
		this.resetGame = this.resetGame.bind(this);
	}

	renderGame() {
		let newBoard = [];
		let cellRow = [];

		for (let i = 0; i < this.state.size[0]; i++) {
			for (let j = 0; j < this.state.size[1]; j++) {
				if (this.state.game.isCellAlive(i + " , " + j)) {
					cellRow.push(
						<Cell
							key={(i, j)}
							position={{ x: i, y: j }}
							live={true}
							updateCell={this.updateCell.bind(this)}
						/>
					);
				} else {
					cellRow.push(
						<Cell
							key={(i, j)}
							position={{ x: i, y: j }}
							live={false}
							updateCell={this.updateCell.bind(this)}
						/>
					);
				}
			}

			newBoard.push(
				<div className="row" key={i}>
					{cellRow}
				</div>
			);
			cellRow = [];
		}
		return newBoard;
	}

	handleRowChange(event) {
		if (!this.state.gameRunning) {
			var actualSize = this.state.size;
			if (event.target.value < 20) actualSize[1] = event.target.value;
			else actualSize[1] = 20;

			this.setState({
				size: actualSize,
			});
			this.renderGame();
		}
	}

	handleColumnChange(event) {
		if (!this.state.gameRunning) {
			var actualSize = this.state.size;
			if (event.target.value < 60) actualSize[0] = event.target.value;
			else actualSize[1] = 60;

			this.setState({
				size: actualSize,
			});
			this.renderGame();
		}
	}

	startGame() {
		if (!this.state.gameRunning) {
			this.setState(
				{
					gameRunning: true,
				},
				() => {
					this.intervalRef = setInterval(() => this.runGame(), 15);
				}
			);
		}
	}
	stopGame() {
		this.setState(
			{
				gameRunning: false,
			},
			() => {
				if (this.intervalRef) {
					clearInterval(this.intervalRef);
				}
			}
		);
	}

	resetGame() {
		this.stopGame();
		this.setState({
			game: new Game(),
		});
		this.renderGame();
	}

	runGame() {
		this.setState({
			game: this.state.game.addGeneration(),
		});
	}

	updateCell(position) {
		if (!this.state.gameRunning) {
			this.setState({
				game: this.state.game.updateCell(position),
			});
		}
	}

	render() {
		return (
			<div className="main">
				<div className="headerWrapper">
					<div className="headerInner">
						<label className="label">
							Rows:
							<input
								className="input"
								type="text"
								value={this.state.size[1]}
								onChange={this.handleRowChange}
							/>
						</label>
						<label className="label">
							Rows:
							<input
								className="input"
								type="text"
								value={this.state.size[0]}
								onChange={this.handleColumnChange}
							/>
						</label>
					</div>
					<div className="headerButtons">
						<button className="submit" onClick={this.startGame}>
							Start
						</button>
						<button className="submit" onClick={this.stopGame}>
							Stop
						</button>
						<button className="submit" onClick={this.resetGame}>
							Reset
						</button>
					</div>
					Generation: {this.state.game.getGeneration()}
				</div>
				<div className="boardContainer">{this.renderGame()}</div>
			</div>
		);
	}
}

class Cell extends Component {
	render() {
		return (
			<div
				onClick={() => this.props.updateCell(this.props.position)}
				className={this.props.live ? "cellAlive" : "cellDead"}
			></div>
		);
	}
}
