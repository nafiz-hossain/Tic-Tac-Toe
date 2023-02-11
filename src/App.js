import React, { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import './styles.css';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';

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
  const [winnerToastId, setWinnerToastId] = useState(null);

  useEffect(() => {
    const winner = calculateWinner(state.squares);
    if (winner && !winnerToastId) {
      const toastId = toast.success(`Winner: ${winner}`, {
        duration: 5000,
        position: 'bottom-center',
        style: {
          padding: '10px',
        },
        onDismiss: handleToastDismiss,
      });
      setWinnerToastId(toastId);
      const timer = setTimeout(() => {
        resetGame();
      }, 5000);
      return () => clearTimeout(timer);
    } else if (!winner && winnerToastId) {
      toast.dismiss(winnerToastId);
      setWinnerToastId(null);
    } else if (isBoardFull(state.squares)) {
      const toastId = toast.error('Draw', {
        duration: 5000,
        position: 'bottom-center',
        onDismiss: handleToastDismiss,
      });
      const timer = setTimeout(() => {
        resetGame();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [state.squares, winnerToastId]);

  const handleClick = (i) => {
    const squares = state.squares.slice();
    if (calculateWinner(squares) || squares[i]) return;
    squares[i] = state.xIsNext ? 'X' : 'O';
    setState({
      squares: squares,
      xIsNext: !state.xIsNext,
    });
  };

  const isBoardFull = (squares) => {
    return squares.every((square) => square !== null);
  };

  const handleToastDismiss = () => {
    resetGame();
  };

  const resetGame = () => {
    setState(INITIAL_STATE);
  };

  let status = `Next player: ${state.xIsNext ? 'X' : 'O'}`;

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={state.squares} onClick={handleClick} />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <div className="button-container">
          <Button onClick={resetGame} variant="contained" color="success">
            Reset game
          </Button>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Game;
