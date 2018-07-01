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
      history: [GameState.initial()],
      currentStateId: 0
    };
  }

  getCurrentGameState() {
    return this.state.history[this.state.currentStateId];
  }

  pushGameState(newState) {
    const currentStateId = this.state.currentStateId + 1;
    const history = this.state.history
      .slice(0, currentStateId)
      .concat([newState]);
    this.setState({ history, currentStateId });
  }

  handleClick(i) {
    const gameState = this.getCurrentGameState();

    if (gameState.getWinner() !== null) {
      return;
    }

    const newGameState = gameState.makeMove(i);
    this.pushGameState(newGameState);
  }

  jumpTo(gameStateId) {
    this.setState({
      history: this.state.history,
      currentStateId: gameStateId
    });
  }

  render() {
    const status = GameState_getStatus(this.getCurrentGameState());

    const moves = this.state.history.map((_move, moveId) => {
      const description = (moveId > 0) ? `Go to move # ${moveId}` : `Go to game start`;
      return (
        <li key={moveId}>
          <button onClick={() => this.jumpTo(moveId)}>{description}</button>
        </li>
      );
    });

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
          <ol>{moves}</ol>
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
