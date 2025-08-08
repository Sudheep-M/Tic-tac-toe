import React, { useRef, useState } from 'react'
import Confetti from 'react-confetti';
import { useWindowSize } from '@react-hook/window-size';

function Game() {

  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);
  const [width, height] = useWindowSize();

  const updatedBoard = [];
  const winner = getWinner(board);

  setTimeout(() => {
  updatedBoard[randomIndex] = 'O';
  setBoard(updatedBoard);
  setIsXTurn(true);
}, 5000); // 0.5 second delay


const handleClick = (index) => {
  if (board[index] || winner || !isXTurn) return;

  const updatedBoard = [...board];
  updatedBoard[index] = 'X';
  setBoard(updatedBoard);

  const afterXWin = getWinner(updatedBoard);
  if (afterXWin || updatedBoard.every(cell => cell !== null)) {
    setIsXTurn(false);
    return;
  }

  setTimeout(() => {
    const boardAfterX = [...updatedBoard];
    const oMove = getSmartMove(boardAfterX);

    if (oMove !== null) {
      boardAfterX[oMove] = 'O';
      setBoard(boardAfterX);
    }

    setIsXTurn(true);
  }, 600); 
};


  function getSmartMove(board) {
    const lines = [
      [0,1,2],[3,4,5],[6,7,8],
      [0,3,6],[1,4,7],[2,5,8],
      [0,4,8],[2,4,6]          
    ];

    for (const [a, b, c] of lines) {
      const values = [board[a], board[b], board[c]];
      if (values.filter(v => v === 'O').length === 2 && values.includes(null)) {
        return [a, b, c][values.indexOf(null)];
      }
    }

    for (const [a, b, c] of lines) {
      const values = [board[a], board[b], board[c]];
      if (values.filter(v => v === 'X').length === 2 && values.includes(null)) {
        return [a, b, c][values.indexOf(null)];
      }
    }
    if (board[4] === null) return 4;

    const corners = [0, 2, 6, 8];
    for (const i of corners) {
      if (board[i] === null) return i;
    }

    const sides = [1, 3, 5, 7];
    for (const i of sides) {
      if (board[i] === null) return i;
    }

    return null;
  }

    const resetGame = () => {
      setBoard(Array(9).fill(null));
      setIsXTurn(true);
    };

    function getWinner(board) {

    const winningLines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], 
      [0, 3, 6], [1, 4, 7], [2, 5, 8], 
      [0, 4, 8], [2, 4, 6],  
    ];

    for (let [a, b, c] of winningLines) {
      if (board[a] && board[a] === board[b] && board[b] === board[c]) {
        return board[a]; 
      }
    }

    return null;
  }

  function gamestatus() {
  if (winner) {
    return (
        <div className='flex'>
        <span>"{winner}" Wins the game</span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 mx-1"><path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
        </svg>
        </div>
    );
  } else if (board.every(cell => cell !== null)) {
    return(
      <div className='flex items-center'>
        <span>It's a draw!</span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mx-1">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 16.318A4.486 4.486 0 0 0 12.016 15a4.486 4.486 0 0 0-3.198 1.318M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" /></svg>
      </div>
    ) ;
  } else {
    return `Next Turn: ${isXTurn ? 'X' : 'O'}`;
  }
}
  return (
    <div className="h-screen flex flex-col md:justify-center items-center bg-radial from-sky-500 via-blue-400 to-indigo-900">
        {winner && <Confetti width={width} height={height} />}
      <h1 className="text-4xl mt-20 md:mt-0 md:text-5xl font- font-serif mb-4">Tic Tac Toe</h1>
      <h2 className="text-xl bold md:text-xl mb-6">{gamestatus()}</h2>
      <div className='flex h-screen md:h-auto flex-col items-center justify-center'>
      <div className="grid grid-cols-3 gap-2 ">
        {board.map((cell, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            className="w-20 h-20 text-2xl font-bold border-2 bg-sky-300 rounded-lg border-gray-600 hover:bg-sky-600">
            { cell}
          </button>
        ))}
      </div>
      <button onClick={resetGame} className="mt-6 w-30 px-4 py-2 shadow-sm shadow-black bg-gray-800 text-white rounded hover:bg-blue-700">Reset Game</button>
    </div>
    </div>
  );
}

export default Game