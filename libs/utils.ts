import { Dispatch, SetStateAction } from "react";

const wins = [
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
  const emptyIndices = board
    .map((item, index) => (item === null ? index : -1))
    .filter((index) => index !== -1);

  if (emptyIndices.length === 0) return -1;

  const randomIndex = Math.floor(Math.random() * emptyIndices.length);
  return emptyIndices[randomIndex];
}

export const otherPlayerAlgorithm = (
  isPlayerTurn: boolean,
  setTurn: Dispatch<SetStateAction<boolean>>,
  board: ("X" | "O" | null)[],
  setBoard: Dispatch<SetStateAction<("X" | "O" | null)[]>>,
  isPlayerX: boolean | "random",
) => {
  if (isPlayerTurn) return;

  const nextMoveIndex = getRandomNumber(board);
  if (nextMoveIndex === -1) return; // No valid moves left

  const newBoard = [...board];
  newBoard[nextMoveIndex] = isPlayerX === true ? "O" : "X";
  setBoard(newBoard);
  setTurn(true);
};

export const checkWin = (board: ("X" | "O" | null)[]) => {
  for (const win of wins) {
    const [a, b, c] = win;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return win; // Return winning indices
    }
  }
  return undefined;
};
