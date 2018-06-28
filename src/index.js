import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import GameState from './GameState';


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

function Board(props) {

  const renderSquare = (i) => (
    <Square
      value={props.state.board[i]}
      onClick={() => props.onClick(i)}
    />
  );

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
}

function GameState_getStatus(state) {
  const winner = state.getWinner();
  return winner ?
    `Winner: ${winner}` :
    `Next player: ${state.player}`;
}

class Game extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      history: [GameState.initial()] // TODO: replace with singly linked list
    };
  }

  getCurrentGameState() {
    const history = this.state.history;
    return history[history.length - 1];
  }

  handleClick(i) {
    const gameState = this.getCurrentGameState();

    if (gameState.getWinner() !== null) {
      return;
    }

    const newGameState = gameState.makeMove(i);
    const history = this.state.history.slice();
    history.push(newGameState);
    this.setState({ history });
  }

  render() {
    const status = GameState_getStatus(this.getCurrentGameState());

    return (
      <div className="game">
        <div className="game-board">
          <Board
            state={this.getCurrentGameState()}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
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
