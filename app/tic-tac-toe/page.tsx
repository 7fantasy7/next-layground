'use client';

import React from "react";
import Game from "./game";

export default function TicTacToe() {
  return (
    <div className="flex flex-col	h-screen w-screen items-center justify-center bg-indigo-800">
      <h1 className="text-white text-4xl font-mono mb-10">Tic-Tac-Toe</h1>
      <Game/>
    </div>
  )
}
