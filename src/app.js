import React, { useState } from 'react';
import './styles.css';

const INITIAL_STATE = {
  squares: Array(9).fill(null),
  xIsNext: true,
};

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

const Square = ({ value, onClick }) => (
  <button className="square" onClick={onClick}>
    {value}
  </button>
);

const Board = ({ squares, onClick }) => (
  <div className="board">
    {squares.map((square, i) => (
      <Square key={i} value={square} onClick={() => onClick(i)} />
    ))}
  </div>
);

const Game = () => {
  const [state, setState] = useState(INITIAL_STATE);

  const handleClick = (i) => {
    const squares = state.squares.slice();
    if (calculateWinner(squares) || squares[i]) return;
    squares[i] = state.xIsNext ? 'X' : 'O';
    setState({
      squares: squares,
      xIsNext: !state.xIsNext,
    });
  };

  const winner = calculateWinner(state.squares);
  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = `Next player: ${state.xIsNext ? 'X' : 'O'}`;
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={state.squares} onClick={handleClick} />
      </div>
      <div className="game-info">
        <div>{status}</div>
      </div>
    </div>
  );
};

export default Game;
