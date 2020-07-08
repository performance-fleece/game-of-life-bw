import React, { useState } from "react";
import "./App.css";
import Game from "./components/Game";

export default function App(props) {
	const [columns, setColumns] = useState(50);
	const [rows, setRows] = useState(25);
	const [gameRunning, setGameRunning] = useState(false);
	const [game, setGame] = useState(new Game());
	const [delay, setDelay] = 500;

	// this.handleColumnChange = this.handleColumnChange.bind(this);
	// this.handleRowChange = this.handleRowChange.bind(this);
	// this.startGame = this.startGame.bind(this);
	// this.stopGame = this.stopGame.bind(this);
	// this.renderGame = this.renderGame.bind(this);
	// this.updateCell = this.updateCell.bind(this);
	// this.resetGame = this.resetGame.bind(this);
	// this.handleChangeInterval = this.handleChangeInterval.bind(this);
	// this.runGame = this.runGame.bind(this);

	const renderGame = () => {
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
	};

	const handleColumnChange = (event) => {
		if (!{ gameRunning }) {
			var newColumns = this.state.columns;
			if (event.target.value < 60) newColumns = event.target.value;
			else newColumns = 60;

			setColumns(newColumns);
			renderGame();
		}
	};

	const handleRowChange = (event) => {
		if (!this.state.gameRunning) {
			var newRows = this.state.rows;
			if (event.target.value < 25) newRows = event.target.value;
			else newRows = 25;

			setRows(newRows);
			renderGame();
		}
	};

	const handleChangeInterval = (event) => {
		if (!this.state.gameRunning) {
			setDelay(event.target.value * 1000);
		}
	};

	const startGame = () => {
		if (!this.state.gameRunning) {
			setGameRunning(true, () => {
				this.intervalRef = setInterval(() => runGame(), {
					delay,
				});
			});
		}
	};
	const stopGame = () => {
		setGameRunning(false, () => {
			if (this.intervalRef) {
				clearInterval(this.intervalRef);
			}
		});
	};

	const resetGame = () => {
		stopGame();
		setGame(new Game());
		renderGame();
	};

	const runGame = () => {
		setGame(this.state.game.addGeneration());
	};

	const updateCell = (position) => {
		if (!this.state.gameRunning) {
			setGameRunning(this.state.game.updateCell(position));
		}
	};

	return (
		<div className="main">
			<div className="header">
				<h1>Conway's Game of Life</h1>
			</div>
			<div className="middleWrapper">
				<div className="boardContainer">{renderGame()}</div>
				<div className="rulesContainer">
					<h4>Rules</h4>
					<ul className="a">
						<li>
							If the cell is alive and has 2 or 3 neighbors, then
							it remains alive. Otherwise it dies
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
									value={rows}
									onChange={this.handleRowChange}
								/>
							</label>
							<label className="label">
								Columns:
								<input
									className="input"
									type="text"
									value={columns}
									onChange={this.handleColumnChange}
								/>
							</label>
							<label className="label">
								Seconds/Int:
								<input
									className="input"
									type="number"
									value={this.state.delay / 1000}
									onChange={this.handleChangeInterval}
								/>
							</label>
						</div>
						<div className="controlButtons">
							<button className="submit" onClick={this.runGame}>
								Step Forward
							</button>
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

function Cell(props) {
	return (
		<div
			onClick={() => this.props.updateCell(this.props.position)}
			className={this.props.live ? "cellAlive" : "cellDead"}
		></div>
	);
}
