import { Board } from "./types";
import { wins } from "./utils";

export function findWinningMoves(board: Board, computerSymbol: "X" | "O") {
  let winningMove: number = -1;
  wins.forEach((win) => {
    const values = win.filter((item) => board[item]);
    if (values.length === 2) {
      const [a, b] = values;
      if (board[a] === board[b] && board[a] === computerSymbol) {
        winningMove = win.filter((index) => !values.includes(index))[0];
      }
    }
  });

  return winningMove;
}

export function findBlockingMoves(board: Board, playerSymbol: "X" | "O") {
  let blockingMove: number = -1;
  wins.forEach((win) => {
    const values = win.filter((item) => board[item]);
    if (values.length === 2) {
      const [a, b] = values;
      if (board[a] === board[b] && board[a] === playerSymbol) {
        blockingMove = win.filter((index) => !values.includes(index))[0];
      }
    }
  });

  return blockingMove;
}

export function takePlace(board: Board, places: number[]) {
  const emptyplaces = places.filter((place) => board[place] === null);
  return emptyplaces[0] ? emptyplaces[0] : -1;
}
