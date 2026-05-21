import { Dispatch, SetStateAction } from "react";
import { Board, GameLevel, Scores, ScoresValues } from "./types";
import { getLocalData, saveLocalData } from "./utils";

function getTotalScores(
  parsedScores: Scores,
  type: "player" | "computer" | "draw",
): number {
  return (
    parsedScores.easy[type] +
    parsedScores.medium[type] +
    parsedScores.hard[type]
  );
}

function getDefaultScores(): ScoresValues {
  return {
    computer: 0,
    player: 0,
    draw: 0,
  };
}

function updateDisplayedScores(
  setScores: Dispatch<SetStateAction<ScoresValues>>,
  newScores: Scores,
  field: "player" | "computer" | "draw",
) {
  setScores((prev) => {
    const newScore = { ...prev };
    newScore[field] = getTotalScores(newScores, field);
    return newScore;
  });
}

function getField(
  winValues: number[] | undefined,
  isPlayerX: boolean,
  board: Board,
): "player" | "computer" | "draw" {
  let field: "player" | "computer" | "draw";
  if (winValues !== undefined) {
    const winValue = board[winValues[0]];
    const playerValue = isPlayerX ? "X" : "O";

    field = `${winValue === playerValue ? "player" : "computer"}`;
  } else {
    field = "draw";
  }

  return field;
}

export async function getScores(
  type: "set" | "return",
  setScore?: Dispatch<SetStateAction<ScoresValues>>,
): Promise<
  | {
      parsedScores: Scores;
      finalScores: ScoresValues;
    }
  | undefined
> {
  const scores = await getLocalData("scores");
  let finalScores: ScoresValues = { player: 0, computer: 0, draw: 0 };
  let parsedScores: Scores = {
    easy: getDefaultScores(),
    medium: getDefaultScores(),
    hard: getDefaultScores(),
  };
  if (scores) {
    try {
      const parsed = JSON.parse(scores);
      if (typeof parsed !== "undefined") {
        parsedScores = parsed;
        finalScores = {
          player: getTotalScores(parsedScores, "player"),
          computer: getTotalScores(parsedScores, "computer"),
          draw: getTotalScores(parsedScores, "draw"),
        };
      }
    } catch (error) {
      console.error("Error parsing player choice from localStorage:", error);
    }
  }

  if (type === "return") {
    return { finalScores, parsedScores };
  } else {
    setScore?.(finalScores);
    return;
  }
}

export async function updateScores(
  setScores: Dispatch<SetStateAction<ScoresValues>>,
  board: ("X" | "O" | null)[],
  isPlayerX: boolean | "random",
  level: GameLevel,
  winValues?: number[],
) {
  const draw = board.every((square) => square) && winValues === undefined;
  if (winValues === undefined && !draw) return;

  const field = getField(winValues, isPlayerX as boolean, board);

  const scores = await getScores("return", setScores);
  const prevScores = scores?.parsedScores;

  if (prevScores) {
    const newScores = { ...prevScores };
    newScores[level][field] = prevScores[level][field] + 1;
    await saveLocalData("scores", JSON.stringify(newScores));
    updateDisplayedScores(setScores, newScores, field);
  }
}
