import React, { Component } from "react";
import "./App.css";
import Game from "./components/Game";

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			columns: 50,
			rows: 25,
			gameRunning: false,
			game: new Game(),
			interval: 500,
		};
		this.handleColumnChange = this.handleColumnChange.bind(this);
		this.handleRowChange = this.handleRowChange.bind(this);
		this.startGame = this.startGame.bind(this);
		this.stopGame = this.stopGame.bind(this);
		this.renderGame = this.renderGame.bind(this);
		this.updateCell = this.updateCell.bind(this);
		this.resetGame = this.resetGame.bind(this);
		this.handleChangeInterval = this.handleChangeInterval.bind(this);
		this.runGame = this.runGame.bind(this);
	}

	renderGame() {
		let newBoard = [];
		let cellRow = [];

		for (let i = 0; i < this.state.columns; i++) {
			for (let j = 0; j < this.state.rows; j++) {
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

	handleColumnChange(event) {
		if (!this.state.gameRunning) {
			var newColumns = this.state.columns;
			if (event.target.value < 60) newColumns = event.target.value;
			else newColumns = 60;

			this.setState({
				columns: newColumns,
			});
			this.renderGame();
		}
	}

	handleRowChange(event) {
		if (!this.state.gameRunning) {
			var newRows = this.state.rows;
			if (event.target.value < 25) newRows = event.target.value;
			else newRows = 25;

			this.setState({
				rows: newRows,
			});
			this.renderGame();
		}
	}

	handleChangeInterval(event) {
		if (!this.state.gameRunning) {
			this.setState({
				interval: event.target.value * 1000,
			});
		}
	}

	startGame() {
		if (!this.state.gameRunning) {
			this.setState(
				{
					gameRunning: true,
				},
				() => {
					this.intervalRef = setInterval(
						() => this.runGame(),
						this.state.interval
					);
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
				<div className="header">
					<h1>Conway's Game of Life</h1>
				</div>
				<div className="middleWrapper">
					<div className="boardContainer">{this.renderGame()}</div>
					<div className="rulesContainer">
						<h4>Rules</h4>
						<ul className="a">
							<li>
								If the cell is alive and has 2 or 3 neighbors,
								then it remains alive. Otherwise it dies
							</li>
							<li>
								If the cell is dead and has exactly 3 live
								neighbors, it will come to life. Otherwise it
								remains dead.
							</li>
						</ul>
						<div className="controlWrapper">
							<div className="controlInner">
								<label className="label">
									Rows:
									<input
										className="input"
										type="text"
										value={this.state.rows}
										onChange={this.handleRowChange}
									/>
								</label>
								<label className="label">
									Columns:
									<input
										className="input"
										type="text"
										value={this.state.columns}
										onChange={this.handleColumnChange}
									/>
								</label>
								<label className="label">
									Seconds/Int:
									<input
										className="input"
										type="number"
										value={this.state.interval / 1000}
										onChange={this.handleChangeInterval}
									/>
								</label>
							</div>
							<div className="controlButtons">
								<button
									className="submit"
									onClick={this.runGame}
								>
									Step Forward
								</button>
								<button
									className="submit"
									onClick={this.startGame}
								>
									Start
								</button>
								<button
									className="submit"
									onClick={this.stopGame}
								>
									Stop
								</button>
								<button
									className="submit"
									onClick={this.resetGame}
								>
									Reset
								</button>
							</div>
							<div className="controlButtons"></div>
							<div className="generation">
								Generation: {this.state.game.getGeneration()}
							</div>
						</div>
					</div>
				</div>
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
