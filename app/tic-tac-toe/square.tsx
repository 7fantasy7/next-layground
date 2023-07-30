import React from "react";

type Props = {
  value: string,
  onSquareClick: React.MouseEventHandler<HTMLButtonElement> | undefined
}

export default function Square(props: Props) {
  return <button
    className="bg-violet-900 border-violet-400 border-8 rounded-3xl text-lg w-40 h-40 text-center p-0 font-bold"
    onClick={props.onSquareClick}>
    {props.value === 'X' ? <X/> : (props.value === 'O' ? <O/> : <div/>)}
  </button>;
}


function X() {
  return <div className="text-9xl text-red-600 font-extrabold">X</div>
}

function O() {
  return <div className="text-9xl text-yellow-400 font-extrabold">O</div>
}