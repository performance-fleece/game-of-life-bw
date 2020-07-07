import React, { Component } from "react";
import "./App.css";

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			size: [50, 25],
		};
	}

	renderGame() {
		let newBoard = [];
		let cellRow = [];

		for (let i = 0; i < this.state.size[0]; i++) {
			for (let j = 0; j < this.state[1]; j++) {
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

	handleRowChange() {}

	handleColumnChange() {}

	startGame() {}
	stopGame() {}

	getGeneration() {}

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
				onClick={() => this.props.storeCell(this.props.position)}
				className={
					this.props.live ? "cellContainerLive" : "cellContainerDead"
				}
			></div>
		);
	}
}
