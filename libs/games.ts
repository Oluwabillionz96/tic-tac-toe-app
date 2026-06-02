import { Board, GameCounts, GameLevel } from "./types";
import { getLocalData, saveLocalData } from "./utils";

export async function getGameCounts(): Promise<GameCounts> {
  const gameCounts = await getLocalData("games");
  const finalCounts: GameCounts = { easy: 0, medium: 0, hard: 0 };
  if (gameCounts) {
    const parsedGames = JSON.parse(gameCounts);
    finalCounts.easy = parsedGames.easy;
    finalCounts.medium = parsedGames.medium;
    finalCounts.hard = parsedGames.hard;
  }
  return finalCounts;
}

export async function updateGames(
  board: Board,
  level: GameLevel,
  winValues?: number[],
) {
  const draw = board.every((square) => square) && winValues === undefined;
  if (winValues === undefined && !draw) return;

  const previousScores = await getGameCounts();

  const newScores = { ...previousScores, [level]: previousScores[level] + 1 };

  await saveLocalData("games", JSON.stringify(newScores));
}
