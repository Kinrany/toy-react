import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


function Square(props) {
  return (
    <button
      className="square"
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      values: Array(9).fill(null),
      player: 'X'
    }
  }

  getWinner() {
    return calculateWinner(this.state.values);
  }

  handleClick(i) {
    if (this.getWinner() !== null) {
      return;
    }

    const values = this.state.values.slice();
    values[i] = this.state.player;
    const player = (this.state.player === 'X') ? 'O' : 'X';
    this.setState({ values, player });
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.values[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const winner = this.getWinner();

    let status;
    if (winner) {
      status = `Winner: ${winner}`;
    }
    else {
      status = `Next player: ${this.state.player}`;
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

function calculateWinner(board) {
  // [0, 1, 2,
  //  3, 4, 5,
  //  6, 7, 8]
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  const values = lines.map(line => line.map(index => board[index]));

  for (const [a, b, c] of values) {
    if (a !== null && a === b && a === c) {
      return a;
    }
  }

  return null;
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
