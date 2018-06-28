export default class GameState {
  constructor(board, player) {
    this.board = board;
    this.player = player;
  }

  getWinner() {

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

    const values = lines.map(line => line.map(index => this.board[index]));

    for (const [a, b, c] of values) {
      if (a !== null && a === b && a === c) {
        return a;
      }
    }

    return null;
  }

  static initial() {
    return new GameState(
      Array(9).fill(null),
      'X'
    );
  }

  setPlayer(player) {
    return new GameState(this.board, player);
  }

  setValue(position, newValue) {
    if (this.board[position] !== null) {
      throw Error('Invalid move: this square is already occupied.');
    }

    const board = this.board.slice();
    board[position] = newValue;

    return new GameState(board, this.player);
  }

  makeMove(position) {
    if (this.getWinner()) {
      throw Error('Invalid move: this game is already over.');
    }

    return this
      .setValue(position, this.player)
      .setPlayer((this.player === 'X') ? 'O' : 'X');
  }
}
