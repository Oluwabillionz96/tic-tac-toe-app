import { Board } from "./types";
import { getRandomIndex, wins } from "./utils";

export function findMoves(board: Board, Symbol: "X" | "O") {
  for (const win of wins) {
    const [a, b, c] = win;
    const values = [board[a], board[b], board[c]];

    const symbolCount = values.filter((v) => v === Symbol).length;
    const emptyCount = values.filter((v) => v === null).length;

    if (symbolCount === 2 && emptyCount === 1) {
      if (board[a] === null) return a;
      if (board[b] === null) return b;
      if (board[c] === null) return c;
    }
  }

  return -1;
}

export function takePlace(board: Board, places: number[]) {
  const emptyplaces = places.filter((place) => board[place] === null);

  if (emptyplaces.length === 0) {
    return -1;
  }
  return emptyplaces[getRandomIndex(emptyplaces.length)];
}
