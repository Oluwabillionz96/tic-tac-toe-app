import { Scores } from "@/libs/types";
import {
  checkWin,
  getPlayerChoice,
  getScores,
  otherPlayerAlgorithm,
  saveLocalData,
} from "@/libs/utils";
import { useEffect, useState } from "react";

const useGame = () => {
  const [board, setBoard] = useState<("X" | "O" | null)[]>(Array(9).fill(null));
  const [isPlayerX, setIsPlayerX] = useState<boolean | "random">("random");
  const [isPlayersTurn, setIsPlayersTurn] = useState(isPlayerX === true);
  const [winValues, setWinValues] = useState<number[] | undefined>(undefined);
  const draw = board.every((value) => value);
  const [isgameOn, setIsgameOn] = useState(false);
  const gameOver = winValues !== undefined || draw;
  const [scores, setScores] = useState<Scores>({
    player: 0,
    draw: 0,
    computer: 0,
  });

  useEffect(() => {
    getPlayerChoice(setIsPlayerX);
    getScores(setScores);
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
    setWinValues(checkWin(board));

    // return () => setWinValues(undefined);
  }, [board]);

  useEffect(() => {
    if (!winValues && !draw) return;

    const newScore = { ...scores };

    if (winValues !== undefined) {
      const winValue = board[winValues[0]];
      const playerValue = isPlayerX ? "X" : "O";

      const field: keyof Scores = `${winValue === playerValue ? "player" : "computer"}`;
      newScore[field] = scores[field] + 1;
    }

    if (draw) {
      newScore.draw = scores.draw + 1;
    }

    setScores(newScore);
    saveLocalData("scores", JSON.stringify(newScore));
  }, [winValues, draw]);

  // Update isPlayersTurn when isPlayerX changes from "random" to boolean
  useEffect(() => {
    if (isPlayerX !== "random") {
      setIsPlayersTurn(isPlayerX);
    }
  }, [isPlayerX, winValues]);

  return {
    state: { board, isPlayersTurn, winValues, isPlayerX, isgameOn, scores },
    stateSetter: {
      setBoard,
      setIsPlayersTurn,
      setIsPlayerX,
      setIsgameOn,
      setScores,
    },
    draw,
    getPlayerChoice,
  };
};

export default useGame;
