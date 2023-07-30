import Board from "./board";
import {useState} from "react";

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null) as string[]]);
  const [currentMove, setCurrentMove] = useState(0);

  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares: string[]) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function handleRestart() {
    setHistory([Array(9).fill(null) as string[]]);
    setCurrentMove(0);
  }

  function jumpTo(nextMove: number) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
      return (
        <li key={move}>
          <button className="font-light" onClick={() => jumpTo(move)}>{description}</button>
        </li>
      );
    }
  });

  return (
    <div className="text-white">
      <div className="grid grid-cols-2">
        <div>
          <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
        </div>
        <div>
          <ol className="text-white font-mono mb-2">History:</ol>
          <ol>
            {moves}
          </ol>
        </div>
      </div>
      <button onClick={handleRestart}
              className="mt-10 px-20 bg-green-500 disabled:opacity-50
              hover:bg-green-600 text-white text-2xl font-medium py-3 rounded-2xl"
              disabled={currentMove === 0}
      >
        Restart
      </button>
    </div>
  );
}