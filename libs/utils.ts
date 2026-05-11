import { Dispatch, SetStateAction } from "react";

export const wins = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

function getRandomNumber(board: ("X" | "O" | null)[]) {
  const emptyIndex = board
    .map((item, index) => (item === null ? index : item))
    .filter((item) => typeof item === "number");

  const randomNumber = Math.floor(Math.random() * emptyIndex.length);
  return emptyIndex[randomNumber];
}

export const otherPlayerAlgorithm = (
  gameOver: boolean,
  isPlayerTurn: boolean,
  setTurn: Dispatch<SetStateAction<boolean>>,
  board: ("X" | "O" | null)[],
  setBoard: Dispatch<SetStateAction<("X" | "O" | null)[]>>,
) => {
  if (gameOver || isPlayerTurn) return;

  const nextMoveIndex = getRandomNumber(board);
  const newBoard = [...board];

  newBoard[nextMoveIndex] = "O";
  setBoard(newBoard);
  setTurn(true);
};
