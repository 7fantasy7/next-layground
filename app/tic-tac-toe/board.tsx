import React from "react";
import Square from "./square";
import useSound from "use-sound";

type Props = {
  xIsNext: boolean,
  squares: string[],
  onPlay: Function
}

export default function Board({xIsNext, squares, onPlay}: Props) {

  const [playX] = useSound(
    '/tic-tac-toe/cross.wav',
    {volume: 1}
  );
  const [playO] = useSound(
    '/tic-tac-toe/nought.mp3',
    {volume: 0.2}
  );

  function handleClick(i: number) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }

    const nextSquares = squares.slice();

    if (xIsNext) {
      nextSquares[i] = "X";
      playO();
    } else {
      playX();
      nextSquares[i] = "O";
    }

    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className="text-white font-mono mb-2">{status}</div>

      <div className="grid grid-rows-3 grid-cols-3 bg-violet-400 rounded-xl">
        {[...Array(9)].map((x, i) =>
          <Square key={i} value={squares[i]} onSquareClick={() => handleClick(i)}/>
        )}
      </div>
    </>
  );
}

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

function calculateWinner(squares: string[]) {
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  if (squares.filter(v => v == null).length === 0) {
    return "Tie"
  }

  return null;
}