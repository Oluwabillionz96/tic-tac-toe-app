import { otherPlayerAlgorithm } from "@/libs/algorithm";
import { Scores } from "@/libs/types";
import {
  checkWin,
  getLevel,
  getPlayerChoice,
  getScores,
  updateScores,
} from "@/libs/utils";
import { useEffect, useState } from "react";

const useGame = () => {
  const [board, setBoard] = useState<("X" | "O" | null)[]>(Array(9).fill(null));
  const [isPlayerX, setIsPlayerX] = useState<boolean | "random">("random");
  const [isPlayersTurn, setIsPlayersTurn] = useState(isPlayerX === true);
  const [winValues, setWinValues] = useState<number[] | undefined>(undefined);
  const draw = winValues === undefined && board.every((value) => value);
  const [isgameOn, setIsgameOn] = useState(false);
  const [isLevelEasy, setIsLevelEasy] = useState(true);
  const gameOver = winValues !== undefined || draw;
  const [scores, setScores] = useState<Scores>({
    player: 0,
    draw: 0,
    computer: 0,
  });

  useEffect(() => {
    getPlayerChoice(setIsPlayerX);
    getScores(setScores);
    getLevel(setIsLevelEasy);
  }, []);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    if (!isPlayersTurn && !gameOver && isgameOn) {
      timeoutId = setTimeout(() => {
        otherPlayerAlgorithm(
          isPlayersTurn,
          setIsPlayersTurn,
          board,
          setBoard,
          isPlayerX,
          isLevelEasy,
        );
      }, 1000);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isPlayersTurn, board, gameOver, isPlayerX, isgameOn]);

  useEffect(() => {
    const newWinValues = checkWin(board);
    setWinValues(newWinValues);

    // Update scores in the same effect after winValues is calculated
    const isDraw = board.every((value) => value) && newWinValues === undefined;
    const hasWinner = newWinValues !== undefined;

    if (isDraw || hasWinner) {
      updateScores(setScores, board, isPlayerX, newWinValues);
    }
  }, [board, isPlayerX, setScores]);

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
      isPlayerX,
      isgameOn,
      scores,
      isLevelEasy,
    },
    stateSetter: {
      setBoard,
      setIsPlayersTurn,
      setIsPlayerX,
      setIsgameOn,
      setScores,
      setWinValues,
      setIsLevelEasy,
    },
    draw,
    getPlayerChoice,
  };
};

export default useGame;
