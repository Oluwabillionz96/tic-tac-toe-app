import { Dispatch, SetStateAction } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Scores } from "./types";

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

export async function saveLocalData(key: string, value: string) {
  await AsyncStorage.setItem(key, value);
}

export async function getLocalData(key: string): Promise<string | null> {
  return await AsyncStorage.getItem(key);
}

export async function getPlayerChoice(
  setIsPlayerX: Dispatch<SetStateAction<boolean | "random">>,
) {
  const playerChoice = await getLocalData("playerChoice");
  if (playerChoice) {
    try {
      const parsed = JSON.parse(playerChoice);
      // Validate that parsed value is valid
      if (parsed === true || parsed === false || parsed === "random") {
        setIsPlayerX(parsed);
      }
    } catch (error) {
      console.error("Error parsing player choice from localStorage:", error);
    }
  }
}

export async function getScores(setScore: Dispatch<SetStateAction<Scores>>) {
  const scores = await getLocalData("scores");
  let parsedScores: Scores = { player: 0, computer: 0, draw: 0 };
  if (scores) {
    try {
      const parsed = JSON.parse(scores);
      if (
        typeof parsed.player === "number" &&
        typeof parsed.computer === "number" &&
        typeof parsed.draw === "number"
      ) {
        parsedScores = parsed;
      }
    } catch (error) {
      console.error("Error parsing player choice from localStorage:", error);
    }
  }

  setScore(parsedScores);
  return;
}

export async function updateScores(
  scores: Scores,
  setScores: Dispatch<SetStateAction<Scores>>,
  board: ("X" | "O" | null)[],
  isPlayerX: boolean | "random",
  winValues?: number[],
) {
  if (winValues === undefined && !board.every((square) => square)) return;

  const newScore = { ...scores };

  if (winValues !== undefined) {
    const winValue = board[winValues[0]];
    const playerValue = isPlayerX ? "X" : "O";

    const field: "player" | "computer" =
      `${winValue === playerValue ? "player" : "computer"}`;
    newScore[field] = scores[field] + 1;
  }else if (board.every((square) => square) && !winValues) {
    newScore.draw = scores.draw + 1;
  }

  setScores(newScore);
  saveLocalData("scores", JSON.stringify(newScore));
}
