import { Dispatch, SetStateAction } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Board, GameLevel, Scores } from "./types";
import Ionicons from "@expo/vector-icons/Ionicons";
import { RelativePathString } from "expo-router";

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

export const navigationLinks: {
  label: string;
  iconName: keyof typeof Ionicons.glyphMap;
  href: RelativePathString;
}[] = [
  { label: "Play", iconName: "play-outline", href: "./play" },
  { label: "Statistics", iconName: "stats-chart-outline", href: "./href" },
  { label: "Settings", iconName: "settings-outline", href: "./settings" },
];

export function getRandomIndex(multipliyer: number) {
  return Math.floor(Math.random() * multipliyer);
}

export function getRandomMove(board: Board) {
  const emptyIndices = board
    .map((item, index) => (item === null ? index : -1))
    .filter((index) => index !== -1);

  if (emptyIndices.length === 0) return -1;

  return emptyIndices[getRandomIndex(emptyIndices.length)];
}

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

export async function getLevel(setLevel: Dispatch<SetStateAction<GameLevel>>) {
  const level = await getLocalData("level");
  let parsedLevel: GameLevel = "medium";
  if (level) {
    try {
      const parsed = JSON.parse(level);
      if (parsed === "easy" || parsed === "medium" || parsed === "hard") {
        parsedLevel = parsed;
      }
    } catch (error) {
      console.error("Error parsing Level from localStorage:", error);
    }
  }

  setLevel(parsedLevel);
  return;
}

export async function updateScores(
  setScores: Dispatch<SetStateAction<Scores>>,
  board: ("X" | "O" | null)[],
  isPlayerX: boolean | "random",
  winValues?: number[],
) {
  const draw = board.every((square) => square) && winValues === undefined;
  if (winValues === undefined && !draw) return;

  setScores((prevScores) => {
    const newScore = { ...prevScores };

    if (winValues !== undefined) {
      const winValue = board[winValues[0]];
      const playerValue = isPlayerX ? "X" : "O";

      const field: "player" | "computer" =
        `${winValue === playerValue ? "player" : "computer"}`;
      newScore[field] = prevScores[field] + 1;
    }

    if (winValues === undefined && draw) {
      newScore.draw = prevScores.draw + 1;
    }

    saveLocalData("scores", JSON.stringify(newScore));
    return newScore;
  });
}
