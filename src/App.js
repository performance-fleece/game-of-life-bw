import React from 'react';
import logo from './logo.svg';
import './App.css';
import Cell from './components/Cell';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            cols: 50,
            rows: 25,
        };
    }

    renderMap() {
        let newMap = [];
        let cellRow = [];

        for (let i = 0; i < this.state.cols; i++) {
            for (let j = 0; j < this.state.rows; j++) {
                cellRow.push(<Cell key={(i, j)} />);
            }
            newMap.push(
                <div className="row" key={i}>
                    {cellRow}
                </div>
            );
            cellRow = [];
        }
        return newMap;
    }

    render() {
        return (
            <div className="main">
                <div className="upper-wrapper">
                    <div className="game-box">{this.renderMap()}</div>
                    <div className="pre-mades">pre-mades here</div>
                </div>
                <div className="lower-wrapper">
                    <div className="game-description"></div>
                </div>
            </div>
        );
    }
}

export default App;
