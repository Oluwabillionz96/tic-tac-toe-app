import { Dispatch, SetStateAction } from "react";
import { Board, GameLevel } from "./types";
import { getRandomMove } from "./utils";
import { findMoves, takePlace } from "./moves";
import { AudioPlayer } from "expo-audio";

function smartAlgorithm(board: Board, isPlayerX: boolean, level: GameLevel) {
  if (level === "easy" && Math.random() < 0.8) {
    return getRandomMove(board);
  }

  if (level === "medium" && Math.random() < 0.3) {
    return getRandomMove(board);
  }

  if (level === "hard" && Math.random() < 0.1) {
    return getRandomMove(board);
  }
  const winningMove = findMoves(board, isPlayerX ? "O" : "X");
  if (winningMove > -1) {
    return winningMove;
  }

  const blockingMove = findMoves(board, isPlayerX ? "X" : "O");
  if (blockingMove > -1) {
    return blockingMove;
  }
  if (board[4] === null) {
    return 4;
  }

  const corner = takePlace(board, [0, 2, 6, 8]);

  if (corner > -1) {
    return corner;
  }

  const side = takePlace(board, [1, 3, 5, 7]);

  if (side > -1) {
    return side;
  }

  return getRandomMove(board);
}

export const otherPlayerAlgorithm = (
  isPlayerTurn: boolean,
  setTurn: Dispatch<SetStateAction<boolean>>,
  board: Board,
  setBoard: Dispatch<SetStateAction<("X" | "O" | null)[]>>,
  isPlayerX: boolean | "random",
  level: GameLevel,
  player: AudioPlayer,
) => {
  if (isPlayerTurn) return;

  let nextMoveIndex = smartAlgorithm(board, isPlayerX as boolean, level);

  const newBoard = [...board];
  newBoard[nextMoveIndex] = isPlayerX === true ? "O" : "X";
  setBoard(newBoard);
  player.play();
  setTurn(true);
};
