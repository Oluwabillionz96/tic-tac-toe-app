import { Dispatch, SetStateAction } from "react";
import { Board } from "./types";
import { getRandomNumber } from "./utils";
import { findBlockingMoves, findWinningMoves, takePlace } from "./moves";

function smartAlgorithm(board: Board, isPlayerX: boolean) {
  const winningMove = findWinningMoves(board, isPlayerX ? "O" : "X");
  if (winningMove && winningMove > -1) {
    return winningMove;
  }

  const blockingMove = findBlockingMoves(board, isPlayerX ? "X" : "O");
  if (blockingMove && blockingMove > -1) {
    return blockingMove;
  }
  if (board[4] === null) {
    return 4;
  }

  const coner = takePlace(board, [0, 2, 6, 8]);

  if (coner && coner > -1) {
    return coner;
  }

  const side = takePlace(board, [1, 3, 5, 7]);

  if (side && side > -1) {
    return side;
  }

  return getRandomNumber(board);
}

export const otherPlayerAlgorithm = (
  isPlayerTurn: boolean,
  setTurn: Dispatch<SetStateAction<boolean>>,
  board: Board,
  setBoard: Dispatch<SetStateAction<("X" | "O" | null)[]>>,
  isPlayerX: boolean | "random",
  isLevelEasy: boolean,
) => {
  if (isPlayerTurn) return;

  let nextMoveIndex;
  if (isLevelEasy) {
    nextMoveIndex = getRandomNumber(board);
    if (nextMoveIndex === -1) return; // No valid moves left
  } else {
    nextMoveIndex = smartAlgorithm(board, isPlayerX as boolean);
  }

  const newBoard = [...board];
  newBoard[nextMoveIndex] = isPlayerX === true ? "O" : "X";
  setBoard(newBoard);
  setTurn(true);
};
