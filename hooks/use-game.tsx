import { otherPlayerAlgorithm } from "@/libs/algorithm";
import { updateGames } from "@/libs/games";
import { getScores, updateScores } from "@/libs/scores";
import { GameLevel, GameStatus, ScoresValues } from "@/libs/types";
import { checkWin, getLevel, getPlayerChoice } from "@/libs/utils";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

const useGame = (
  isPlayerX: boolean | "random",
  setIsPlayerX: Dispatch<SetStateAction<boolean | "random">>,
) => {
  const [board, setBoard] = useState<("X" | "O" | null)[]>(Array(9).fill(null));
  const [isPlayersTurn, setIsPlayersTurn] = useState(isPlayerX === true);
  const [winValues, setWinValues] = useState<number[] | undefined>(undefined);
  const draw = winValues === undefined && board.every((value) => value);
  const [gameStatus, setGameStatus] = useState<GameStatus>("none");
  const [gameLevel, setGameLevel] = useState<GameLevel>("medium");
  const [scores, setScores] = useState<ScoresValues>({
    player: 0,
    draw: 0,
    computer: 0,
  });

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      getPlayerChoice(setIsPlayerX);
      getScores("set", setScores);
      getLevel(setGameLevel);
    }

    return () => {
      isMounted = false;
    };
  }, [setIsPlayerX]);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    if (!isPlayersTurn && gameStatus === "ongoing") {
      timeoutId = setTimeout(() => {
        otherPlayerAlgorithm(
          isPlayersTurn,
          setIsPlayersTurn,
          board,
          setBoard,
          isPlayerX,
          gameLevel,
        );
      }, 1000);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isPlayersTurn, board, isPlayerX, gameStatus, gameLevel]);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      const newWinValues = checkWin(board);
      setWinValues(newWinValues);

      // Update scores in the same effect after winValues is calculated
      const isDraw =
        board.every((value) => value) && newWinValues === undefined;
      const hasWinner = newWinValues !== undefined;

      if (isDraw || hasWinner) {
        setGameStatus("ended");
        updateScores(setScores, board, isPlayerX, gameLevel, newWinValues);
        updateGames(board, gameLevel, newWinValues);
      }
    }
    return () => {
      isMounted = false;
    };
  }, [board, isPlayerX, setScores, gameLevel]);

  // Update isPlayersTurn when isPlayerX changes from "random" to boolean
  useEffect(() => {
    if (isPlayerX !== "random") {
      setIsPlayersTurn(isPlayerX);
    }
  }, [isPlayerX, winValues]);

  return {
    state: {
      board,
      isPlayersTurn,
      winValues,
      gameStatus,
      scores,
      isPlayerX,
      gameLevel,
    },
    stateSetter: {
      setBoard,
      setIsPlayersTurn,
      setGameStatus,
      setScores,
      setIsPlayerX,
      setWinValues,
      setGameLevel,
    },
    draw,
    getPlayerChoice,
  };
};

export default useGame;
